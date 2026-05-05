function getScamType(reasons) {
    const scores = {
        Phishing: 0,
        Urgency: 0,
        Links: 0,
        Impersonation: 0,
        Lottery: 0,
        Romance: 0
    };

    reasons.forEach(reason => {
        const text = reason.toLowerCase();

        if (text.includes("credential") || text.includes("password") || text.includes("login") || text.includes("phishing"))
            scores.Phishing++;
        if (text.includes("urgent") || text.includes("pressure") || text.includes("immediately"))
            scores.Urgency++;
        if (text.includes("link") || text.includes("url") || text.includes("domain"))
            scores.Links++;
        if (text.includes("imperson") || text.includes("spoof") || text.includes("fake sender"))
            scores.Impersonation++;
        if (text.includes("prize") || text.includes("lottery") || text.includes("reward"))
            scores.Lottery++;
        if (text.includes("romance") || text.includes("dating") || text.includes("relationship"))
            scores.Romance++;
    });

    let bestType = null;
    let bestScore = 0;
    for (let type in scores) {
        if (scores[type] > bestScore) {
            bestScore = scores[type];
            bestType = type;
        }
    }
    return bestType;
}

async function analyze() {
    const inputBox = document.getElementById("input");
    const resultEl = document.getElementById("result");
    const placeholder = document.getElementById("resultPlaceholder");

    const text = inputBox.value.trim();
    if (!text) {
        resultEl.innerHTML = `<p style="color:var(--text-muted);font-size:14px;padding:12px 0;">Please enter a message to analyze.</p>`;
        placeholder.style.display = "none";
        return;
    }

    placeholder.style.display = "none";
    resultEl.innerHTML = `<div style="padding:20px 0;color:var(--text-secondary);font-size:14px;">⏳ Analyzing…</div>`;

    try {
        const response = await fetch("/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });
        const data = await response.json();
        renderResult(data);
    } catch (err) {
        resultEl.innerHTML = `<p style="color:var(--red);font-size:14px;padding:12px 0;">Error connecting to server. Make sure the backend is running.</p>`;
    }
}

function renderResult(data) {
    const resultEl = document.getElementById("result");
    const scamType = getScamType(data.reasons);

    let cssClass = "safe";
    if (data.result === "High Risk Scam") cssClass = "danger";
    else if (data.result === "Probable Risk") cssClass = "probable";
    else if (data.result === "Suspicious") cssClass = "warning";

    const indicatorsList = data.reasons.length > 0
        ? data.reasons.map(r => `<li>${r}</li>`).join("")
        : `<li style="opacity:0.65">No indicators detected</li>`;

    const quizBtn = scamType
        ? `<button class="quiz-btn" onclick="startScamQuiz('${scamType}')">🎯 Test Your ${scamType} Knowledge</button>`
        : "";

    resultEl.innerHTML = `
<div class="result-flex">
    <div class="result-box ${cssClass}">
        <div class="result-verdict">${data.result}</div>
        <div class="result-score">Risk Score: ${data.score} / 20</div>
        <strong style="font-size:12px;text-transform:uppercase;letter-spacing:0.4px;opacity:0.7;">Indicators Detected</strong>
        <ul>${indicatorsList}</ul>
        ${quizBtn}
    </div>
    <div class="score-guide">
        <div class="sg-title">Score Guide</div>
        <div class="guide-row">
            <span class="guide-dot" style="background:#10b981;"></span>
            <span class="guide-label">Likely Safe</span>
            <span class="guide-range">0–2</span>
        </div>
        <div class="guide-row">
            <span class="guide-dot" style="background:#f59e0b;"></span>
            <span class="guide-label">Suspicious</span>
            <span class="guide-range">3–6</span>
        </div>
        <div class="guide-row">
            <span class="guide-dot" style="background:#f97316;"></span>
            <span class="guide-label">Probable Risk</span>
            <span class="guide-range">7–11</span>
        </div>
        <div class="guide-row">
            <span class="guide-dot" style="background:#ef4444;"></span>
            <span class="guide-label">High Risk</span>
            <span class="guide-range">12+</span>
        </div>
    </div>
</div>`;
}

function startScamQuiz(type) {
    window.location.href = `quiz.html?type=${encodeURIComponent(type)}`;
}

function clearInput() {
    document.getElementById("input").value = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("resultPlaceholder").style.display = "flex";
}

function updateModuleCount() {
    const saved = JSON.parse(localStorage.getItem("modules")) || {};
    const total = 6;
    let completed = 0;
    for (let key in saved) { if (saved[key]) completed++; }
    const el = document.getElementById("moduleCount");
    if (el) el.innerText = `${completed}/${total}`;
}

function fillExample() {
    const inputBox = document.getElementById("input");
    inputBox.value = "URGENT: Your bank account has been locked due to suspicious activity. Click this link immediately to verify your identity or your account will be permanently disabled.";
    inputBox.focus();
}

window.onload = updateModuleCount;