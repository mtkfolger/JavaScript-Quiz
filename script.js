var quizQuestions = [
  {
   title: "1Commonly used data types DO NOT include:",
   choices: ["strings", "booleans", "alerts", "numbers"],
   answer: "alerts"
  },
  {
   title: "2The condition in an if / else statement is enclosed within ____.",
   choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
   answer: "parentheses"
  },
  {
    title: "3Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
   },
   {
    title: "4Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
   },
   {
    title: "5Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
   },
   {
    title: "6Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
   },
   {
    title: "7Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
   },
   {
    title: "8Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
   },
   {
    title: "9Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
   },
   {
    title: "10Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
   }
 ]

 // Global variables to match HTML elements
 var questionsElement = document.getElementById("questions");
 var timerElement = document.getElementById("time");
 var choicesElement= document.getElementById("choices");
 var submitBtn = document.getElementById("submit");
 var startBtnElement = document.getElementById("start");
 var initialsElement = document.getElementById("initials");
 var startScreenEl = document.getElementById("start-screen");
 var questionTitleElement = document.getElementById("question-title");
 var endScreen = document.querySelector("#end-screen");
 var displayTime = 60;
 var timeInterval;
 var questionsIndex = 0;


 // Defined time interval to keep quiz state
function timer(){
  displayTime--;
  timerElement.textContent = displayTime;
 if (displayTime === 0){
    console.log("Quiz is now over!")

    //fire the endQuiz function here
  }
}


//Start quiz function that starts the timer, hides the start screen
// & unhides the questions. 
function quizStart(){
  timeInterval = setInterval(timer, 1000)
  timerElement.textContent= displayTime;
  startScreenEl.setAttribute("class","hide");
  questionsElement.removeAttribute("class");
  //cycle questions with the display questions function
  cycleQuestions();
}

//Function to cycle through the questions, starting by grabbing first question in order
function cycleQuestions(){
  var questions = quizQuestions[
    questionsIndex
  ]
  questionTitleElement.textContent= questions.title;

  questions.choices.forEach(choice => {
    var answerBtn = document.createElement("button")

    answerBtn.setAttribute("value", choice)
    answerBtn.setAttribute("class", "choice")
    answerBtn.setAttribute("id","answerChoice")
    answerBtn.textContent = choice;
    
    // call the function to check whether the answer was right or wrong

    choicesElement.appendChild(answerBtn);
  })
}


//Function to check if the answer is right or wrong and notify when wrong

//Cycle a new question if still haven't answered all questions, or else end
// the quiz if everything has been answered. 

// End quiz function, clear the time interval to stop the timer. 

//Hide questions page, unhide end quiz page. 

//End quiz page to take user input to gather users initials and score for leaderboard

//click event on start button to begin quiz/timer
startBtnElement.onclick = quizStart;