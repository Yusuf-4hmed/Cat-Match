let questions = [
    {
        numb: 1,
        question: "What's your ideal weekend activity?",
        answers: [
            "A. Relaxing at home with a good book or movie",
            "B. Exploring the outdoors, hiking, or going for a walk",
            "C. Socializing with friends at a café or event"
        ],
        options: [
            { text: "A. Relaxing at home with a good book or movie", type: 'calm' },
            { text: "B. Exploring the outdoors, hiking, or going for a walk", type: 'energetic' },
            { text: "C. Socializing with friends at a café or event", type: 'affectionate' }
        ]
    },
    {
        numb: 2,
        question: "How do you prefer to spend your weekday evenings?",
        answers: [
            "A. Relaxing with a good meal and some quiet time",
            "B. Going to the gym or doing something active",
            "C. Spending time with family or loved ones"
        ],
        options: [
            { text: "A. Relaxing with a good meal and some quiet time", type: 'calm' },
            { text: "B. Going to the gym or doing something active", type: 'energetic' },
            { text: "C. Spending time with family or loved ones", type: 'affectionate' }
        ]
    },
    {
        numb: 3,
        question: "How do you handle new situations or challenges?",
        answers: [
            "A. I take a step back and assess things carefully",
            "B. I jump right in and tackle it head-on",
            "C. I seek advice from friends and make a collaborative decision"
        ],
        options: [
            { text: "A. I take a step back and assess things carefully", type: 'calm' },
            { text: "B. I jump right in and tackle it head-on", type: 'energetic' },
            { text: "C. I seek advice from friends and make a collaborative decision", type: 'affectionate' }
        ]
    },
    {
        numb: 4,
        question: "Which type of environment makes you feel most comfortable?",
        answers: [
            "A. A peaceful and quiet space",
            "B. A dynamic and changing environment",
            "C. A warm and friendly atmosphere"
        ],
        options: [
            { text: "A. A peaceful and quiet space", type: 'calm' },
            { text: "B. A dynamic and changing environment", type: 'energetic' },
            { text: "C. A warm and friendly atmosphere", type: 'affectionate' }
        ]
    },
    {
        numb: 5,
        question: "Which of these best describes your work style?",
        answers: [
            "A. Methodical and organized",
            "B. Fast-paced and goal-oriented",
            "C. Collaborative and team-focused"
        ],
        options: [
            { text: "A. Methodical and organized", type: 'calm' },
            { text: "B. Fast-paced and goal-oriented", type: 'energetic' },
            { text: "C. Collaborative and team-focused", type: 'affectionate' }
        ]
    }
    
];

let score = {
    calm: 0,
    energetic: 0,
    affectionate: 0,
    independent: 0
};

let questionCount = 0;
let questionNumb = 1;

document.querySelector('.start-button').onclick = () => {
    document.querySelector('.popup-info').classList.add('active');
    document.querySelector('.main').classList.add('active');
};

document.querySelector('.exit-btn').onclick = () => {
    document.querySelector('.popup-info').classList.remove('active');
    document.querySelector('.main').classList.remove('active');
};

document.querySelector('.continue-btn').onclick = () => {
    document.querySelector('.quiz-section').classList.add('active');
    document.querySelector('.popup-info').classList.remove('active');
    document.querySelector('.main').classList.remove('active');
    document.querySelector('.quiz-box').classList.add('active');

    showQuestions(0);
    questionCounter(1);
};

document.querySelector('.next-btn').onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        questionNumb++;
        questionCounter(questionNumb);
    } else {
        showResult();
    }
};

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = '';
    questions[index].options.forEach(option => {
        optionTag += `<div class="option" onclick="optionSelected(this, '${option.type}')">
                        <span>${option.text}</span>
                      </div>`;
    });

    document.querySelector('.option-list').innerHTML = optionTag;
}

function optionSelected(answerElement, type) {
    score[type] += 1;

    // Visual feedback for selection
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    answerElement.classList.add('selected');
}

function questionCounter(index) {
    document.querySelector('.question-total').textContent = `${index} of ${questions.length} Questions`;
}

function showResult() {
    // Determine the highest score
    let highestScore = Math.max(score.calm, score.energetic, score.affectionate, score.independent);
    let resultType = '';

    for (let key in score) {
        if (score[key] === highestScore) {
            resultType = key;
            break;
        }
    }

    // Display the corresponding cat breed based on the highest score
    let resultMessage = '';
    switch (resultType) {
        case 'calm':
            resultMessage = "Your perfect cat breed is: British Shorthair!";
            break;
        case 'energetic':
            resultMessage = "Your perfect cat breed is: Bengal!";
            break;
        case 'affectionate':
            resultMessage = "Your perfect cat breed is: Ragdoll!";
            break;
        case 'independent':
            resultMessage = "Your perfect cat breed is: Russian Blue!";
            break;
        default:
            resultMessage = "It's hard to pick a breed, but all cats are wonderful!";
    }

    alert(resultMessage);  // You can replace this with a nicer UI element

}
