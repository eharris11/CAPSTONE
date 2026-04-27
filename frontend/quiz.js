const questions = [

/* ================= PHISHING ================= */
{
    category: "Phishing",
    question: "You receive an email from your bank asking you to log in through a link. What should you do?",
    answers: ["Click the link immediately", "Ignore it", "Go to the bank website manually"],
    correct: 2,
    explanation: "Always go directly to official websites instead of clicking email links."
},
{
    category: "Phishing",
    question: "Which is a sign of phishing?",
    answers: ["Personalized greeting", "Unexpected request for sensitive info", "Proper grammar"],
    correct: 1,
    explanation: "Unexpected requests for sensitive info are a major red flag."
},
{
    category: "Phishing",
    question: "A message asks for your password to fix an issue. What is this?",
    answers: ["Normal support request", "Phishing attempt", "Security check"],
    correct: 1,
    explanation: "Legitimate companies never ask for passwords."
},
{
    category: "Phishing",
    question: "Phishing emails often try to make you:",
    answers: ["Relax", "Provide personal info", "Ignore messages"],
    correct: 1,
    explanation: "They aim to trick you into giving sensitive information."
},
{
    category: "Phishing",
    question: "Which is safest when receiving a suspicious email?",
    answers: ["Reply directly", "Click link", "Go to official site manually"],
    correct: 2,
    explanation: "Always navigate manually to trusted websites."
},
{
    category: "Phishing",
    question: "Phishing messages often include:",
    answers: ["Jokes", "Unexpected links", "Friendly greetings only"],
    correct: 1,
    explanation: "Links are often used to redirect you to fake sites."
},
{
    category: "Phishing",
    question: "What should you do with suspicious attachments?",
    answers: ["Open immediately", "Delete or scan", "Forward to friends"],
    correct: 1,
    explanation: "Attachments may contain malware."
},
{
    category: "Phishing",
    question: "Phishing attempts often impersonate:",
    answers: ["Friends only", "Trusted organizations", "Random strangers only"],
    correct: 1,
    explanation: "They pretend to be banks, companies, etc."
},
{
    category: "Phishing",
    question: "Emails asking for login credentials are usually:",
    answers: ["Safe", "Phishing", "Updates"],
    correct: 1,
    explanation: "Credential requests are a major red flag."
},
{
    category: "Phishing",
    question: "What is a common phishing goal?",
    answers: ["Help you", "Steal data", "Improve service"],
    correct: 1,
    explanation: "Phishing aims to steal sensitive data."
},

/* ================= URGENCY ================= */
{
    category: "Urgency",
    question: "A message says 'Act now or lose access forever!' What tactic is this?",
    answers: ["Helpful reminder", "Urgency tactic", "Routine update"],
    correct: 1,
    explanation: "Scammers use urgency to pressure quick decisions."
},
{
    category: "Urgency",
    question: "Why do scammers use urgency?",
    answers: ["To help users act faster", "To reduce thinking time", "To improve security"],
    correct: 1,
    explanation: "Urgency reduces critical thinking."
},
{
    category: "Urgency",
    question: "Best response to urgent messages?",
    answers: ["Act immediately", "Verify first", "Ignore everything"],
    correct: 1,
    explanation: "Always verify before acting."
},
{
    category: "Urgency",
    question: "Urgent scam messages often say:",
    answers: ["Take your time", "Act immediately", "Ignore this"],
    correct: 1,
    explanation: "They push you to act quickly."
},
{
    category: "Urgency",
    question: "Why is urgency dangerous?",
    answers: ["It slows decisions", "It causes panic", "It helps security"],
    correct: 1,
    explanation: "Panic reduces logical thinking."
},
{
    category: "Urgency",
    question: "Best reaction to urgent threats?",
    answers: ["Respond instantly", "Verify calmly", "Delete everything"],
    correct: 1,
    explanation: "Stay calm and verify."
},
{
    category: "Urgency",
    question: "Urgency is used to:",
    answers: ["Help you", "Trick you quickly", "Save time"],
    correct: 1,
    explanation: "It’s used to manipulate behavior."
},
{
    category: "Urgency",
    question: "Scammers want you to avoid:",
    answers: ["Acting fast", "Thinking critically", "Reading messages"],
    correct: 1,
    explanation: "They want you to act without thinking."
},
{
    category: "Urgency",
    question: "A message says your account will be locked in 5 minutes. You should:",
    answers: ["Click immediately", "Pause and verify", "Ignore permanently"],
    correct: 1,
    explanation: "Verify through official channels."
},
{
    category: "Urgency",
    question: "Urgency scams rely on:",
    answers: ["Logic", "Fear and pressure", "Facts"],
    correct: 1,
    explanation: "Fear drives poor decisions."
},

/* ================= LINKS ================= */
{
    category: "Links",
    question: "Which link is suspicious?",
    answers: ["amazon.com", "secure-amazon-login.net", "google.com"],
    correct: 1,
    explanation: "Fake domains mimic real ones."
},
{
    category: "Links",
    question: "Before clicking a link, you should:",
    answers: ["Click quickly", "Check the URL", "Ignore all links"],
    correct: 1,
    explanation: "Always inspect links carefully."
},
{
    category: "Links",
    question: "Shortened links can be dangerous because:",
    answers: ["They are always safe", "They hide the destination", "They load faster"],
    correct: 1,
    explanation: "Shortened links hide where they go."
},
{
    category: "Links",
    question: "Fake websites often:",
    answers: ["Look identical", "Have obvious warnings", "Don’t load"],
    correct: 0,
    explanation: "They are designed to look real."
},
{
    category: "Links",
    question: "A secure website should start with:",
    answers: ["http://", "https://", "ftp://"],
    correct: 1,
    explanation: "HTTPS indicates encryption."
},
{
    category: "Links",
    question: "Misspelled domain names are:",
    answers: ["Safe", "Suspicious", "Normal"],
    correct: 1,
    explanation: "Misspellings are common scam tactics."
},
{
    category: "Links",
    question: "Hovering over a link shows:",
    answers: ["Nothing", "Destination URL", "Password"],
    correct: 1,
    explanation: "It reveals the real destination."
},
{
    category: "Links",
    question: "Bit.ly links can:",
    answers: ["Always be trusted", "Hide malicious sites", "Speed up internet"],
    correct: 1,
    explanation: "They hide the real URL."
},
{
    category: "Links",
    question: "Links from unknown senders should be:",
    answers: ["Clicked", "Ignored or checked", "Shared"],
    correct: 1,
    explanation: "Always verify before clicking."
},
{
    category: "Links",
    question: "Fake login pages are used to:",
    answers: ["Help users", "Steal credentials", "Fix accounts"],
    correct: 1,
    explanation: "They steal your login info."
},

/* ================= IMPERSONATION ================= */
{
    category: "Impersonation",
    question: "Your boss texts asking for gift cards urgently. What should you do?",
    answers: ["Send immediately", "Verify identity", "Ignore forever"],
    correct: 1,
    explanation: "Always verify unusual requests."
},
{
    category: "Impersonation",
    question: "Impersonation scams rely on:",
    answers: ["Trust and authority", "Random guessing", "Luck"],
    correct: 0,
    explanation: "Authority increases believability."
},
{
    category: "Impersonation",
    question: "Someone claims to be tech support and asks for access. What is this?",
    answers: ["Normal support", "Impersonation scam", "Software update"],
    correct: 1,
    explanation: "This is a common impersonation tactic."
},
{
    category: "Impersonation",
    question: "Impersonators often pretend to be:",
    answers: ["Celebrities only", "Trusted figures", "Strangers"],
    correct: 1,
    explanation: "They exploit trust."
},
{
    category: "Impersonation",
    question: "A scammer posing as IT support wants:",
    answers: ["To help", "Access to your system", "Feedback"],
    correct: 1,
    explanation: "They want control of your system."
},
{
    category: "Impersonation",
    question: "Unexpected requests from coworkers should be:",
    answers: ["Trusted", "Verified", "Ignored"],
    correct: 1,
    explanation: "Always verify unusual requests."
},
{
    category: "Impersonation",
    question: "Impersonation scams use:",
    answers: ["Authority", "Random guessing", "Luck"],
    correct: 0,
    explanation: "Authority is used to manipulate."
},
{
    category: "Impersonation",
    question: "A fake company email is an example of:",
    answers: ["Phishing", "Impersonation", "Spam"],
    correct: 1,
    explanation: "It pretends to be a real company."
},
{
    category: "Impersonation",
    question: "Best defense against impersonation?",
    answers: ["Trust quickly", "Verify identity", "Ignore everything"],
    correct: 1,
    explanation: "Verification is key."
},
{
    category: "Impersonation",
    question: "Impersonation scams often request:",
    answers: ["Information or money", "Jokes", "News"],
    correct: 0,
    explanation: "They want sensitive data or money."
},

/* ================= LOTTERY ================= */
{
    category: "Lottery",
    question: "You win a prize but must pay a fee. What is this?",
    answers: ["Legitimate prize", "Lottery scam", "Promotion"],
    correct: 1,
    explanation: "Real prizes don’t require payment."
},
{
    category: "Lottery",
    question: "Real lotteries usually:",
    answers: ["Ask for fees upfront", "Contact you randomly", "Do not require payment to claim"],
    correct: 2,
    explanation: "Legitimate winnings don’t require fees."
},
{
    category: "Lottery",
    question: "Winning something you never entered is:",
    answers: ["Lucky", "Suspicious", "Normal"],
    correct: 1,
    explanation: "Unexpected wins are suspicious."
},
{
    category: "Lottery",
    question: "Prize scams often require:",
    answers: ["No action", "Upfront payment", "Verification only"],
    correct: 1,
    explanation: "Fees are a major red flag."
},
{
    category: "Lottery",
    question: "Unexpected winnings are usually:",
    answers: ["Real", "Suspicious", "Guaranteed"],
    correct: 1,
    explanation: "They are usually scams."
},
{
    category: "Lottery",
    question: "Scammers promise prizes to:",
    answers: ["Help you", "Trick you", "Reward loyalty"],
    correct: 1,
    explanation: "It’s a manipulation tactic."
},
{
    category: "Lottery",
    question: "Legitimate contests:",
    answers: ["Charge fees", "Require entry", "Call randomly"],
    correct: 1,
    explanation: "You must enter to win."
},
{
    category: "Lottery",
    question: "Winning emails asking for fees are:",
    answers: ["Safe", "Scams", "Promotions"],
    correct: 1,
    explanation: "They are scams."
},
{
    category: "Lottery",
    question: "Prize scams target:",
    answers: ["Only businesses", "Anyone", "Only experts"],
    correct: 1,
    explanation: "Anyone can be targeted."
},
{
    category: "Lottery",
    question: "Best response to prize scams:",
    answers: ["Pay quickly", "Ignore/report", "Reply"],
    correct: 1,
    explanation: "Never engage with scammers."
},

/* ================= ROMANCE ================= */
{
    category: "Romance",
    question: "Someone online builds a relationship then asks for money. What is this?",
    answers: ["Romance scam", "Friendship", "Charity"],
    correct: 0,
    explanation: "Romance scams use emotional manipulation."
},
{
    category: "Romance",
    question: "Romance scammers often:",
    answers: ["Meet quickly", "Avoid meeting in person", "Share everything"],
    correct: 1,
    explanation: "They avoid real-life contact."
},
{
    category: "Romance",
    question: "Best way to avoid romance scams?",
    answers: ["Send small money", "Trust immediately", "Never send money to strangers"],
    correct: 2,
    explanation: "Never send money to people you haven’t met."
},
{
    category: "Romance",
    question: "Romance scammers often avoid:",
    answers: ["Talking", "Meeting in person", "Messaging"],
    correct: 1,
    explanation: "They avoid real-world interaction."
},
{
    category: "Romance",
    question: "They build trust to:",
    answers: ["Help you", "Ask for money", "Make friends"],
    correct: 1,
    explanation: "Trust is used to manipulate."
},
{
    category: "Romance",
    question: "Common excuse for money requests:",
    answers: ["Emergency", "Vacation", "Shopping"],
    correct: 0,
    explanation: "Emergencies are commonly used."
},
{
    category: "Romance",
    question: "Profiles with perfect photos are:",
    answers: ["Always real", "Possibly fake", "Verified"],
    correct: 1,
    explanation: "They may be stolen images."
},
{
    category: "Romance",
    question: "Romance scams often happen on:",
    answers: ["Dating apps", "Banks only", "Government sites"],
    correct: 0,
    explanation: "Dating platforms are common targets."
},
{
    category: "Romance",
    question: "Best protection is:",
    answers: ["Send small money", "Verify identity", "Trust quickly"],
    correct: 1,
    explanation: "Always verify identities."
},
{
    category: "Romance",
    question: "If someone asks for money early:",
    answers: ["Send it", "Be cautious", "Ignore warning signs"],
    correct: 1,
    explanation: "Early money requests are suspicious."
}

];

/* ================= LIMIT TO 10 RANDOM QUESTIONS ================= */
questions.sort(() => Math.random() - 0.5);
const quizQuestions = questions.slice(0, 10);

/* ================= STATE ================= */
let current = 0;
let score = 0;
let categoryScores = {};
let answered = false;

/* ================= LOAD ================= */
function loadQuestion() {
    const q = quizQuestions[current];

    document.getElementById("progress").innerText =
        `Question ${current + 1} of ${quizQuestions.length}`;

    document.getElementById("question").innerText =
        `[${q.category}] ${q.question}`;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.innerText = answer;
        btn.onclick = () => checkAnswer(index);
        answersDiv.appendChild(btn);
    });

    document.getElementById("feedback").innerText = "";
    document.getElementById("nextBtn").style.display = "none";
    answered = false;
}

/* ================= CHECK ================= */
function checkAnswer(index) {
    if (answered) return; // prevent double click

    const feedback = document.getElementById("feedback");
    const q = quizQuestions[current];

    if (!categoryScores[q.category]) {
        categoryScores[q.category] = { correct: 0, total: 0 };
    }

    categoryScores[q.category].total++;

    if (index === q.correct) {
        feedback.innerText = `✅ Correct! ${q.explanation}`;
        score++;
        categoryScores[q.category].correct++;
    } else {
        feedback.innerText = `❌ Incorrect. ${q.explanation}`;
    }

    answered = true;
    document.getElementById("nextBtn").style.display = "inline-block";
}

/* ================= NEXT ================= */
function nextQuestion() {
    current++;

    if (current < quizQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

/* ================= RESULTS ================= */
function showResults() {
    let resultText = `Quiz complete! Score: ${score}/${quizQuestions.length}\n\n`;

    resultText += "Category Breakdown:\n";

    for (let cat in categoryScores) {
        const c = categoryScores[cat];
        resultText += `${cat}: ${c.correct}/${c.total}\n`;
    }

    document.getElementById("question").innerText = resultText;
    document.getElementById("answers").innerHTML =
        '<button onclick="location.reload()">Restart Quiz</button>';
    document.getElementById("feedback").innerText = "";
    document.getElementById("nextBtn").style.display = "none";
}

/* ================= START ================= */
loadQuestion();