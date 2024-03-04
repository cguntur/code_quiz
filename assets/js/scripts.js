
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

//get the button elements
var nextQuestionButton = document.querySelector("#next_question");
var startButton = document.querySelector("#start_quiz");
var answerRadioBtn = document.querySelectorAll(".question_radio");
var submitButton = document.querySelector("#submit");


//Set the variables
var initials = localStorage.getItem("initials");
var score = 0;
let currentQuestionIndex = 0;

//Click Events
startButton.addEventListener("click", startQuiz);
nextQuestionButton.addEventListener("click", showQuestion);
submitButton.addEventListener("click", submitAnswer);
//answerRadioBtn.forEach(function(radioButton) {
//    var isCorrectAnswer = radioButton.dataset.correct;
//    //console.log("Is Correct Answer: " + isCorrectAnswer);
//});

//Call the checkAnswer function when ever the radio button is clicked
for(i=0; i<answerRadioBtn.length; i++){
    answerRadioBtn[i].addEventListener("click", checkAnswer);
}
//console.log(answerRadioBtn);

//Start quiz
function startQuiz(){
    //Set the timer count
    timerCount = 50;
    
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
        }
    }, 1000);
}

function showQuestion(){
    answerValue.textContent = "";
    var hideQuestion = questions[currentQuestionIndex -1];
    var questionToShow = questions[currentQuestionIndex];

    //If the user goes to the next question, hide the previous question and show the next question
    if(currentQuestionIndex > 0){
        hideQuestion.classList.add("hide");
    }
    questionToShow.classList.remove("hide");

    //Hide the start button when the question is displayed
    hideStartButton();

    //Show the next button when the question is displayed
    showNextButton();

    //If the user is on the last question, hide the next button and show the submit button
    if(currentQuestionIndex == questions.length -1){
        hideNextButton();
        showSubmitButton();
    }
    currentQuestionIndex++;
}    

/**
 * Functions to hide and show the appropriate buttons
 */

function hideStartButton(){
    startButton.classList.add("hide");
}

function showNextButton(){
    nextQuestionButton.classList.remove('hide');
}

function showSubmitButton(){
    submitButton.classList.remove("hide");
}

function hideNextButton(){
    nextQuestionButton.classList.add('hide');
}


function checkAnswer(){
    //get the dataset attached to the radio buttons. This tells us whether the answer is correct or not    
    var isCorrectAnswer = this.dataset.correct;

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
    initials = prompt("Please enter your initials.");
    localStorage.setItem("initials", initials);
    localStorage.setItem("score", score);
}