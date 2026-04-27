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

    let actionIntentTriggered = false;

    if (
        (lower.includes("verify") || lower.includes("confirm")) &&
        (
            lower.includes("account") ||
            lower.includes("payment") ||
            lower.includes("identity")
        )
    ) {
        score += 4;
        categories.add("Credential harvesting");
        actionIntentTriggered = true;
    }

    if (
        !actionIntentTriggered &&
        lower.includes("click") &&
        (
            lower.includes("account") ||
            lower.includes("payment") ||
            lower.includes("offer")
        )
    ) {
        score += 3;
        categories.add("Suspicious message patterns");
    }

    if (
        lower.includes("special offer") ||
        lower.includes("selected") ||
        lower.includes("you've been chosen") ||
        lower.includes("limited time")
    ) {
        score += 3;
        categories.add("Suspicious message patterns");
    }

    if (
        (lower.includes("delivery") || lower.includes("package")) &&
        (
            lower.includes("failed") ||
            lower.includes("issue") ||
            lower.includes("problem") ||
            lower.includes("reschedule") ||
            lower.includes("could not") ||
            lower.includes("unable") ||
            lower.includes("couldn't deliver") ||
            lower.includes("couldn't reach")
        )
    ) {
        score += 3;
        categories.add("Suspicious message patterns");
    }

    if (
        (lower.includes("click") || lower.includes("link")) &&
        (lower.includes("account") || lower.includes("delivery") || lower.includes("offer"))
    ) {
        score += 2;
        categories.add("Suspicious message patterns");
    }

    const keywordGroups = [
        {
            words: ["scam", "fraud", "phishing", "fake"],
            weight: 3,
            category: "Scam-related language"
        },
        {
            words: ["social security", "ssn", "bank", "credit card", "irs", "tax", "IRS"],
            weight: 5,
            category: "Sensitive data targeting"
        },
        {
            words: ["password", "login"],
            weight: 2,
            category: "Credential harvesting"
        },
        {
            words: ["urgent", "immediately", "asap"],
            weight: 2,
            category: "Urgency or pressure tactics"
        },
        {
            words: ["send", "give", "provide", "share"],
            weight: 3,
            category: "Request for information"
        },
        {
            words: ["winner", "lottery", "prize", "reward"],
            weight: 3,
            category: "Prize or reward scam"
        },
    ];

    if (
    lower.includes("won") &&
    (
        lower.includes("money") ||
        lower.includes("dollars") ||
        lower.includes("prize") ||
        lower.includes("reward") ||
        lower.includes("lottery")
    )
) {
    score += 7;
    categories.add("Prize or reward scam");
}

    for (const group of keywordGroups) {
        for (const word of group.words) {
            if (lower.includes(word)) {
                score += group.weight;
                categories.add(group.category);
                break;
            }
        }
    }

    const domainMatch = lower.match(/(?:https?:\/\/)?(?:www\.)?((?:\d{1,3}\.){3}\d{1,3}|[a-z0-9.-]+\.[a-z]{2,})/);
    const domain = domainMatch ? domainMatch[1] : null;

    if (domain) {
        const cleanDomain = domain.replace(/^www\./, "");

        for (const bad of badDomains) {
            if (cleanDomain.includes(bad.value)) {
                score += bad.weight;
                categories.add("Known phishing source");
                break;
            }
        }

        for (const good of goodDomains) {
            if (cleanDomain.includes(good.value)) {
                score -= good.weight;
                categories.add("Recognized safe source");
                break;
            }
        }

        if (cleanDomain.includes("verify") || cleanDomain.includes("secure")) {
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

    const stopWords = ["this","that","from","have","your","with","there","here"];
    let patternScore = 0;

    for (const p of scamPatterns) {
        const words = p.value.split(" ");
        let matchCount = 0;

        for (const word of words) {
            if (word.length > 3 && !stopWords.includes(word) && lower.includes(word)) {
                matchCount++;
            }
        }

        if (
            ((words.length <= 4 && matchCount >= 2) ||
            (words.length > 4 && matchCount >= 2))
        ) {
            if (patternScore < 10) {
            score += p.weight;
            patternScore += p.weight;
}
            categories.add("Suspicious message patterns");
        }
    }

    for (const s of safePatterns) {
        const words = s.value.split(" ");
        let matchCount = 0;

        for (const word of words) {
            if (word.length > 3 && !stopWords.includes(word) && lower.includes(word)) {
                matchCount++;
            }
        }

        if (matchCount >= 2) {
            score += s.weight;
            categories.add("Legitimate message indicators");
        }
    }

    if (
        lower.includes("student") ||
        lower.includes("class") ||
        lower.includes("school") ||
        lower.includes("zoom") ||
        lower.includes("meeting")
    ) {
        score -= 6;
    }

    if (
    (lower.includes("delivery") || lower.includes("package")) &&
    (lower.includes("out for delivery") || lower.includes("delivered"))
) {
    score -= 5;
}

    if (score < 0) {
        score = 0;
    }

   if (score >= 7) {
    categories.delete("Legitimate message indicators");
} else {
    categories.delete("Suspicious message patterns");
}

    if (score > 0 && score < 3) {
        score = 3;
    }

    if (score > 20) {
        score = 20;
    }

    let result;

    if (score >= 12) result = "High Risk Scam";
    else if (score >= 7) result = "Probable Risk";
    else if (score >= 3) result = "Suspicious";
    else result = "Likely Safe";

    const strongIndicators = [
    "Known phishing source",
    "Known scam phone number",
    "Sensitive data targeting",
    "Credential harvesting"
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