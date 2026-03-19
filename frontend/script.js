async function analyze() {
    const text = document.getElementById("input").value;

    const response = await fetch("http://localhost:3000/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
    });

    const data = await response.json();

    let output = "";

    if (data.isScam) {
        output += "⚠️ Scam Likely\n";
    } else {
        output += "✅ Looks Safe\n";
    }

    output += "\nScore: " + data.score + "\n\nReasons:\n";
    output += data.reasons.join("\n");

    document.getElementById("result").innerText = output;
}