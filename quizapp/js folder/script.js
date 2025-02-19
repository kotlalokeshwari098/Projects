import { questions } from "./questions.js";

let configContainer=document.querySelector('.config-container');
let categorys = document.querySelectorAll('.category-option');
let questionOption = document.querySelectorAll('.question-option');
let startQuiz = document.querySelector('.start-quiz-btn')
let questionNumbers;
let questionType;


// quiz-application
let quizContainer=document.querySelector('.quiz-container');
let questionText = document.querySelector('.question-text');
let answerOption = document.querySelectorAll('.answer-option')
let nextQuestionBtn = document.querySelector('.next-question-btn');
let currentQuestion=document.querySelector('.current-question');
let totalSelectedQuestions=document.querySelector('.total-selected-questions');
let timeDuration=document.querySelector('.time-duration');

// result-container
let resultContainer=document.querySelector('.result-container')
let correctAnswered=document.querySelector('.correct-answered');
let tryAgainBtn=document.querySelector('.try-again-btn');
let correctAnsweredOfTotal=document.querySelector('.correct-answered-ofTotal')



categorys.forEach((item) => {
    item.addEventListener('click', () => {
        questionType = item.innerHTML;
        console.log(questionType)
        item.classList.add('active');
    })
    
})
questionOption.forEach((quantity) => {
    quantity.addEventListener('click', () => {
        questionNumbers = quantity.innerHTML;
        totalSelectedQuestions.innerHTML=Number(questionNumbers);
        quantity.classList.add('active')
    })
})

// category(questionType,questionNumbers)

let questionsArray = [];
startQuiz.addEventListener('click', () => {
    questionsArray = [];
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].category.toLowerCase() === questionType.toLowerCase()) {
            for (let j = 0; j < Number(questionNumbers); j++) {
                let obj = {
                    question: questions[i].questions[j].question,
                    options: questions[i].questions[j].options,
                    answer:questions[i].questions[j].correctAnswer
                }
                questionsArray.push(obj);

            }
            break;
        }
    }
    console.log(questionsArray);
    let b = 0;
    questionText.innerHTML = questionsArray[0].question
    answerOption.forEach((item) => {
        item.innerHTML = questionsArray[0].options[b]
        b++;
    })
    timer();
    
    configContainer.style.display="none";
    quizContainer.style.display="block";

  

})
let index = 1;
let a=0;
let isAnswered=false;
nextQuestionBtn.addEventListener('click', () => {
    a++;
    timer();
    questionText.innerHTML = questionsArray[index].question
    let option = 0;
    answerOption.forEach((item) => {
        item.innerHTML = questionsArray[index].options[option]
        option++;
    })
    index++;
    currentQuestion.innerHTML=index;

    answerOption.forEach((item)=>{
            item.classList.remove('correct');
            item.classList.remove('wrong');
    })
    answerOption.forEach((option) => {
        option.style.pointerEvents = 'auto'; // Disable clicking
      });
    isAnswered=false;

    if(currentQuestion.innerHTML>=totalSelectedQuestions.innerHTML){
        setTimeout(() => {
            quizContainer.style.display="none";
                resultContainer.style.display="block";
                correctAnswered.innerHTML=correct;
                correctAnsweredOfTotal.innerHTML= totalSelectedQuestions.innerHTML;
            
        }, 3000);
    }

})

// setting timer
let timers;
function timer(){ 
    if(timers){
        clearInterval(timers);
    }
    let time=15;
        timers=setInterval(() => {
            if(time>=0){
                timeDuration.innerHTML=`${time}s`;
                time--;
            }
            else {
                clearInterval(timers); 
            }
            
        }, 1000);  
   
}

let correct=0;
let wrong=0;
// showing correct or wrong selected option

answerOption.forEach((item)=>{ 
      item.addEventListener('click',()=>{
        clearInterval(timers)

        if(!isAnswered){
            answerOption.forEach((option) => {
                option.style.pointerEvents = 'none'; // Disable clicking
              });
            let questionopt=questionsArray[a].options;
            let yourself=questionopt[questionsArray[a].answer]
            let answer=item.innerHTML 
            if(yourself===answer){
                correct++;
                console.log("you won")
                let span= document.createElement('span');
                span.classList.add('material-symbols-rounded');
                span.innerHTML='check_circle';
                item.appendChild(span);
                item.classList.add('correct')
               
            }
            else{
                wrong++;
                console.log("you lost");
                let span= document.createElement('span');
                span.classList.add('material-symbols-rounded');
                span.innerHTML='cancel';
                item.appendChild(span);
                item.classList.add('wrong');
                // to show correct one
                let div= document.createElement('span');
                div.classList.add('material-symbols-rounded');
                div.innerHTML='check_circle';
                answerOption[questionsArray[a].answer].appendChild(div);
                answerOption[questionsArray[a].answer].classList.add('correct')

            }
            isAnswered = true;
        }
        
    })
})


tryAgainBtn.addEventListener('click',()=>{
    location.reload();
})

window.addEventListener('load', () => {
    configContainer.style.display = 'block';  // Show config container after page reload
});







