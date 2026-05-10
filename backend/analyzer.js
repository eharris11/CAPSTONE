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

    const isAcademic =
        lower.includes("student") ||
        lower.includes("homework") ||
        lower.includes("assignment") ||
        lower.includes("professor") ||
        lower.includes("syllabus") ||
        lower.includes("campus") ||
        lower.includes("semester");

    const isSuccessfulDelivery =
        (lower.includes("delivery") || lower.includes("package")) &&
        (lower.includes("out for delivery") ||
         lower.includes("has been delivered") ||
         lower.includes("successfully delivered") ||
         lower.includes("your order has arrived") ||
         lower.includes("picked up"));

    let actionIntentTriggered = false;

    if (
        (lower.includes("verify") || lower.includes("confirm")) &&
        (lower.includes("account") || lower.includes("payment") || lower.includes("identity")) &&
        (lower.includes("click") || lower.includes("link") || lower.includes("call") || lower.includes("tap"))
    ) {
        score += 5;
        categories.add("Credential harvesting");
        actionIntentTriggered = true;
    } else if (
        !isBusinessContext &&
        (lower.includes("verify") || lower.includes("confirm")) &&
        (lower.includes("account") || lower.includes("payment") || lower.includes("identity"))
    ) {
        score += 3;
        categories.add("Credential harvesting");
        actionIntentTriggered = true;
    }

    if (lower.includes("enter your password") || lower.includes("confirm your password") ||
        lower.includes("your login") || lower.includes("update your password")) {
        score += 4;
        categories.add("Credential harvesting");
        actionIntentTriggered = true;
    }

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
    if (lower.includes("urgent") || lower.includes("immediately") || lower.includes("asap")) urgencyCount += 0.5;

    if (urgencyCount >= 2) {
        score += 4;
        categories.add("Urgency or pressure tactics");
    } else if (urgencyCount >= 1) {
        score += 2;
        categories.add("Urgency or pressure tactics");
    }

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

    if (lower.includes("limited time") && urgencyCount >= 1) {
        score += 2;
        categories.add("Urgency or pressure tactics");
    }

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

    if (
        !isBusinessContext &&
        !actionIntentTriggered &&
        lower.includes("click") &&
        (lower.includes("account") || lower.includes("payment") || lower.includes("offer"))
    ) {
        score += 2;
        categories.add("Suspicious message patterns");
    }

    const keywordGroups = [
        {
            words: ["phishing", "fake"],
            weight: 3,
            category: "Scam-related language",
            skipIf: isEducational
        },
        {
            words: ["scam", "fraud"],
            weight: 2,
            category: "Scam-related language",
            skipIf: isEducational
        },
        {
            words: ["social security", "ssn", "credit card number", "irs", "IRS"],
            weight: 5,
            category: "Sensitive data targeting",
            skipIf: isEducational || isAcademic
        },
        {
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
            words: ["send money", "wire transfer", "money transfer", "western union", "moneygram", "gift card payment", "pay in gift cards"],
            weight: 5,
            category: "Payment redirection",
            skipIf: false
        },
        {
            words: ["provide your", "give us your", "share your"],
            weight: 2,
            category: "Request for information",
            skipIf: isBusinessContext || isEducational
        },
    ];

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

        if (
            (cleanDomain.includes("verify") && !cleanDomain.endsWith(".gov")) ||
            (cleanDomain.includes("secure") && cleanDomain.includes("login")) ||
            (cleanDomain.includes("account") && cleanDomain.includes("update")) ||
            /\d{3,}-/.test(cleanDomain) ||
            (cleanDomain.split(".").length > 3 && !hitGoodDomain)
        ) {
            score += 3;
            categories.add("Suspicious link structure");
        }
    }

    const numbers = normalized.match(/\d{7,15}/g) || [];

    for (const num of numbers) {
        if (scamNumberMap.has(num)) {
            score += scamNumberMap.get(num);
            categories.add("Known scam phone number");
        }
    }

    const stopWords = ["this","that","from","have","your","with","there","here","been","will","they","them","just","about","what","when","were","which"];
    let patternScore = 0;

    for (const p of scamPatterns) {
        if (isEducational) break;
        const words = p.value.split(" ").filter(w => w.length > 3 && !stopWords.includes(w));
        if (words.length === 0) continue;

        let matchCount = 0;
        for (const word of words) {
            if (lower.includes(word)) matchCount++;
        }

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

    if (isAcademic) score -= 6;
    if (isBusinessContext) score -= 4;
    if (isSuccessfulDelivery) score -= 5;
    if (isEducational) score -= 8;

    if (
        (lower.includes("hr") || lower.includes("human resources") || lower.includes("onboarding")) &&
        (lower.includes("welcome") || lower.includes("start date") || lower.includes("offer letter"))
    ) {
        score -= 4;
    }

    if (
        (lower.includes("met online") || lower.includes("dating") || lower.includes("fell in love")) &&
        (lower.includes("money") || lower.includes("send") || lower.includes("emergency"))
    ) {
        score += 6;
        categories.add("Romance scam indicators");
    }

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

    if (score < 0) score = 0;

    if (score >= 7) {
        categories.delete("Legitimate message indicators");
    } else {
        categories.delete("Suspicious message patterns");
    }

    const hasRealIndicator = categories.size > 0 &&
        !Array.from(categories).every(c => c === "Legitimate message indicators" || c === "Recognized safe source");

    if (score > 0 && score < 3) {
        score = hasRealIndicator ? 3 : 0;
    }

    if (score > 20) score = 20;

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
