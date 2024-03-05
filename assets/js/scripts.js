
/*
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
*/

//Get the elements
var formEl = document.getElementById("form");
var timerEl = document.querySelector(".timer_count");
var questions = document.querySelectorAll(".question");
var answerValue = document.querySelector("#answer_value");
var scoreEl = document.querySelector(".score_count");
var finalPage = document.querySelector(".final_page");
var questionsEl = document.querySelector(".questions_container");
var initalsInput = document.querySelector(".initials");
var scoresEl = document.querySelector(".show_scores");
var displayScoresEl = document.querySelector(".display_score");
var highScoresEl = document.querySelector("#high_scores");

//get the button elements
var nextQuestionButton = document.querySelector("#next_question");
var startButton = document.querySelector("#start_quiz");
var answerRadioBtn = document.querySelectorAll(".question_radio");
var submitButton = document.querySelector("#submit");


//Set the variables
var initials = localStorage.getItem("initials");
var score = 0;
let currentQuestionIndex = 0;
var timer = "";
var studentGrades = JSON.parse(localStorage.getItem('studentGrades')) || [];
var saved_scores = JSON.parse(localStorage.getItem("studentGrades"));

if(saved_scores){
    var scores_output = "";
    Object.entries(saved_scores).forEach(([key, value]) => {
        scores_output += "<p>User: " + value.initials + " Score: " + value.score + "</p>";
    });
    if(highScoresEl){
        highScoresEl.innerHTML = scores_output;
    }
}

//Click Events
if(startButton){
    startButton.addEventListener("click", startQuiz);
}


//Call the checkAnswer function when ever the radio button is clicked
if(answerRadioBtn){
    for(i=0; i<answerRadioBtn.length; i++){
        answerRadioBtn[i].addEventListener("click", processQuestion);
    }
}

//Start quiz
function startQuiz(){
    //Set the timer count
    timerCount = 30;
    
    //Call the start timer function
    startTimer();

    //Show the first question
    showQuestion();
}

function startTimer(){
    timerEl.textContent = "Time Left: " + timerCount;
    timer = setInterval(function (){
        timerCount--;
        timerEl.textContent = "Time Left: " + timerCount;
        if(timerCount === 0){
            clearInterval(timer);
            timerEl.textContent = "Time Left: " + timerCount + ". Time is up!!";

            // loop through the array
            // using forEach
            answerRadioBtn.forEach(function (button) {
                button.disabled = true;
            });
        }
    }, 1000);
}

function showQuestion(){
    answerValue.textContent = "";

    if(currentQuestionIndex < questions.length){
        var hideQuestion = questions[currentQuestionIndex -1];
        var questionToShow = questions[currentQuestionIndex];

        //If the user goes to the next question, hide the previous question and show the next question
        if(currentQuestionIndex > 0){
            hideQuestion.classList.add("hide");
        }
        if(questions[currentQuestionIndex] != questions.length){
            questionToShow.classList.remove("hide");
        }
        //Hide the start button when the question is displayed
        hideStartButton();
    }
    //If the user is on the last question, hide the next button and show the submit button
    if(currentQuestionIndex == questions.length){
        console.log("Show final page.");
        showFinalPage();
    }
    currentQuestionIndex++;
}

/**
 * Functions to hide and show the appropriate buttons
 */

function hideStartButton(){
    startButton.classList.add("hide");
}

function processQuestion(){
    //Check the answer
    console.log(this);
    checkAnswer(this);

    //Show the next question
    showNextQuestion();
}

function checkAnswer(question){
    console.log(question);
    //get the dataset attached to the radio buttons. This tells us whether the answer is correct or not    
    var isCorrectAnswer = question.dataset.correct;

    //If the answer is correct/incorrect, update the score and dispaly that on the screen
    if(isCorrectAnswer === "yes"){
        updateScore(isCorrectAnswer);
        answerValue.textContent = "Correct!";
    }else{
        updateScore(isCorrectAnswer);
        answerValue.textContent = "InCorrect Answer!";
        timerCount -= 5;
    }
}

function showNextQuestion(){
    //Show the next question
    setTimeout(() => {
        console.log("Delayed for 1 seconds.");
        showQuestion();
      }, 1000);
}

function showFinalPage(){
    stopTimer();
    questionsEl.classList.add("hide");
    finalPage.classList.remove("hide");

    submitButton.addEventListener("click", submitScores);
}
function submitScores(event){
    console.log("Submit Scores");
    var user_initials = initalsInput.value;
    console.log("User Initials: " + user_initials);
    // Prevent default action
    event.preventDefault();
    //console.log(event);
    var studentGrade = {
        initials: user_initials,
        score: score,
    };
    studentGrades.push(studentGrade);

    console.log(JSON.stringify(studentGrades))
    
    localStorage.setItem("studentGrades", JSON.stringify(studentGrades));
    finalPage.classList.add("hide");
    submitButton.classList.add("hide");
    scoresEl.classList.remove("hide");
    displayScoresEl.textContent = "User: " + initials + " " + "Score: " + score;
}

//Function to update the scores
function updateScore(isCorrectAnswer){
    if(isCorrectAnswer == "yes"){
        score += 1;
    }else{
        score -= 1;
    }
    scoreEl.innerHTML = score;
}

function submitAnswer(){
    stopTimer();
    initials = prompt("Please enter your initials.");
    var studentGrade = {
        initials: initials,
        score: score,
    };
}

function stopTimer(){
    timerCount = 0;
    clearInterval(timer);
    timerEl.textContent = "Time Left: " + timerCount + ". You finished the quiz.";
}