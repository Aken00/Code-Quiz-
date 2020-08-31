// All HTML elements gathered
var startPage = document.getElementById("startPage");
var startQuizBt = document.getElementById("startQuizBt");
var quizEL = document.getElementById("quiz");
var TimerEl = document.getElementById("timer");
var questionsEl = document.getElementById("questions");
var resultsEl = document.getElementById("result");
var gameEnd = document.getElementById("gameEnd");
var finalScoreEl = document.getElementById("finalScore");
var InputName = document.getElementById("InputName");
var submitScoreBt = document.getElementById("submitScore");
var highscoreCont = document.getElementById("highscoreContainer");
var highscorePage = document.getElementById("highscorePage");
var highscoreName = document.getElementById("highscoreName");
var highscoreScore = document.getElementById("highscoreScore");
var gameEndBt = document.getElementById("gameEndBt");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Object for Quiz questions.
var quizQuestions =[{
    question: "What is the correct JavaScript syntax to write 'Hello World'?",
    choiceA: "System.out.println('Hello World')",
    choiceB: "println ('Hello World')",
    choiceC: "document.write('Hello World')",
    choiceD: "response.write('Hello World')",
    correctAnswer: "c"},
{
    question: "What JavaScript keyword declares a variable?",
    choiceA: "if",
    choiceB: "var",
    choiceC: "for",
    choiceD: "const",
    correctAnswer: "b"},
{
    question: "The condition in an if / else statment is enclosed within ____.",
    choiceA: "parentheses",
    choiceB: "square brackets",
    choiceC: "quotes",
    choiceD: "curly brackets",
    correctAnswer: "a"},
{
    question: "A useful too used during development for printing content to the debugger is:",
    choiceA: "for loops",
    choiceB: "console.log",
    choiceC: "teminal/bash ",
    choiceD: "DOM",
    correctAnswer: "b"},
{
    question: "Arrays in JavaScript can be used to store ____.?",
    choiceA: "booleans",
    choiceB: "other arrays",
    choiceC: "numbers and strings",
    choiceD: "all of the above",
    correctAnswer: "d"},
{
    question: "What does DOM stand for?",
    choiceA: "Display Object Marker",
    choiceB: "Document Object Model",
    choiceC: "Decrease Ordinance Mode",
    choiceD: "Digital Operation Max",
    correctAnswer: "b"},

];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;
var correct;

// A funtion for going through the arrays that contain the quiz questions. They generate the questions and answers.
function generateQuizQuestion(){
    gameEnd.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + 
    currentQuestion.question + "</p>";
        buttonA.innerHTML = currentQuestion.choiceA;
        buttonB.innerHTML = currentQuestion.choiceB;
        buttonC.innerHTML = currentQuestion.choiceC;
        buttonD.innerHTML = currentQuestion.choiceD;
};

// The start quiz function that starts the timer. Will also disply the first quiz question.
function startQuiz(){
    gameEnd.style.display = "none";
    startPage.style.display = "none";
    generateQuizQuestion();

// The timer function
timerInterval = setInterval(function() {
        timeLeft--;
        TimerEl.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizEL.style.display = "block";
}
// Function that shows the end page that will disply your score after quiz completion or timer runs out.
function showScore(){
    quizEL.style.display = "none"
    gameEnd.style.display = "flex";
    clearInterval(timerInterval);
    InputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// When we click submit we run the highscore function that saves and adds a string to the array of high scores 
// saved in local storage. The new user name and score are pushed into the same array that is saved in local storage. 
// It will then run the function to show high scores. 
submitScoreBt.addEventListener("click", function highscore(){
    if(InputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = InputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameEnd.style.display = "none";
        highscoreCont.style.display = "flex";
        highscorePage.style.display = "block";
        gameEndBt.style.display = "flex";
        
    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();

    }
    
});

// This function clears out the list of high scores and generates a new high scre list based on local storage.
function generateHighscores(){
    highscoreName.innerHTML = "";
    highscoreScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreName.appendChild(newNameSpan);
        highscoreScore.appendChild(newScoreSpan);
    }
}

// This function clears the text from the high score board and clears the high scores from local storage.
function showHighscore(){
    startPage.style.display = "none"
    gameEnd.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscorePage.style.display = "block";
    gameEndBt.style.display = "flex";

    generateHighscores();
}

// This function clears the high scores from local storage and clears the text.
function clearScore(){
    window.localStorage.clear();
    highscoreName.textContent = "";
    highscoreScore.textContent = "";
}

// This function resets all the variables and shows the homepage again to replay the quiz.
function replayQuiz(){
    highscoreCont.style.display = "none";
    gameEnd.style.display = "none";
    startPage.style.display = "flex";
    timeLeft = 60;
    score = 0;
    currentQuestionIndex = 0;
}

// This function checks the answers 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;
// Alert the answer is correct.
    if (answer === correct && 
        currentQuestionIndex !== 
        finalQuestionIndex){
        score++;
        alert("Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
// Alert if answer is wrong.
    }else if (answer !== correct && 
        currentQuestionIndex !== 
        finalQuestionIndex){
        alert("Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
    }else{
        showScore();
    }
}

// Start the quiz button!
startQuizBt.addEventListener("click",startQuiz);