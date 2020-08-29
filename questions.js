// All HTML elements gathered
var startQuizEl = document.getElementById("startpage");
var startQuizBt = document.getElementById("startButton");
var startpageHS = document.getElementById("startPageHS");
var quizEl = document.getElementById("quiz");
var timerEl = document.getElementById("timer");
var questionsEl= document.getElementById("questions");
var resultsEl = document.getElementById("result");
var gameEndEl = document.getElementById("gameEnd");
var finalScoreEl = document.getElementById("finalscore");
var inputNames = document.getElementById("inputNames");
var submitScoreBt = document.getElementById("submitScore");
var highscoreCont = document.getElementById("highscoreCont");
var highscorePage = document.getElementById("highscorePage");
var highscoreName = document.getElementById("highscoreName");
var highscoreScore = document.getElementById("highscoreScore");
var gameEndBt = document.getElementById("endgameButtons");
var buttonA = document.getElementById("A");
var buttonB = document.getElementById("B");
var buttonC = document.getElementById("C");
var buttonD = document.getElementById("D");
var timeLeft = 90;
var timeInterval;
var scoreOverall = 0;
var questionCurrentIndex = 0;
var questionFinalIndex = quizQuestions.length;
var correct;

// Oject for Quiz questions 
var quizQuestions =[{
    question: "What is the correct JavaScript syntax to write 'Hello World'?",
    optionA: "System.out.println('Hello World')",
    optionB: "println ('Hello World')",
    optionC: "document.write('Hello World')",
    optionD: "response.write('Hello World')",
    correctAnswer: "C"},
{
    question: "What JavaScript keyword declares a variable?",
    optionA: "if",
    optionB: "var",
    optionC: "for",
    optionD: "const",
    correctAnswer: "B"},
{
    question: "The condition in an if / else statment is enclosed within ____.",
    optionA: "parentheses",
    optionB: "square brackets",
    optionC: "quotes",
    optionD: "curly brackets",
    correctAnswer: "A"},
{
    question: "A useful too used during development for printing content to the debugger is:",
    optionA: "for loops",
    optionB: "console.log",
    optionC: "teminal/bash ",
    optionD: "DOM",
    correctAnswer: "B"},
{
    question: "Arrays in JavaScript can be used to store ____.?",
    optionA: "booleans",
    optionB: "other arrays",
    optionC: "numbers and strings",
    optionD: "all of the above",
    correctAnswer: "D"},
{
    question: "What does DOM stand for?",
    optionA: "Display Object Marker",
    optionB: "Docuemnt Object Model",
    optionC: "Decrease Ordinance Mode",
    optionD: "Digital Operation Max",
    correctAnswer: ""},

];

// A funtion for going through the arrays that contain the quiz questions. They generate the questions and answers.
function generateQuizQuestion(){
    gameEndEl.style.display = "none";
    if (questionCurrentIndex === questionFinalIndex){
        return showScore();
    }
    var questionCurrent = quiQuestions[questionCurrentIndex];
        questionsEl.innerHTML = "<p>" + questionCurrent.question + "<p>";
            buttonA.innerHTML = questionCurrent.optionA;
            buttonB.innerHTML = questionCurrent.optionB;
            buttonC.innerHTML = questionCurrent.optionC;
            buttonD.innerHTML = questionCurrent.optionD;
};

// The start quiz function that starts the timer. Will also had the buttons and disply the first quiz question.
function startQiz(){
    gameEndEl.style.display = "none";
    startQuizEl.style.display = "none";
    generateQuizQuestion();

// The timer function
    timerInterval = setInterval(
        function() {
        timeLeft--;
        timerEl.textContent = "Time Left" + timeLeft;

            if(timeLeft === 0) {
                clearInterval(timerInterval);
                showScore();
            }
        }, 1000
    );
    quizEl.style.display = "block";
}
// Function that shows the end page that will disply your score after quiz completion or timer runs out.
function showScore(){
    clearInterval(timerInterval);
    inputName.value ="";
    finalScoreEl.innerHTML = "You got" + score + "out of" + quizQuestions.length + "corrent!";
}

// When we click submit we run the highscore function that saves and adds a string to the array of high scores 
// saved in local storage. The new user name and score are push into the same array that is saved in local storage. 
// It will then run the function to show high scores. 
submitScoreBt.addEventListener("click", function highscore(){

    if(inputName.value === ""){
        alert("Name can not be blank");
        return false;
    } else {
        var savedHighscore = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = inputName.value.trim();
        var currentHighscore = {
            name : currentUser, score : score
        };
    savedHighscore.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();
    }
});

// This function clears out the list of high scores and generates a new high scre list based on local storage.
function generateHighscores() {
    highscoreName.innerHTML = "";
    highscoreScore.innerHTML = "";
    var highscoresEl =JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i,highscores.length; i++){
        var newNameSpan = docuemnt.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscoresEl[i].name;
        newScoreSpan.textContent = highscoresEl[i].score;
        highscoreName.appendChild(newNameSpan);
        highscoreScore.appendChild(newScoreSpan);
    }
}

// This function displays high scores while hiding all the other elements.
function showHighscore(){
    startQuizEl.style.display = "none";
    gameEndEl.style.display = "none";
    highscoreCont.style.display = "flex";
    highscorePage.style.display = "block";
    gameEndBt.style.display = "flex";
    generateHighscores();
}

// This function clears the text from the high score board and clears the high scores from local storage.
function clearScore(){
    window.localStorage.clear();
    highscoreName.textContent = "";
    highscoreScore.textContent = "";
}

// This function resets all the variables and shows the homepage again to replay the quiz.
function replayQuiz(){
    highscoreCont.style.display = "none";
    gameEndEl.style.display = "none";
    startQuizEl.style.display = "flex";
    timeLeft = 90;
    score = 0;
    questionCurrentIndex = 0;
}

// This function checks the answers 
function checkAnswer(answer){
    correct = quizQuestions[questionCurrentIndex].correctAnswer;
    if (answer === correct && 
        questionCurrentIndex !== 
        questionFinalIndex) {
        score++;
        alert("Correct!");
        questionCurrentIndex++;
        generateQuizQuestion();
    }else{
        showScore();
        }
}

// Start the quiz button!
startQuizBt.addEventListener("click",startQuiz);
