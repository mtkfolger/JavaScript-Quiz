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
    title: "Quesiotn 3",
    choices: ["ans1", "ans2", "ans3", "ans4"],
    answer: "ans1"
  },
  {
    title: "Question 4",
    choices: ["This one", "that one", "halloween", "Egg"],
    answer: "Egg"
  },
  {
    title: "Question 5",
    choices: ["string", "ooleans", "aerts", "umbers"],
    answer: "ooleans"
  },
  {
    title: "Question 6",
    choices: ["trings", "boleans", "alrts", "nmbers"],
    answer: "alrts"
  },
  {
    title: "Question 7",
    choices: ["strin", "bleans", "alets", "numbrs"],
    answer: "bleans"
  },
  {
    title: "Question 8",
    choices: ["str", "boos", "ales", "numbs"],
    answer: "numbs"
  },
  {
    title: "Question 9",
    choices: ["srins", "bolen", "alet", "numes"],
    answer: "numes"
  },
  {
    title: "Question 10",
    choices: ["stringgggg", "bbbbbooleans", "aalerts", "nnumbers"],
    answer: "aalerts"
  }
];

// Global variables to match HTML elements
var displayTime = 60;
var timeInterval;
var questionsIndex = 0;
var highscoreElement = document.getElementById("highscores");
var questionsElement = document.getElementById("questions");
var timerElement = document.getElementById("time");
var choicesElement = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtnElement = document.getElementById("start");
var restartBtnElement = document.getElementById("restart");
var initialsElement = document.getElementById("initials");
var startScreenEl = document.getElementById("start-screen");
var questionTitleElement = document.getElementById("question-title");
var endScreen = document.querySelector("#end-screen");


// Defined time interval to keep quiz state
function timer() {
  displayTime--;
  timerElement.textContent = displayTime++;
  if (displayTime === 0 || displayTime < 0) {
    timerElement.textContent = displayTime;
    console.log("Quiz is now over!")
    quizEnd();
    //fire the endQuiz function here
  }
}


//Start quiz function that starts the timer, hides the start screen
// & unhides the questions. 
function quizStart() {
  startScreenEl.setAttribute("class", "hide");
  questionsElement.removeAttribute("class");
  timeInterval = setInterval(timer, 1000)
  timerElement.textContent = displayTime;
  //cycle questions with the display questions function
  cycleQuestions();
}

//Function to cycle through the questions, starting by grabbing first question in order
function cycleQuestions() {
  var questions = quizQuestions[questionsIndex];
  
  questionTitleElement.textContent = questions.title;
  choicesElement.innerHTML=null;

  questions.choices.forEach((choice,i) => {
    var answerBtn = document.createElement("button");
    answerBtn.setAttribute("value", choice);
    answerBtn.setAttribute("class", "choice");
    answerBtn.textContent = choice;

    // call the function to check whether the answer was right or wrong
    answerBtn.onclick=validateAnswer;
    choicesElement.appendChild(answerBtn);
  })
}

//Function to check if the answer is right or wrong and notify when wrong
function validateAnswer() {
  if (this.value !== quizQuestions[questionsIndex].answer) {
    console.log("Wrong")
    displayTime = displayTime-15;
    
    if (displayTime< 0) {
      displayTime = 0;
    }
    timerElement.textContent=displayTime;
  } else {
  
    console.log("True")
  };
//Cycle a new question if still haven't answered all questions, or else end
// the quiz if everything has been answered. 
  questionsIndex++;
  if (questionsIndex === quizQuestions.length) {
    console.log("Quiz over");
    //quiz end function
    quizEnd();
    //clearInterval(timeInterval)
  } else {
    cycleQuestions();
  };
}
// End quiz function, clear the time interval to stop the timer.
function quizEnd(){
  clearInterval(timeInterval);
  console.log("This quiz is over!");
//Hide questions page, unhide end quiz page. 
  questionsElement.setAttribute("class", "hide");
  endScreen.removeAttribute("class");
  // show user's final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = displayTime;
};

//click event on start button to begin quiz/timer
startBtnElement.onclick = quizStart;

//End quiz page to take user input to gather users initials and score for leaderboard
function saveHighscore() {
  endScreen.setAttribute("class", "hide");
  highscoreElement.removeAttribute("class");
  
  // get value of input box
  var initials = initialsElement.value.trim();
 
  // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: timeDisplay,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
}


// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtnElement.onclick = startQuiz;

function printHighscores() {
  // either get scores from localstorage or set to empty array
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // sort highscores by score property in descending order
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function(score) {
    // create li tag for each high score
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    // display on page
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

// run function when page loads
printHighscores();
