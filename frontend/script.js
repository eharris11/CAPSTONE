async function analyze() {
    const inputBox = document.getElementById("input");
    const resultBox = document.getElementById("result");

    const text = inputBox.value;

    if (!text.trim()) {
        resultBox.innerText = "Please enter a message to analyze.";
        return;
    }

    resultBox.innerHTML = `
        <div class="result-box">
            ⏳ Analyzing...
        </div>
    `;

    const response = await fetch("/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    });

    const data = await response.json();

    let output = "";

    let cssClass = "safe";

    if (data.result === "High Risk Scam") cssClass = "danger";
    else if (data.result === "Probable Risk") cssClass = "probable";
    else if (data.result === "Suspicious") cssClass = "warning";

    output = `
<div class="result-flex">

    <!-- LEFT: RESULT -->
    <div class="result-box ${cssClass} result-main">
        <strong>${data.result}</strong>

        <div class="score">
            Score: ${data.score} / 20
        </div>

        <div class="indicators">
            <strong>Indicators</strong>
            <ul>
                ${
                    data.reasons.length > 0
                        ? data.reasons.map(r => `<li>${r}</li>`).join("")
                        : `<li>No indicators detected</li>`
                }
            </ul>
        </div>
    </div>

    <!-- RIGHT: SCORE GUIDE -->
    <div class="score-guide">
        <strong>Score Guide</strong><br><br>
        0-2 → Likely Safe<br>
        3-6 → Suspicious<br>
        7-11 → Probable Risk<br>
        12+ → High Risk Scam
    </div>

</div>
`;

    resultBox.innerHTML = output;
    inputBox.value = "";
}

function clearInput() {
    document.getElementById("input").value = "";
    document.getElementById("result").innerText = "";
}

function toggle(id) {
    const section = document.getElementById(id);
    section.classList.toggle("hidden");
}

function updateModuleCount() {
    const saved = JSON.parse(localStorage.getItem("modules")) || {};

    const total = 6;
    let completed = 0;

    for (let key in saved) {
        if (saved[key]) completed++;
    }

    const el = document.getElementById("moduleCount");
    if (el) {
        el.innerText = `${completed}/${total}`;
    }
}

window.onload = updateModuleCount;

function fillExample() {
    const inputBox = document.getElementById("input");

    inputBox.value =
        "URGENT: Your bank account has been locked due to suspicious activity. Click this link immediately to verify your identity or your account will be permanently disabled.";

    inputBox.focus();
}