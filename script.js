//create the timer
var timerEl = document.getElementById('countdown');

function countdown() {
    var timeLeft = 60;
  
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 1) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = timeLeft + ' seconds remaining';
        // Decrement `timeLeft` by 1
        timeLeft--;
      } else if (timeLeft === 1) {
        // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = 'Your Time is up!';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
      }
    }, 1000);
  }

  //Functions

  function buildQuiz (){
    //variable to store html output
    const output = [];

    //for each question we have in the quiz
    myQuestions.forEach((currentQuestion, questionNumber) => {

        //variable to store list of potential answers
        const answers= [];

        //and one for each available answer
        for(letter in currentQuestion.answers){

          //creating an html radio button for user to select their answer
          answers.push (
            `<label>
            <input type="radio" name="question${questionNumber}" value="letter">
            ${letter}
            ${currentQuestion.answers[letter]}
            </label>`            
          );
        }

        //add 1st question and its possible answers to the output
        output.push(
          `<div class="slide">
          <div class="question">
          ${currentQuestion.question}</div>
          <div class="answers"> ${answers.join('')}</div>
          </div>`
        );
      }
        );
        
        //combine output list into one string and post it to page
        quizContainer.innerHTML = output.join('');
      
 };

  function showResults(){
        //gather answer containers from the quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        //count number of user answers input
        let numCorrect= 0;

        //for each question
        myQuestions.forEach ( (currentQuestion, questionNumber) => {
          //find which answer was selected by user
          const answerContainer = answerContainers[questionNumber];
          const selector = `input[name=question${questionNumber}]:checked`;
          const userAnswer = (answerContainer.querySelector(selector) || {}).value;

          //for correct answers
          if (userAnswer === currentQuestion.correctAnswer){
            //add to the overall count of correct answers
            numCorrect++;

            //add green to show answer was correct
            answerContainers[questionNumber].style.color = "green";
          }
        });
      

      const resultsContainer =  document.getElementById('results');

      //show number of correct answers total after all questions answered
      resultsContainer.innerHTML= `${numCorrect} out of ${myQuestions.length}`;
}

//new functions here



  //variables created

  const quizContainer = document.getElementById('quiz');
  const submitButton = document.getElementById('submit'); 
  const myQuestions = [
    {
      question: "JavaScript is ____.",
      answers: {
        a: "boring, and a waste of time", 
        b: "fake, like out of a fairy tale",
        c: "fundamental to becoming a web developer",
        d: "an expensive type of European sportscar",
      },
      correctAnswer: "c"
    },
  
    {
    question: "Question 2",
      answers: {
        a: "a", 
        b: "b",
        c: "c",
        d: "d",
      },
      correctAnswer: "a"
    },

    {
      question: "Question 3",
        answers: {
          a: "a", 
          b: "b",
          c: "c",
          d: "d",
        },
        correctAnswer: "b"
      },

      {
      question: "Question 4",
          answers: {
            a: "a", 
            b: "b",
            c: "c",
            d: "d",
          },
        correctAnswer: "a"
        },

        {
          question: "Question 5",
            answers: {
              a: "a", 
              b: "b",
              c: "c",
              d: "d",
            },
            correctAnswer: "d"
          },

          {
            question: "Question 6",
              answers: {
                a: "a", 
                b: "b",
                c: "c",
                d: "d",
              },
              correctAnswer: "c"
            },

            {
              question: "Question 7",
                answers: {
                  a: "a", 
                  b: "b",
                  c: "c",
                  d: "d",
                },
                correctAnswer: "d"
              },

              {
                question: "Question 8",
                  answers: {
                    a: "a", 
                    b: "b",
                    c: "c",
                    d: "d",
                  },
                  correctAnswer: "b"
                },

                {
                  question: "Question 9",
                    answers: {
                      a: "a", 
                      b: "b",
                      c: "c",
                      d: "d",
                    },
                    correctAnswer: "b"
                  },

                  {
                    question: "Question 10",
                      answers: {
                        a: "a", 
                        b: "b",
                        c: "c",
                        d: "d",
                      },
                      correctAnswer: "a"
                    },
  ];

  //display quiz after pressing start button
buildQuiz();

showResults();

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

function showNextSlide() {
    showSlide(currentSlide + 1);
  };
  
function showPreviousSlide() {
    showSlide(currentSlide - 1);
  };
  //Pagination
  //
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(currentSlide);
  
  //show results when you press 'submit'
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
