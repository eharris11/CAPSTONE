const questions = [

/* ================= PHISHING ================= */
{ category:"Phishing", question:"You receive an email from your bank asking you to log in through a link. What should you do?", answers:["Click the link immediately","Ignore it","Go to the bank website manually"], correct:2, explanation:"Always navigate directly to official websites rather than clicking links in emails." },
{ category:"Phishing", question:"Which is a red flag for phishing?", answers:["A personalized greeting","An unexpected request for sensitive info","Proper grammar and spelling"], correct:1, explanation:"Unexpected requests for sensitive info are a major warning sign." },
{ category:"Phishing", question:"A message asks for your password to fix an issue. What is this likely?", answers:["Normal support request","A phishing attempt","A routine security check"], correct:1, explanation:"Legitimate companies never ask for your password." },
{ category:"Phishing", question:"Phishing emails are primarily designed to make you:", answers:["Feel relaxed","Provide personal information","Delete your account"], correct:1, explanation:"They aim to trick you into giving sensitive information." },
{ category:"Phishing", question:"Which action is safest when you receive a suspicious email?", answers:["Reply and ask if it is real","Click the link to investigate","Go to the official site manually"], correct:2, explanation:"Always navigate manually to trusted websites." },
{ category:"Phishing", question:"Phishing messages commonly include:", answers:["Personalized account history","Unexpected links or attachments","Accurate company contact details"], correct:1, explanation:"Links and attachments redirect you to fake sites or install malware." },
{ category:"Phishing", question:"What should you do with suspicious email attachments?", answers:["Open immediately to check","Delete or scan with antivirus","Forward to coworkers"], correct:1, explanation:"Attachments may contain malware." },
{ category:"Phishing", question:"Phishing attempts most often impersonate:", answers:["Random strangers","Trusted organizations like banks","Celebrities"], correct:1, explanation:"They pose as trusted institutions to seem credible." },
{ category:"Phishing", question:"Emails asking for login credentials are almost always:", answers:["Safe and routine","Phishing attempts","System updates"], correct:1, explanation:"Credential requests via email are a major red flag." },
{ category:"Phishing", question:"What is the ultimate goal of most phishing attacks?", answers:["To help you reset your password","To steal your personal data","To improve their service"], correct:1, explanation:"Phishing is designed to steal sensitive data." },

/* ================= URGENCY ================= */
{ category:"Urgency", question:"A message says 'Act now or lose access forever!' What tactic is this?", answers:["A helpful reminder","An urgency/pressure tactic","A routine update notification"], correct:1, explanation:"Scammers use urgency to pressure you into quick, unconsidered actions." },
{ category:"Urgency", question:"Why do scammers create a sense of urgency?", answers:["To help users act faster","To reduce your thinking time","To improve account security"], correct:1, explanation:"Urgency bypasses your critical thinking." },
{ category:"Urgency", question:"What is the best response to an urgent message demanding action?", answers:["Act immediately","Verify through official channels first","Ignore everything"], correct:1, explanation:"Always verify before acting, no matter how urgent it seems." },
{ category:"Urgency", question:"Urgent scam messages often contain phrases like:", answers:["Take your time with this","Act immediately or face consequences","This is not time sensitive"], correct:1, explanation:"They push you to act quickly without thinking." },
{ category:"Urgency", question:"Why is urgency particularly dangerous in scams?", answers:["It slows down decision-making","It triggers fear and panic","It improves response accuracy"], correct:1, explanation:"Panic and fear reduce logical thinking." },
{ category:"Urgency", question:"Best reaction to a message threatening consequences in minutes?", answers:["Respond instantly by clicking","Pause, breathe, and verify calmly","Delete all your accounts"], correct:1, explanation:"Stay calm and verify through official channels." },
{ category:"Urgency", question:"Scammers use urgency primarily to:", answers:["Help you solve a real problem","Manipulate you into acting without thinking","Save you time"], correct:1, explanation:"It is a manipulation tactic." },
{ category:"Urgency", question:"What do scammers most want you to avoid doing?", answers:["Acting quickly","Thinking critically about the message","Reading the message carefully"], correct:1, explanation:"They want you to act without thinking." },
{ category:"Urgency", question:"A message says your account will be deleted in 5 minutes. You should:", answers:["Click the provided link immediately","Pause and contact the company directly","Ignore it permanently"], correct:1, explanation:"Verify through official channels, not through the message's link." },
{ category:"Urgency", question:"Urgency-based scams rely primarily on:", answers:["Logic and clear facts","Fear, panic, and pressure","Detailed account information"], correct:1, explanation:"Fear drives poor, hasty decisions." },

/* ================= LINKS ================= */
{ category:"Links", question:"Which of these links looks suspicious?", answers:["amazon.com","secure-amazon-login.net","google.com"], correct:1, explanation:"Fake domains mimic real ones to trick you." },
{ category:"Links", question:"Before clicking any link you should:", answers:["Click it quickly to see where it goes","Inspect the URL carefully first","Ignore all links by default"], correct:1, explanation:"Always inspect links before clicking." },
{ category:"Links", question:"Shortened links (like bit.ly) can be dangerous because:", answers:["They are always tracked by hackers","They hide the real destination URL","They load slower than normal links"], correct:1, explanation:"Shortened links conceal where they actually lead." },
{ category:"Links", question:"Fake websites designed to steal credentials often:", answers:["Look identical to the real site","Have obvious spelling mistakes","Fail to load at all"], correct:0, explanation:"They are carefully designed to look real." },
{ category:"Links", question:"A secure website URL should begin with:", answers:["http://","https://","ftp://"], correct:1, explanation:"HTTPS indicates an encrypted connection." },
{ category:"Links", question:"Misspelled domain names in a URL are:", answers:["A normal company practice","A common scam tactic","Always harmless"], correct:1, explanation:"Typosquatting is a well-known scam technique." },
{ category:"Links", question:"Hovering over a link (without clicking) shows you:", answers:["Nothing useful","The real destination URL","Your browser history"], correct:1, explanation:"Hovering reveals the actual URL in most browsers." },
{ category:"Links", question:"Links from unknown senders should be:", answers:["Clicked to verify they are safe","Ignored or manually checked","Forwarded to others"], correct:1, explanation:"Always verify before clicking links from unknown sources." },
{ category:"Links", question:"Fake login pages are primarily used to:", answers:["Help you reset a password","Steal your login credentials","Speed up account access"], correct:1, explanation:"They capture your username and password." },
{ category:"Links", question:"Which is the safest way to visit a site mentioned in a suspicious email?", answers:["Click the link in the email","Search for it manually in your browser","Reply asking for a safer link"], correct:1, explanation:"Always navigate manually through a search or saved bookmark." },

/* ================= IMPERSONATION ================= */
{ category:"Impersonation", question:"Your boss texts asking you to buy gift cards urgently. What should you do?", answers:["Buy and send them immediately","Call your boss on a known number to verify","Ignore the message permanently"], correct:1, explanation:"Always verify unusual requests through a separate, trusted channel." },
{ category:"Impersonation", question:"Impersonation scams work primarily because they exploit:", answers:["Trust and perceived authority","Random guessing","Luck"], correct:0, explanation:"People are more likely to comply with perceived authority figures." },
{ category:"Impersonation", question:"Someone claims to be IT support and requests remote access to your computer. This is likely:", answers:["Normal IT procedure","An impersonation scam","A software update request"], correct:1, explanation:"Unsolicited tech support requests are a classic impersonation tactic." },
{ category:"Impersonation", question:"Who do impersonators most commonly pretend to be?", answers:["Random strangers","Trusted figures like bosses, banks, or government agencies","Celebrities only"], correct:1, explanation:"They exploit the trust you have in authority figures." },
{ category:"Impersonation", question:"An unexpected request from someone claiming to be a coworker should be:", answers:["Immediately trusted","Verified through official means","Always ignored"], correct:1, explanation:"Always verify unusual requests regardless of who they seem to come from." },
{ category:"Impersonation", question:"A fake company email asking for your credentials is an example of:", answers:["A phishing/impersonation combo attack","Normal company policy","A security alert"], correct:0, explanation:"It combines phishing techniques with impersonation." },
{ category:"Impersonation", question:"The best defense against impersonation scams is:", answers:["Trust quickly to seem cooperative","Verify identity through a separate trusted channel","Ignore all digital communication"], correct:1, explanation:"Independent verification is the key defense." },
{ category:"Impersonation", question:"Impersonation scams most often request:", answers:["Money or sensitive information","Jokes and casual conversation","Public news articles"], correct:0, explanation:"The goal is always to extract money or data." },
{ category:"Impersonation", question:"A scammer posing as your bank calls asking for your PIN. You should:", answers:["Provide it to confirm your identity","Hang up and call the bank directly","Give the last few digits only"], correct:1, explanation:"Hang up and call back using the number on your card or the bank website." },
{ category:"Impersonation", question:"Impersonation scams are most dangerous because:", answers:["They use technical hacking tools","They exploit your existing trust in real institutions","They are very easy to detect"], correct:1, explanation:"Using a familiar identity lowers your guard." },

/* ================= LOTTERY ================= */
{ category:"Lottery", question:"You receive an email saying you won a prize but must pay a fee to claim it. This is:", answers:["A legitimate prize","A lottery/advance fee scam","A special promotion"], correct:1, explanation:"Real prizes never require upfront payment to claim." },
{ category:"Lottery", question:"Legitimate prize drawings usually:", answers:["Ask winners to pay fees upfront","Contact random people who never entered","Do not require any payment to claim winnings"], correct:2, explanation:"Legitimate winnings do not come with fees." },
{ category:"Lottery", question:"Winning a prize for a contest you never entered is:", answers:["Very lucky","Almost certainly a scam","A common marketing practice"], correct:1, explanation:"You cannot win something you never entered." },
{ category:"Lottery", question:"Prize scams almost always require:", answers:["Nothing — just your address","An upfront payment or fee","Only identity verification"], correct:1, explanation:"The upfront fee is how scammers profit." },
{ category:"Lottery", question:"Unexpected winning notifications are most likely:", answers:["Real and worth claiming","Scams designed to steal money","Government-approved promotions"], correct:1, explanation:"Unexpected winning messages are almost always scams." },
{ category:"Lottery", question:"Scammers use fake prize promises to:", answers:["Genuinely reward customers","Trick people into sending money or info","Promote real businesses"], correct:1, explanation:"It is purely a manipulation tactic." },
{ category:"Lottery", question:"Legitimate contests and sweepstakes:", answers:["Charge an entry fee","Require you to actually enter or be selected","Call random phone numbers"], correct:1, explanation:"You must have entered to win something legitimate." },
{ category:"Lottery", question:"An email saying you won $50,000 but owe $500 in processing fees is:", answers:["A government-sponsored lottery","An advance-fee scam","A tax refund notice"], correct:1, explanation:"This is a textbook advance-fee / lottery scam." },
{ category:"Lottery", question:"Prize scams can target:", answers:["Only elderly people","Anyone regardless of age or background","Only people who play lotteries"], correct:1, explanation:"Anyone can be targeted." },
{ category:"Lottery", question:"The best response to a suspicious prize notification is:", answers:["Pay the fee immediately to secure the prize","Ignore it and report it if possible","Reply to confirm your interest"], correct:1, explanation:"Never engage — ignore and report." },

/* ================= ROMANCE ================= */
{ category:"Romance", question:"Someone online builds a relationship over weeks then asks for money. This is:", answers:["A romance scam","A genuine friendship","A common way to borrow money"], correct:0, explanation:"This is a textbook romance scam using emotional manipulation." },
{ category:"Romance", question:"Romance scammers typically:", answers:["Arrange to meet in person quickly","Avoid meeting in person and make excuses","Share real photos and social media"], correct:1, explanation:"They always avoid real-world contact." },
{ category:"Romance", question:"The best way to protect yourself from romance scams is:", answers:["Send small amounts of money to test them","Trust quickly if the relationship feels real","Never send money to someone you have not met in person"], correct:2, explanation:"Never send money to an online contact you have not met in person." },
{ category:"Romance", question:"A common excuse romance scammers use to ask for money is:", answers:["A sudden medical or travel emergency","They want to buy you a gift","They want to invest together"], correct:0, explanation:"Fabricated emergencies are the most common trigger for money requests." },
{ category:"Romance", question:"Romance scammers build trust in order to:", answers:["Form a genuine relationship","Eventually request money or personal info","Share investment tips"], correct:1, explanation:"Trust is built deliberately to exploit you later." },
{ category:"Romance", question:"Profile photos that look too perfect on a dating app might be:", answers:["Always a sign of a genuine person","Stolen images used by a scammer","Automatically verified by the platform"], correct:1, explanation:"Scammers often use stolen or AI-generated photos." },
{ category:"Romance", question:"Romance scams most often start on:", answers:["Dating apps and social media platforms","Government websites","Banking websites"], correct:0, explanation:"Dating apps and social media are the primary hunting grounds." },
{ category:"Romance", question:"If someone you met online asks for money early in the relationship you should:", answers:["Send a small amount to seem helpful","Be cautious — this is a major red flag","Ask mutual friends if it is okay"], correct:1, explanation:"Early money requests are almost always a scam warning sign." },
{ category:"Romance", question:"The best defense against romance scams is:", answers:["Sending small amounts to test honesty","Video chatting to verify their identity and never sending money","Trusting your feelings about the person"], correct:1, explanation:"Video verification helps — and never send money regardless." },
{ category:"Romance", question:"If you suspect you are being targeted by a romance scam you should:", answers:["Continue the relationship to gather evidence","Stop all contact and report it to the platform","Ask the person directly if they are a scammer"], correct:1, explanation:"Stop contact immediately and report it." }

];

const typeIcons = {
    Phishing: "🎣",
    Urgency: "⏰",
    Links: "🔗",
    Impersonation: "🎭",
    Lottery: "🎰",
    Romance: "💔"
};

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const urlType = params.get("type");
    if (urlType) {
        startQuiz(urlType);
    }
});

let quizQuestions = [];
let current = 0;
let score = 0;
let categoryScores = {};
let answered = false;
let activeType = null;

function startQuiz(type) {
    activeType = type;

    let pool = type
        ? questions.filter(q => q.category === type)
        : [...questions];

    if (pool.length === 0) pool = [...questions];

    pool.sort(() => Math.random() - 0.5);
    quizQuestions = pool.slice(0, Math.min(10, pool.length));

    current = 0;
    score = 0;
    categoryScores = {};
    answered = false;

    document.getElementById("selectorView").classList.add("hidden");
    document.getElementById("quizView").classList.remove("hidden");

    const icon = typeIcons[type] || "🎲";
    document.getElementById("quizTitle").textContent = type ? `${type} Quiz` : "Mixed Quiz";
    document.getElementById("quizSubtitle").textContent = type
        ? `Test your knowledge on ${type.toLowerCase()} scams`
        : "Questions across all scam categories";
    document.getElementById("typeBadge").textContent = type ? `${icon} ${type}` : "🎲 Mixed";

    loadQuestion();
}

function loadQuestion() {
    const q = quizQuestions[current];
    const total = quizQuestions.length;
    const pct = (current / total) * 100;

    document.getElementById("progress").textContent = `${current + 1} / ${total}`;
    document.getElementById("progressBar").style.width = pct + "%";
    document.getElementById("question").textContent = q.question;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    const correctText = q.answers[q.correct];
    const shuffled = [...q.answers].sort(() => Math.random() - 0.5);

    shuffled.forEach((answer) => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        const isCorrect = (answer === correctText);
        btn.onclick = () => checkAnswer(isCorrect, btn, answersDiv);
        answersDiv.appendChild(btn);
    });

    const feedback = document.getElementById("feedback");
    feedback.textContent = "";
    feedback.className = "";

    document.getElementById("nextBtn").style.display = "none";
    answered = false;
}

function checkAnswer(isCorrect, clickedBtn, answersDiv) {
    if (answered) return;
    answered = true;

    const q = quizQuestions[current];
    const correctText = q.answers[q.correct];
    const buttons = answersDiv.querySelectorAll("button");

    if (!categoryScores[q.category]) {
        categoryScores[q.category] = { correct: 0, total: 0 };
    }
    categoryScores[q.category].total++;

    buttons.forEach(btn => btn.disabled = true);

    const feedback = document.getElementById("feedback");

    if (isCorrect) {
        clickedBtn.classList.add("correct");
        feedback.textContent = `✅ Correct! ${q.explanation}`;
        score++;
        categoryScores[q.category].correct++;
    } else {
        clickedBtn.classList.add("incorrect");
        buttons.forEach(btn => {
            if (btn.textContent === correctText) btn.classList.add("correct");
        });
        feedback.textContent = `❌ Not quite. ${q.explanation}`;
    }

    feedback.classList.add("visible");
    document.getElementById("nextBtn").style.display = "inline-block";

    const pct = ((current + 1) / quizQuestions.length) * 100;
    document.getElementById("progressBar").style.width = pct + "%";
}

function nextQuestion() {
    current++;
    if (current < quizQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const total = quizQuestions.length;
    const pct = Math.round((score / total) * 100);

    let message = "Keep practicing!";
    if (pct === 100) message = "Perfect score! 🏆";
    else if (pct >= 80) message = "Great work! 🎉";
    else if (pct >= 60) message = "Good effort — keep it up!";

    let breakdownHTML = "";
    for (let cat in categoryScores) {
        const c = categoryScores[cat];
        breakdownHTML += `
            <div class="breakdown-item">
                <div class="cat-name">${cat}</div>
                <div class="cat-score">${c.correct}/${c.total}</div>
            </div>`;
    }

    const quizCard = document.querySelector("#quizView .card");
    quizCard.innerHTML = `
        <div class="quiz-results-view">
            <div class="score-circle">
                <span class="sc-num">${score}</span>
                <span class="sc-den">/ ${total}</span>
            </div>
            <div class="results-title">${message}</div>
            <div class="results-subtitle">${pct}% accuracy${activeType ? ` on ${activeType} scams` : ""}</div>
            ${breakdownHTML ? `<div class="category-breakdown">${breakdownHTML}</div>` : ""}
            <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
                <button class="primary" onclick="retryQuiz()">Try Again</button>
                <a href="/quiz.html" class="primary" style="background:rgba(255,255,255,0.08);color:var(--text-secondary);border:1px solid var(--border-subtle);">Choose Category</a>
            </div>
        </div>`;
}

function retryQuiz() {
    const quizCard = document.querySelector("#quizView .card");
    quizCard.innerHTML = `
        <h3 id="question">Loading…</h3>
        <div id="answers"></div>
        <p id="feedback"></p>
        <button id="nextBtn" onclick="nextQuestion()">Next Question →</button>`;
    startQuiz(activeType);
}