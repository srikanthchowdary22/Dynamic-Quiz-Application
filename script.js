// ================= QUESTION BANK =================

const questionBank = {
  easy: [
    {
      question: "Which language is used to structure a web page?",
      options: ["CSS", "HTML", "JavaScript", "Python"],
      answer: "HTML",
    },
    {
      question: "Which CSS property changes text color?",
      options: ["font-style", "color", "background", "text-align"],
      answer: "color",
    },
    {
      question: "Which keyword is used to declare variables in JavaScript?",
      options: ["var", "int", "string", "define"],
      answer: "var",
    },
    {
      question: "What is software testing?",
      options: [
        "Writing code",
        "Finding defects",
        "Deploying software",
        "Designing UI",
      ],
      answer: "Finding defects",
    },
    {
      question: "Which testing verifies application functionality?",
      options: [
        "Unit Testing",
        "Functional Testing",
        "Load Testing",
        "Security Testing",
      ],
      answer: "Functional Testing",
    },
  ],

  medium: [
    {
      question: "Which HTML tag is used to create forms?",
      options: ["<input>", "<form>", "<button>", "<table>"],
      answer: "<form>",
    },
    {
      question: "Which JavaScript method selects an element by ID?",
      options: [
        "getElementById()",
        "querySelectorAll()",
        "getElementsByClassName()",
        "selectById()",
      ],
      answer: "getElementById()",
    },
    {
      question: "Which CSS layout helps build responsive pages?",
      options: ["Float", "Flexbox", "Table", "Inline"],
      answer: "Flexbox",
    },
    {
      question: "Which testing is done without executing code?",
      options: [
        "Dynamic Testing",
        "Black Box Testing",
        "White Box Testing",
        "Static Testing",
      ],
      answer: "Static Testing",
    },
    {
      question: "Which document contains test cases?",
      options: ["SRS", "Test Plan", "Test Case Document", "Bug Report"],
      answer: "Test Case Document",
    },
  ],

  hard: [
    {
      question: "Which HTTP method updates existing data?",
      options: ["GET", "POST", "PUT", "DELETE"],
      answer: "PUT",
    },
    {
      question: "Which testing checks system behavior under heavy load?",
      options: [
        "Smoke Testing",
        "Regression Testing",
        "Load Testing",
        "Unit Testing",
      ],
      answer: "Load Testing",
    },
    {
      question: "What does DOM stand for?",
      options: [
        "Data Object Model",
        "Document Object Model",
        "Digital Output Method",
        "Display Object Management",
      ],
      answer: "Document Object Model",
    },
    {
      question: "Which testing is done after code changes?",
      options: [
        "Smoke Testing",
        "Regression Testing",
        "Alpha Testing",
        "Sanity Testing",
      ],
      answer: "Regression Testing",
    },
    {
      question: "Which Selenium method clicks a button?",
      options: ["submit()", "press()", "click()", "tap()"],
      answer: "click()",
    },
  ],
};

// ================= VARIABLES =================

let questions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;
let timeSpent = [];

// ================= ELEMENTS =================

const startBtn = document.getElementById("startBtn");
const levelSelect = document.getElementById("levelSelect");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timeEl = document.getElementById("time");
const nextBtn = document.getElementById("nextBtn");

// ================= START QUIZ =================

startBtn.onclick = () => {
  questions = questionBank[levelSelect.value];

  currentIndex = 0;
  score = 0;
  timeSpent = [];

  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  loadQuestion();
};

// ================= LOAD QUESTION =================

function loadQuestion() {
  resetTimer();
  questionEl.textContent = questions[currentIndex].question;
  optionsEl.innerHTML = "";

  questions[currentIndex].options.forEach((opt) => {
    const label = document.createElement("label");
    label.innerHTML = `
            <input type="radio" name="option" value="${opt}"> ${opt}
        `;
    optionsEl.appendChild(label);
  });

  startTimer();
}

// ================= TIMER =================

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft === 0) {
      submitAnswer();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 10;
  timeEl.textContent = timeLeft;
}

// ================= SUBMIT ANSWER =================

nextBtn.onclick = submitAnswer;

function submitAnswer() {
  clearInterval(timer);

  const selected = document.querySelector('input[name="option"]:checked');
  timeSpent.push(10 - timeLeft);

  if (selected && selected.value === questions[currentIndex].answer) {
    score++;
  }

  currentIndex++;

  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

// ================= RESULTS =================

function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  document.getElementById("score").textContent =
    `Correct: ${score} | Incorrect: ${questions.length - score}`;

  document.getElementById("performance").textContent =
    `Accuracy: ${((score / questions.length) * 100).toFixed(2)}%`;

  drawChart();
}

// ================= CHART =================

function drawChart() {
  const canvas = document.getElementById("chart");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "blue";

  timeSpent.forEach((time, index) => {
    ctx.fillRect(index * 55 + 20, canvas.height - time * 20, 30, time * 20);
    ctx.fillText(`Q${index + 1}`, index * 55 + 25, canvas.height - 5);
  });
}
