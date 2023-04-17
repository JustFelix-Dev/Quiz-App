const startBtn = document.querySelector('.start_btn');
const infoBox = document.querySelector('.info_box');
const quitBtn =  infoBox.querySelector('.buttons .quit');
const restartBtn = infoBox.querySelector('.buttons .restart');
const quizBox = document.querySelector('.quiz_box');
const quizText = document.querySelector('.que_text');
const quizOptions = document.querySelector('.option_list');
const NextQ = quizBox.querySelector('.quiz_box .next_btn');
const BottomCounter = quizBox.querySelector('.quiz_box .total_que');
const timerSec = quizBox.querySelector('.timer .time_sec');
const timeLine = quizBox.querySelector('.time_line');
const resultBox = document.querySelector('.result_box');
const resultRbtn = resultBox.querySelector('.restart');
const resultQbtn = resultBox.querySelector('.quit');

startBtn.onclick=()=>{
    infoBox.classList.add('activeInfo');
}
quitBtn.onclick=()=>{
    infoBox.classList.remove('activeInfo');
}
restartBtn.onclick=()=>{
    infoBox.classList.remove('activeInfo');
    quizBox.classList.add('activeQuiz')
    showQuiz(0)
    timeStart(15)
}
resultQbtn.onclick=()=>{
    resultBox.classList.remove('activeResult');
    window.location.reload();
}


let tickIcon = `<div class="icon tick"><i class="fa-solid fa-check"></i></div>`
let crossIcon = `<div class="icon cross"><i class="fa-solid fa-times"></i></div>`
let counter = 0;
let timeCounter;
let queCount = 0;
let timeValue = 15;
let userScore = 0;

NextQ.onclick=()=>{
    if(counter < questions.length-1){
        counter++;
        showQuiz(counter);
        clearInterval(timeCounter)
        timeStart(timeValue)
        NextQ.style.display = "none";
    }else{
        showResult();
    }
}

resultRbtn.onclick=()=>{
    window.print()
}

const showQuiz = (index)=>{
quizText.innerHTML = ` <span> ${questions[index].number}. ${questions[index].question}</span>`
quizOptions.innerHTML = ` <div class="option">${questions[index].options[0]}<span></span></div>
<div class="option">${questions[index].options[1]}<span></span></div>
<div class="option">${questions[index].options[2]}<span></span></div>
<div class="option">${questions[index].options[3]}<span></span></div>`
BottomCounter.innerHTML = `
<span><p class="bold">${questions[index].number}</p><p>of</p><p class="bold">${questions.length}</p>Questions</span>  `

const quizOption = quizOptions.querySelectorAll('.option');
 quizOption.forEach((option)=>{
    option.setAttribute('onclick','optionSelected(this)')
 })
}

function optionSelected(answer){
    clearInterval(timeCounter)
    let userAnswer = answer.textContent;
    let correctAnswer = questions[counter].answer;
    let allOptions = quizOptions.children.length;
    if( userAnswer == correctAnswer ){
        userScore+= 1;
        console.log(userScore)
       answer.classList.add('correct')
        answer.insertAdjacentHTML("beforeend", tickIcon)
    }else{
        answer.classList.add('incorrect')
        answer.insertAdjacentHTML("beforeend", crossIcon)

        for (let i = 0; i < allOptions; i++) {
          if(quizOptions.children[i].textContent == correctAnswer){
            quizOptions.children[i].setAttribute('class','option correct')
            quizOptions.children[i].insertAdjacentHTML("beforeend", tickIcon)
          }         
        }
    }
    NextQ.style.display = "block";

const quizOption = quizOptions.querySelectorAll('.option');
    quizOption.forEach((option)=>{
      option.classList.add('disabled')
    })
}

function timeStart(time){
    timeCounter = setInterval(timer,1000)
    function timer(){
        timerSec.textContent = time;
        time--;
        if(time < 0){
            clearInterval(timeCounter)
            timerSec.textContent = "00";
            let correctAnswer = questions[counter].answer;
            let allOptions = quizOptions.children.length;
            for (let i = 0; i < allOptions; i++) {
                if(quizOptions.children[i].textContent == correctAnswer){
                  quizOptions.children[i].setAttribute('class','option correct')
                  quizOptions.children[i].insertAdjacentHTML("beforeend", tickIcon)
                }         
              }

            const quizOption = quizOptions.querySelectorAll('.option');
              quizOption.forEach((option)=>{
                option.classList.add('disabled')
              })

              NextQ.style.display = "block";

        }
        else if (time <= 9){
            timerSec.textContent = "0" + time;

        }
    }
    }

        function showResult(){
            infoBox.classList.remove('activeInfo');
            quizBox.classList.remove('activeQuiz');
            resultBox.classList.add('activeRes')
            if(userScore == 7){
                const scoreText = resultBox.querySelector('.score_text');
            scoreText.innerHTML = `
            <span> Fantastic✨, you got<p>${userScore}</p>out of<p>${questions.length}</p></span>
            `
            }
            else if(userScore >= 5){
                const scoreText = resultBox.querySelector('.score_text');
            scoreText.innerHTML = `
            <span> Congrats😊, you got<p>${userScore}</p>out of<p>${questions.length}</p></span>
            `
            }
            else if (userScore >= 3){
                const scoreText = resultBox.querySelector('.score_text');
                scoreText.innerHTML = `
                <span> Good One!, you got<p>${userScore}</p>out of<p>${questions.length}</p></span>
                `
            }
            else if (userScore == 0 ){
                const scoreText = resultBox.querySelector('.score_text');
                scoreText.innerHTML = `
                <span> You got<p>${userScore}</p>out of<p>${questions.length}</p>.Learn Coding!</span>
                `
            }
            else if (userScore < 3){
                const scoreText = resultBox.querySelector('.score_text');
                scoreText.innerHTML = `
                <span> You tried!, you got<p>${userScore}</p>out of<p>${questions.length}</p></span>
                `
            }
        }

       