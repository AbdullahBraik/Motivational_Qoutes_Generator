const questions = [
    {
      question: "Who said: 'The only way to do great work is to love what you do'?",
      answers: [
        { text: "Steve Jobs", correct: true },
        { text: "Elon Musk", correct: false },
        { text: "Bill Gates", correct: false },
        { text: "Oprah Winfrey", correct: false },
      ],
    },
    {
      question: "Finish the quote: 'Success is not final, failure is not fatal...'",
      answers: [
        { text: "It is the courage to continue that counts.", correct: true },
        { text: "You must avoid both.", correct: false },
        { text: "It's just part of life.", correct: false },
        { text: "Always try your best.", correct: false },
      ],
    },
    {
      question: "Who said: 'Believe you can and you're halfway there'?",
      answers: [
        { text: "Nelson Mandela", correct: false },
        { text: "Theodore Roosevelt", correct: true },
        { text: "Barack Obama", correct: false },
        { text: "Winston Churchill", correct: false },
      ],
    }
  ];
  
  const questionContainer = document.getElementById("question-container");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  
  let currentQuestionIndex = 0;
  
  function startGame() {
    currentQuestionIndex = 0;
    nextButton.innerText = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerText = currentQuestion.question;
  
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtons.appendChild(button);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
  
    Array.from(answerButtons.children).forEach((button) => {
      setStatusClass(button, button.dataset.correct === "true");
    });
  
    nextButton.style.display = "inline-block";
  }
  
  function setStatusClass(element, correct) {
    element.style.backgroundColor = correct ? "#4CAF50" : "#f44336";
  }
  
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  });
  
  function showScore() {
    resetState();
    questionContainer.innerText = "🎉 You've completed the quiz!";
    nextButton.innerText = "Play Again";
    nextButton.style.display = "inline-block";
    nextButton.addEventListener("click", startGame);
  }
  
  startGame();
  