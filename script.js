var startButtonEl = document.getElementById("startButton")
var questionBoxEl = document.getElementById("questionBox")
var answerButtonEl = document.getElementById("choices")
var questionElement = document.getElementById('question')
var nextButton = document.getElementById('nextButton')
var timer = document.getElementById('timer')
var output = document.getElementById("correctOrWrong")
let submit = document.getElementById("input-hidden")
let submitBtn = document.getElementById("button-hidden")
var currentQuestionIndex = 0
var secondsLeft = 60
var score = 0;

startButtonEl.addEventListener("click", startQuiz) 

var questions = [
  {
      title: "Commonly Used data types DO NOT include:",
      choices: ["strings", "alerts", "booleans", "numbers"],
      answer: "alerts"
  },
  {
      title: "The condition in an if / else statment is enclosed within _____.",
      choices: ["parentheses", "quotes", "curly brackets", "square brackets"],
      answer: "parentheses"
  },
  {
      title: "What javascipt method can we use to select an html element?",
      choices: ["document.queryselector()", "document.getElementChild", "document.getElementById", "Both 1 and 3"],
      answer: "Both 1 and 3"
  },
  {
      title: "What html tag is NOT included in the HEAD tag?",
      choices: ["link", "meta", "title", "header"],
      answer: "header"
  },
  {
      title: "What attribute is used in html to decorate content?",
      choices: ["css", "class", "src", "style"],
      answer: "style"
  }
]

// starting the quiz and Populating the question box

function startQuiz() {
startButtonEl.classList.add('hidden');
questionBoxEl.classList.remove('hidden');
nextButton.classList.remove('hidden');
timer.classList.remove('hidden')
startTimer()
setNextQuestion(currentQuestionIndex)
}


let timeInterval 

// Timer in navbar


  function startTimer () {
var timeInterval = setInterval(function() {
    secondsLeft--
  timer.textContent = secondsLeft


if(secondsLeft === 0) {
    clearInterval(timeInterval);
    timer.textContent = "Time's up!"
    finishQuiz()
  }
  
}
, 1000)
}



submit.style.display = "none"
submitBtn.style.display = "none"

function setNextQuestion(currentQuestionIndex) {
  console.log(currentQuestionIndex)
  questionElement.innerHTML = "";
  answerButtonEl.innerHTML = "";
  let choices = document.getElementById('choices')
  let userQ = questions[currentQuestionIndex].title;
  questionElement.innerHTML = userQ
  let userA = questions[currentQuestionIndex].choices;
  userA.forEach(function(i) {
    let listItem = document.createElement("li")
    listItem.innerHTML = i;
    answerButtonEl.appendChild(listItem)
    listItem.addEventListener("click", function(event) {
      output.innerHTML = ""
      listItem.style.background = "red"
      let choosen = event.target
      if(choosen.textContent === questions[currentQuestionIndex].answer) {
          output.innerHTML = "Correct!"
          score = score + 20
          questionBoxEl.append(output)
      } else {
        output.innerHTML = "Wrong!"
        questionBoxEl.append(output)
        secondsLeft = secondsLeft - 5
      }
      answerButtonEl.classList.add('hidden')
    })
 });
 
}

nextButton.addEventListener("click", nextQuestion)

function nextQuestion() {
  currentQuestionIndex++
  if(currentQuestionIndex >= questions.length) {
    finishQuiz()
  } else {
    output.innerHTML =""
    setNextQuestion(currentQuestionIndex) 
  }
  answerButtonEl.classList.remove('hidden')
 
}

function finishQuiz() {
  // Display edits
  
  timer.remove()
  timer.innerHTML="quiz over"
  output.innerHTML =""
  questionElement.innerHTML = ""
  questionElement.innerHTML = "Quiz over!"
  answerButtonEl.innerHTML = "";
  answerButtonEl.innerHTML = "You Got a Score of: " + score;
  nextButton.style.display = "none"
  output.style.dislpay = "none";
  submit.style.display = "block"
  submitBtn.style.display = "block"
  
  // functionality for scoreboard


  
  
  // submitBtn.addEventListener("click", function() {

    
  //   const userInput = {
  //     initials: submit.value,
  //     score: score
  //   }

  //   if (userInput) {
  //     let storedValues = JSON.parse(localStorage.getItem('scores')) || [];
  //     storedValues.push(userInput);
  //     $('#scores').append('<h2>ScoreBoard</h2>')
  //     for ( let i = 1; i<storedValues.length; i++) {
  //         console.log(storedValues[i])
  //         $("#scores").append(`<p>${storedValues[i].initials} ${storedValues[i].score}</p>`)
  //     }
     
    
  // };}) }
  
  
  
  submitBtn.addEventListener("click", function() {
    const userInput = {
      initials: submit.value,
      score: score
    };
  
    if (userInput) {
      let storedValues = JSON.parse(localStorage.getItem('scores')) || [];
      storedValues.push(userInput);
      localStorage.setItem('scores', JSON.stringify(storedValues));
      $('#scores').append('<h2>ScoreBoard</h2>')
      for ( let i = 1; i<storedValues.length; i++) {
          console.log(storedValues[i])
          $("#scores").append(`<p>${storedValues[i].initials} ${storedValues[i].score}</p>`)
  }
  }
})}
