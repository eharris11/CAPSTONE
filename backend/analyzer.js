function analyzeText(text) {
    let score = 0;
    let reasons = [];

    if (text.toLowerCase().includes("urgent")) {
        score += 2;
        reasons.push("Uses urgency language");
    }

    if (text.toLowerCase().includes("click here")) {
        score += 3;
        reasons.push("Suspicious link phrase");
    }

    return {
        isScam: score >= 3,
        score,
        reasons
    };
}

module.exports = analyzeText;