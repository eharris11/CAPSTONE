const fs = require("fs");
const path = require("path");

function loadFile(filePath) {
    return fs.readFileSync(filePath, "utf-8")
        .split("\n")
        .filter(line => line.trim() !== "")
        .map(line => {
            const [value, type, label, weight] = line.split(",");
            return {
                value: value.toLowerCase(),
                weight: Number(weight)
            };
        });
}

const scamPatterns = loadFile(path.join(__dirname, "data/scam_patterns_weighted.txt"));
const safePatterns = loadFile(path.join(__dirname, "data/safe_patterns_weighted.txt"));
const badDomains = loadFile(path.join(__dirname, "data/bad_domains_weighted.txt"));
const goodDomains = loadFile(path.join(__dirname, "data/good_domains_weighted.txt"));
const scamNumbers = loadFile(path.join(__dirname, "data/scam_numbers_weighted.txt"));

const badDomainSet = new Set(badDomains.map(d => d.value));
const goodDomainSet = new Set(goodDomains.map(d => d.value));
const scamNumberMap = new Map(scamNumbers.map(n => [n.value, n.weight]));

function analyzeText(text) {
    let score = 0;
    const categories = new Set();

    const lower = text.toLowerCase();
    const normalized = lower.replace(/[^0-9]/g, "");

    // ── SAFE CONTEXT GUARDS (run first so later rules can check them) ──────────
    // Educational / informational context — user is discussing scams, not receiving one
    const isEducational =
        lower.includes("how to spot") ||
        lower.includes("how to avoid") ||
        lower.includes("example of a scam") ||
        lower.includes("this is a scam") ||
        lower.includes("this looks like a scam") ||
        lower.includes("warning: ") ||
        lower.includes("beware of") ||
        lower.includes("be aware of") ||
        lower.includes("protect yourself");

    // Legitimate business / transactional context
    const isBusinessContext =
        lower.includes("your order") ||
        lower.includes("your receipt") ||
        lower.includes("your invoice") ||
        lower.includes("your appointment") ||
        lower.includes("your reservation") ||
        lower.includes("your subscription") ||
        lower.includes("your booking") ||
        lower.includes("your ticket") ||
        lower.includes("thank you for your") ||
        lower.includes("as requested") ||
        lower.includes("per your request");

    // Academic / school context
    // Note: intentionally excludes "zoom", "meeting", "class", "school" — too broad,
    // scam phishing links can reference those words legitimately.
    const isAcademic =
        lower.includes("student") ||
        lower.includes("homework") ||
        lower.includes("assignment") ||
        lower.includes("professor") ||
        lower.includes("syllabus") ||
        lower.includes("campus") ||
        lower.includes("semester");

    // Successful delivery (not failed) — reduces false positives on "package"
    const isSuccessfulDelivery =
        (lower.includes("delivery") || lower.includes("package")) &&
        (lower.includes("out for delivery") ||
         lower.includes("has been delivered") ||
         lower.includes("successfully delivered") ||
         lower.includes("your order has arrived") ||
         lower.includes("picked up"));

    // ── CREDENTIAL HARVESTING ─────────────────────────────────────────────────
    let actionIntentTriggered = false;

    // Strong form: verify/confirm + account/payment/identity + action word (click/link/call)
    if (
        (lower.includes("verify") || lower.includes("confirm")) &&
        (lower.includes("account") || lower.includes("payment") || lower.includes("identity")) &&
        (lower.includes("click") || lower.includes("link") || lower.includes("call") || lower.includes("tap"))
    ) {
        score += 5;
        categories.add("Credential harvesting");
        actionIntentTriggered = true;
    // Weaker form: verify/confirm + account — only score if not business context
    } else if (
        !isBusinessContext &&
        (lower.includes("verify") || lower.includes("confirm")) &&
        (lower.includes("account") || lower.includes("payment") || lower.includes("identity"))
    ) {
        score += 3;
        categories.add("Credential harvesting");
        actionIntentTriggered = true;
    }

    // Explicit password/login requests
    if (lower.includes("enter your password") || lower.includes("confirm your password") ||
        lower.includes("your login") || lower.includes("update your password")) {
        score += 4;
        categories.add("Credential harvesting");
        actionIntentTriggered = true;
    }

    // ── URGENCY / PRESSURE TACTICS ────────────────────────────────────────────
    // Require at least 2 urgency signals to avoid false positives from casual use of "urgent"
    const urgencySignals = [
        "act now", "act immediately", "respond immediately", "reply immediately",
        "limited time", "expires soon", "offer expires", "time sensitive",
        "within 24 hours", "within 48 hours", "before it's too late",
        "don't delay", "do not delay", "final notice", "last chance",
        "account will be suspended", "account will be closed", "account will be disabled",
        "account will be locked", "access will be terminated", "permanently disabled",
        "immediately or", "or your account", "or lose access"
    ];
    let urgencyCount = urgencySignals.filter(s => lower.includes(s)).length;
    // Single strong standalone urgency words count as 0.5 each
    if (lower.includes("urgent") || lower.includes("immediately") || lower.includes("asap")) urgencyCount += 0.5;

    if (urgencyCount >= 2) {
        score += 4;
        categories.add("Urgency or pressure tactics");
    } else if (urgencyCount >= 1) {
        score += 2;
        categories.add("Urgency or pressure tactics");
    }

    // ── SUSPICIOUS ACTION + CONTEXT COMBOS ───────────────────────────────────
    if (
        lower.includes("special offer") ||
        lower.includes("you've been chosen") ||
        lower.includes("you have been chosen") ||
        lower.includes("you've been selected") ||
        lower.includes("you have been selected") ||
        lower.includes("exclusively selected")
    ) {
        score += 3;
        categories.add("Suspicious message patterns");
    }

    // "Limited time" alone is weaker without other signals (sale emails use it)
    if (lower.includes("limited time") && urgencyCount >= 1) {
        score += 2;
        categories.add("Urgency or pressure tactics");
    }

    // Failed delivery scam: only score if not a legitimate successful delivery
    if (
        !isSuccessfulDelivery &&
        (lower.includes("delivery") || lower.includes("package")) &&
        (
            lower.includes("failed") ||
            lower.includes("could not deliver") ||
            lower.includes("unable to deliver") ||
            lower.includes("couldn't deliver") ||
            lower.includes("reschedule your delivery") ||
            lower.includes("delivery attempt")
        ) &&
        (lower.includes("click") || lower.includes("link") || lower.includes("confirm"))
    ) {
        score += 4;
        categories.add("Suspicious message patterns");
    }

    // Click + account/payment/offer — only if not a business receipt context
    if (
        !isBusinessContext &&
        !actionIntentTriggered &&
        lower.includes("click") &&
        (lower.includes("account") || lower.includes("payment") || lower.includes("offer"))
    ) {
        score += 2;
        categories.add("Suspicious message patterns");
    }

    // ── KEYWORD GROUPS ────────────────────────────────────────────────────────
    const keywordGroups = [
        {
            // Talking *about* scams (educational) should not self-trigger
            words: ["phishing", "fake"],
            weight: 3,
            category: "Scam-related language",
            skipIf: isEducational
        },
        {
            // "scam" and "fraud" in educational context are common — skip
            words: ["scam", "fraud"],
            weight: 2,
            category: "Scam-related language",
            skipIf: isEducational
        },
        {
            // Sensitive data keywords — high weight but skip if clearly educational
            words: ["social security", "ssn", "credit card number", "irs", "IRS"],
            weight: 5,
            category: "Sensitive data targeting",
            skipIf: isEducational || isAcademic
        },
        {
            // "bank" and "tax" alone are very common — only score in suspicious context
            words: ["your bank account", "bank account number", "tax refund"],
            weight: 4,
            category: "Sensitive data targeting",
            skipIf: isBusinessContext || isEducational
        },
        {
            words: ["password", "login credentials", "username and password"],
            weight: 3,
            category: "Credential harvesting",
            skipIf: isBusinessContext || isEducational
        },
        {
            words: ["winner", "lottery", "you have won", "you've won"],
            weight: 4,
            category: "Prize or reward scam",
            skipIf: false
        },
        {
            words: ["prize", "reward", "cash prize", "gift card"],
            weight: 3,
            category: "Prize or reward scam",
            skipIf: isBusinessContext
        },
        {
            // "send money", "wire transfer", "money transfer" are strong scam signals
            words: ["send money", "wire transfer", "money transfer", "western union", "moneygram", "gift card payment", "pay in gift cards"],
            weight: 5,
            category: "Payment redirection",
            skipIf: false
        },
        {
            // Generic "send/give/provide" — too broad, require scam context
            words: ["provide your", "give us your", "share your"],
            weight: 2,
            category: "Request for information",
            skipIf: isBusinessContext || isEducational
        },
    ];

    // Prize/lottery: strong combo — won + financial term
    if (
        lower.includes("won") &&
        !isEducational &&
        (
            lower.includes("money") ||
            lower.includes("dollars") ||
            lower.includes("prize") ||
            lower.includes("reward") ||
            lower.includes("lottery") ||
            lower.includes("cash")
        )
    ) {
        score += 7;
        categories.add("Prize or reward scam");
    }

    for (const group of keywordGroups) {
        if (group.skipIf) continue;
        for (const word of group.words) {
            if (lower.includes(word)) {
                score += group.weight;
                categories.add(group.category);
                break;
            }
        }
    }

    // ── DOMAIN / URL ANALYSIS ─────────────────────────────────────────────────
    // Extract all URLs in the text, not just the first one
    const domainMatches = [...lower.matchAll(/(?:https?:\/\/)?(?:www\.)?((?:\d{1,3}\.){3}\d{1,3}|[a-z0-9.-]+\.[a-z]{2,})/g)];

    let hitBadDomain = false;
    let hitGoodDomain = false;

    for (const match of domainMatches) {
        const cleanDomain = match[1].replace(/^www\./, "");

        if (!hitBadDomain) {
            for (const bad of badDomains) {
                if (cleanDomain.includes(bad.value)) {
                    score += bad.weight;
                    categories.add("Known phishing source");
                    hitBadDomain = true;
                    break;
                }
            }
        }

        if (!hitGoodDomain) {
            for (const good of goodDomains) {
                if (cleanDomain.includes(good.value)) {
                    score -= good.weight;
                    categories.add("Recognized safe source");
                    hitGoodDomain = true;
                    break;
                }
            }
        }

        // Suspicious URL patterns — more specific than before to reduce false positives
        // "secure" alone is common in legitimate URLs (e.g. secure.paypal.com)
        // Flag it only when combined with other suspicious terms in the domain
        if (
            (cleanDomain.includes("verify") && !cleanDomain.endsWith(".gov")) ||
            (cleanDomain.includes("secure") && cleanDomain.includes("login")) ||
            (cleanDomain.includes("account") && cleanDomain.includes("update")) ||
            /\d{3,}-/.test(cleanDomain) ||  // numeric prefixes like 443-bank.com
            (cleanDomain.split(".").length > 3 && !hitGoodDomain) // excessive subdomains
        ) {
            score += 3;
            categories.add("Suspicious link structure");
        }
    }

    // ── PHONE NUMBER MATCHING ─────────────────────────────────────────────────
    const numbers = normalized.match(/\d{7,15}/g) || [];

    for (const num of numbers) {
        if (scamNumberMap.has(num)) {
            score += scamNumberMap.get(num);
            categories.add("Known scam phone number");
        }
    }

    // ── PATTERN FILE MATCHING ─────────────────────────────────────────────────
    const stopWords = ["this","that","from","have","your","with","there","here","been","will","they","them","just","about","what","when","were","which"];
    let patternScore = 0;

    for (const p of scamPatterns) {
        if (isEducational) break; // Skip pattern matching in educational context
        const words = p.value.split(" ").filter(w => w.length > 3 && !stopWords.includes(w));
        if (words.length === 0) continue;

        let matchCount = 0;
        for (const word of words) {
            if (lower.includes(word)) matchCount++;
        }

        // Require stricter match ratio to reduce false positives from partial phrase overlap
        const ratio = matchCount / words.length;
        if (ratio >= 0.6 && matchCount >= 2) {
            if (patternScore < 10) {
                score += p.weight;
                patternScore += p.weight;
            }
            categories.add("Suspicious message patterns");
        }
    }

    for (const s of safePatterns) {
        const words = s.value.split(" ").filter(w => w.length > 3 && !stopWords.includes(w));
        if (words.length === 0) continue;

        let matchCount = 0;
        for (const word of words) {
            if (lower.includes(word)) matchCount++;
        }

        if (matchCount >= 2) {
            score += s.weight;
            categories.add("Legitimate message indicators");
        }
    }

    // ── CONTEXT-BASED SCORE REDUCTIONS ───────────────────────────────────────
    if (isAcademic) score -= 6;
    if (isBusinessContext) score -= 4;
    if (isSuccessfulDelivery) score -= 5;
    if (isEducational) score -= 8;

    // Internal comms / HR context (job offers from known companies are usually safe)
    if (
        (lower.includes("hr") || lower.includes("human resources") || lower.includes("onboarding")) &&
        (lower.includes("welcome") || lower.includes("start date") || lower.includes("offer letter"))
    ) {
        score -= 4;
    }

    // Romance scam signals (add, not reduce)
    if (
        (lower.includes("met online") || lower.includes("dating") || lower.includes("fell in love")) &&
        (lower.includes("money") || lower.includes("send") || lower.includes("emergency"))
    ) {
        score += 6;
        categories.add("Romance scam indicators");
    }

    // Impersonation signals — requires a specific authority claim, not just "this is"
    if (
        (lower.includes("calling from") || lower.includes("i am from") ||
         lower.includes("i'm from") || lower.includes("representative of") ||
         lower.includes("agent from") || lower.includes("officer from")) &&
        (lower.includes("police") || lower.includes("government") || lower.includes("fbi") ||
         lower.includes("microsoft") || lower.includes("apple support") || lower.includes("irs agent") ||
         lower.includes("social security") || lower.includes("department of"))
    ) {
        score += 5;
        categories.add("Impersonation attempt");
    }

    // ── SCORE CLEANUP ─────────────────────────────────────────────────────────
    if (score < 0) score = 0;

    if (score >= 7) {
        categories.delete("Legitimate message indicators");
    } else {
        categories.delete("Suspicious message patterns");
    }

    // Don't bump low scores up to Suspicious unless there's at least one real indicator
    const hasRealIndicator = categories.size > 0 &&
        !Array.from(categories).every(c => c === "Legitimate message indicators" || c === "Recognized safe source");

    if (score > 0 && score < 3) {
        score = hasRealIndicator ? 3 : 0;
    }

    if (score > 20) score = 20;

    // ── CLASSIFICATION ────────────────────────────────────────────────────────
    let result;
    if (score >= 12) result = "High Risk Scam";
    else if (score >= 7) result = "Probable Risk";
    else if (score >= 3) result = "Suspicious";
    else result = "Likely Safe";

    const strongIndicators = [
        "Known phishing source",
        "Known scam phone number",
        "Sensitive data targeting",
        "Credential harvesting",
        "Payment redirection",
        "Impersonation attempt"
    ];

    const hasStrong = Array.from(categories).some(c => strongIndicators.includes(c));

    if (categories.size === 0 && score >= 3) {
        categories.add("Suspicious message patterns");
    }

    return {
        result,
        score,
        reasons: Array.from(categories),
        hasStrong
    };
}

module.exports = analyzeText;