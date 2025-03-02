const startBtn = document.getElementById("start-btn");
const nostartBtn = document.getElementById("nostart-btn");
const nextBtn = document.getElementById("next-btn");
const quizButtons = document.getElementById("quiz-buttons")
// CARDS
const quizInfoCard = document.getElementById("quiz-info-card");
const quizCard = document.getElementById("quiz-card");

const resultsCard = document.getElementById("results-card");
const catImg = document.getElementById("cat-img");
const catName = document.getElementById("cat-name");
const catDesc = document.getElementById("cat-description");
// OPTIONS
const options = document.getElementsByClassName("option");

const optionOne = document.querySelector(".options div:nth-child(1)");
const optionTwo = document.querySelector(".options div:nth-child(2)");
const optionThree = document.querySelector(".options div:nth-child(3)");

const questionHeader = document.getElementById("question-header");

// MAIN INITIAL START BUTTON
const start = () => {
  quizInfoCard.classList.add("active");
};
// NON NO START
const noStart = () => {
  quizInfoCard.classList.remove("active");
};

let questions = [
  {
    number: 1,
    question: "What's your ideal weekend activity?",
    options: [
      { text: "A. Staying home and watching a movie", type: "calm" },
      {
        text: "B. Going out to eat, exploring or going for a walk",
        type: "energetic",
      },
      {
        text: "C. Spending time with friends and family",
        type: "affectionate",
      },
    ],
  },
  {
    number: 2,
    question: "How do you prefer to spend your weekday evenings?",
    options: [
      {
        text: "A. Relaxing with a good meal and some quiet time",
        type: "calm",
      },
      {
        text: "B. Going to the gym or doing something active",
        type: "energetic",
      },
      { text: "C. Meeting new people", type: "affectionate" },
    ],
  },
  {
    number: 3,
    question: "How do you handle new situations or challenges?",
    options: [
      {
        text: "A. I take a step back and assess things carefully",
        type: "calm",
      },
      { text: "B. I jump right in and tackle it head-on", type: "energetic" },
      {
        text: "C. I seek advice from friends and make a collaborative decision",
        type: "affectionate",
      },
    ],
  },
  {
    number: 4,
    question: "Where do you like to go?",
    options: [
      { text: "A. In my bed", type: "calm" },
      { text: "B. Travelling the world", type: "energetic" },
      {
        text: "C. Anywhere as long as I'm with my friends",
        type: "affectionate",
      },
    ],
  },
  {
    number: 5,
    question: "What cat sounds the best to you?",
    options: [
      { text: "A. Just a chill dude", type: "calm" },
      { text: "B. Crazy", type: "energetic" },
      { text: "C. Always purring on you", type: "affectionate" },
    ],
  },
];

let score = {
  calm: 0,
  energetic: 0,
  affectionate: 0,
};

let match = [
  {
    breed: "Birman",
    description: "BMN Desc..",
    why: "you were matched with BMN because..",
    type: "calm",
    id: "birm",
  },
  {
    breed: "Bengal",
    description: "BNGL Desc..",
    why: "you were matched with BNGL because..",
    type: "energetic",
    id: "beng",
  },
  {
    breed: "British Shorthair",
    description: "BR SH Desc..",
    why: "you were matched with BR SH because..",
    type: "affectionate",
    id: "bsho",
  },
];

let result = 0;

let question = 0;

// LET THE QUIZ BEGIN HEHE
const enterQuiz = () => {
  quizCard.classList.add("active");
  console.log(question);
  // SHOWS FIRST QUESTIONS IN OPTION
  questionHeader.innerHTML = `${questions[question].question}`;
  optionOne.innerHTML = `${questions[question].options[0].text}`;
  optionTwo.innerHTML = `${questions[question].options[1].text}`;
  optionThree.innerHTML = `${questions[question].options[2].text}`;
};

enterQuiz()

// VISUAL FEEDBACK FOR SELECTION ON OPTION

optionOne.addEventListener("click", () => {
  optionOne.classList.add("selected");
  optionTwo.classList.remove("selected");
  optionThree.classList.remove("selected");
});
optionTwo.addEventListener("click", () => {
  optionTwo.classList.add("selected");
  optionOne.classList.remove("selected");
  optionThree.classList.remove("selected");
});
optionThree.addEventListener("click", () => {
  optionThree.classList.add("selected");
  optionTwo.classList.remove("selected");
  optionOne.classList.remove("selected");
});

const saveScore = () => {
  // WILL SAVE SCORE
  if (optionOne.classList.contains("selected")) {
    score.calm++;
    console.log(score);
  } else if (optionTwo.classList.contains("selected")) {
    score.energetic++;
    console.log(score);
  } else if (optionThree.classList.contains("selected")) {
    score.affectionate++;
    console.log(score);
  }
};

// ALLOWS NEXT BUTTON IF OPTION IS SELECTED

nextBtn.disabled = true;

optionOne.addEventListener("click", () => {
  nextBtn.classList.remove("disabled");
  nextBtn.disabled = false;
});
optionTwo.addEventListener("click", () => {
  nextBtn.classList.remove("disabled");
  nextBtn.disabled = false;
});
optionThree.addEventListener("click", () => {
  nextBtn.classList.remove("disabled");
  nextBtn.disabled = false;
});

// NEXT QUESTION

const questionNo = document.getElementById("question-no");

const nextQuestion = () => {
  saveScore();
  adjustProgressBar();
  if (question < 4) {
    question++;
    questionNo.innerText = question + 1;
    optionOne.classList.remove("selected");
    optionTwo.classList.remove("selected");
    optionThree.classList.remove("selected");
    nextBtn.disabled = true;
    nextBtn.classList.add("disabled");
    questionHeader.innerHTML = `${questions[question].question}`;
    optionOne.innerHTML = `${questions[question].options[0].text}`;
    optionTwo.innerHTML = `${questions[question].options[1].text}`;
    optionThree.innerHTML = `${questions[question].options[2].text}`;
  } else {
    adjustProgressBar();
    // ALLOWS 7 MILLISECONDS TO PASS SO THE PROGRESS BAR CAN PROGRESS
    setTimeout(() => {
      quizButtons.style.display = ("none");
      resultsCard.classList.add("active");
      document.body.style.overflow = ("auto");
    }, 700)
    
    // RESULTS
     confetti({
      colors: [" #fff75e", "#ffe94e", "#ffda3d", "#fdc43f", "#fdb833"  ]
     });
    if (score.calm > score.energetic && score.calm > score.affectionate) {
      result = 0;
      catName.innerText = `${match[0].breed}`;
      catDesc.innerText = `${match[0].description}`;
    } else if (
      score.energetic > score.calm &&
      score.energetic > score.affectionate
    ) {
      result = 1;
      catName.innerText = `${match[1].breed}`;
      catDesc.innerText = `${match[1].description}`;
    } else if (
      score.affectionate > score.calm &&
      score.affectionate > score.energetic
    ) {
      result = 2;
      catName.innerText = `${match[2].breed}`;
      catDesc.innerText = `${match[2].description}`;
    } else if (
      score.calm === score.energetic ||
      score.calm === score.affectionate
    ) {
      result = 0;
      catName.innerText = `${match[0].breed}`;
      catDesc.innerText = `${match[0].description}`;
    } else if (
      score.energetic === score.calm ||
      score.energetic === score.affectionate
    ) {
      result = 1;
      catName.innerText = `${match[1].breed}`;
      catDesc.innerText = `${match[1].description}`;
    } else if (
      score.affectionate === score.calm ||
      score.affectionate === score.energetic
    ) {
      result = 2;
      catName.innerText = `${match[2].breed}`;
      catDesc.innerText = `${match[2].description}`;
    }
    // RESULTS CARD, FETCHING DATA WITH API
    fetch(
      `https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${match[result].id}&api_key=live_zD282jAU3lwE2CldZLy6MHNh7jUMZlPEviuaPz5P2Ul8SXqIETQM1ZBzFXh1Umwo`
    )
      .then((response) => response.json())
      .then((arr) => {
        console.log(arr[0]);
        return arr;
      })// DISPLAYING DATA
      .then((arr) => {
        catDesc.innerHTML = arr[0].breeds[0].description;
        return arr;
      })
      .then((arr) => (catImg.src = `${arr[0].url}`));

    
  }
};

// RESTART QUIZ

const restart = () => {
    location.reload();
}


// QUIZ PROGRESS BAR

const progressBar = document.getElementById("progress-bar");


const adjustProgressBar = () => {
  let questionPercentage = (question + 1) / 5 * 100 + "%";
  progressBar.style.maxWidth = `${questionPercentage}`;
  console.log(question);
  console.log(questionPercentage);
}