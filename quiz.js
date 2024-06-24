const quizData = [
    {
        question: "What is my my maiden name?",
        a: "Abdul",
        b: "Azeez",
        c: "Adeleke",
        d: "All of the above",
        correct: "b"
    },
    {   
        question: "What is my favorite color?",
        a: "Red",
        b: "Blue",
        c: "Green",
        d: "Yellow",
        correct: "b" // Replace with the correct answer
    },
    {
            question: "What is my favorite sport?",
            a: "Football",
            b: "Basketball",
            c: "Tennis",
            d: "Swimming",
            correct: "a" // Replace with the correct answer
    },
        {
            question: "Which superpower would I choose?",
            a: "Super speed",
            b: "Super strength",
            c: "Teleportation",
            d: "Time travel",
            correct: "a" // Replace with the correct answer
        },
        {
            question: "What is my favorite book?",
            a: "Harry Potter",
            b: "The Lord of the Rings",
            c: "The Great Gatsby",
            d: "To Kill a Mockingbird",
            correct: "a" // Replace with the correct answer
        },
        {
            question: "What is my favorite ice cream flavor?",
            a: "Vanilla",
            b: "Chocolate",
            c: "Strawberry",
            d: "Mint Chocolate Chip",
            correct: "b" // Replace with the correct answer
        },
        {
            question: "Which animal do I like the most?",
            a: "Dog",
            b: "Dolphin",
            c: "Cat",
            d: "Eagle",
            correct: "c" // Replace with the correct answer
        },
        {
            question: "What is my favorite type of weather?",
            a: "Sunny",
            b: "Rainy",
            c: "Snowy",
            d: "Windy",
            correct: "b" // Replace with the correct answer
        },
        {
            question: "What is my favorite TV show?",
            a: "AGT",
            b: "BGT",
            c: "The Voice kids",
            d: "The Thundermans",
            correct: "a" // Replace with the correct answer
        },
        {
            question: "Which holiday do I enjoy the most?",
            a: "Christmas",
            b: "Eid",
            c: "New Year's Eve",
            d: "Valentine",
            correct: "c" // Replace with the correct answer
        },
        {
            question: "What is my favorite drink?",
            a: "Coffee",
            b: "Tea",
            c: "Soda",
            d: "Juice",
            correct: "a" // Replace with the correct answer
        },
        {
            question: "What is my favorite outdoor activity?",
            a: "Hiking",
            b: "Biking",
            c: "Sight seeing",
            d: "Fishing",
            correct: "c" // Replace with the correct answer
        },
        {
            question: "Which historical period do I find most fascinating?",
            a: "Ancient Egypt",
            b: "Renaissance",
            c: "World War II",
            d: "Victorian Era",
            correct: "a" // Replace with the correct answer
        },
        {
            question: "What is my favorite board game?",
            a: "Monopoly",
            b: "Scrabble",
            c: "Settlers of Catan",
            d: "Chess",
            correct: "a" // Replace with the correct answer
        },
        {
            question: "If I could have any job in the world, what would it be?",
            a: "Pilot",
            b: "Medical doctor",
            c: "Astronaut",
            d: "Surgeon",
            correct: "d" // Replace with the correct answer
        },
        
        
    ];


const nameInputContainer = document.getElementById('name-input-container');
const startBtn = document.getElementById('start-btn');
const userNameInput = document.getElementById('user-name');
const userEmailInput = document.getElementById('user-email');
const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('quiz-question');
const options = document.querySelectorAll('.quiz-option');
const nextBtn = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');

let currentQuiz = 0;
let score = 0;
let selectedAnswer = null;
let userName = '';
let userEmail = '';

startBtn.addEventListener('click', () => {
    userName = userNameInput.value.trim();
    userEmail = userEmailInput.value.trim();
    if (userName && userEmail) {
        if (hasUserAttemptedQuiz(userEmail)) {
            alert('You have already attempted the quiz.');
        } else {
            nameInputContainer.style.display = 'none';
            quiz.style.display = 'block';
            loadQuiz();
        }
    } else {
        alert('Please enter your name and email');
    }
});

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    options[0].innerText = currentQuizData.a;
    options[1].innerText = currentQuizData.b;
    options[2].innerText = currentQuizData.c;
    options[3].innerText = currentQuizData.d;
    nextBtn.style.display = 'none';
}

function deselectAnswers() {
    options.forEach(option => option.classList.remove('selected'));
    selectedAnswer = null;
}

options.forEach(option => {
    option.addEventListener('click', () => {
        deselectAnswers();
        option.classList.add('selected');
        selectedAnswer = option.id;  // Use getAttribute to get the ID
        nextBtn.style.display = 'block';
    });
});

nextBtn.addEventListener('click', () => {
    if (selectedAnswer) {
        if (selectedAnswer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            storeScore(userName, userEmail, score);
            displayScores();
            quiz.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly</h2>
                <button onclick="location.reload()">Reload</button>
            `;
        }
    }
});

function storeScore(name, email, score) {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({ name, email, score });
    scores.sort((a, b) => b.score - a.score);
    if (scores.length > 5) {
        scores.pop();
    }
    localStorage.setItem('scores', JSON.stringify(scores));
}

function displayScores() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scoreContainer.style.display = 'block';
    scoreContainer.innerHTML = '<h3>Top 5 Scores</h3>';
    scores.forEach((entry, index) => {
        scoreContainer.innerHTML += `<p>${index + 1}. ${entry.name} - ${entry.score}</p>`;
    });
}

function hasUserAttemptedQuiz(email) {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    return scores.some(entry => entry.email === email);
}
