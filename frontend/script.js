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

    if (data.isScam) {
        output = `
    <div class="result-box danger">
        ⚠️ Scam Likely<br><br>
        <strong>Score:</strong> ${data.score}<br><br>
        <strong>Reasons:</strong><br>
        ${data.reasons.join("<br>")}
    </div>`;
} else {
    output = `
    <div class="result-box safe">
        ✅ Looks Safe<br><br>
        <strong>Score:</strong> ${data.score}<br><br>
        <strong>Reasons:</strong><br>
        ${data.reasons.join("<br>")}
    </div>`;
}

resultBox.innerHTML = output;
inputBox.value = "";
}

function clearInput() {
    document.getElementById("input").value = "";
    document.getElementById("result").innerText = "";
}