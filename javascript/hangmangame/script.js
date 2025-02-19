import {wordList} from "./hangmanwords.js";

console.log(wordList);

let random=Math.floor(Math.random() *64)
// console.log(random);
let wordDisplay=document.querySelector('.word-display');
let hintDisplay=document.querySelector('.hint-display');
let guess=document.querySelector('.guess');
let resultContainer=document.querySelector('.result-container');
let container=document.querySelector('.container');
let head=document.querySelector('.head');
let headBody=document.querySelector('.head-body');
let headBodyLeft=document.querySelector('.head-body-left');
let headBodyRight=document.querySelector('.head-body-right');
let headBodyBottomLeft=document.querySelector('.head-body-bottom-left');
let headBbodyBottomRight=document.querySelector('.head-body-bottom-right');

let hangman=[];
hangman.push(head,headBody,headBodyLeft,headBodyRight,headBodyBottomLeft,headBbodyBottomRight);
console.log(hangman)
let i=0;



let word=wordList[random].word;
console.log(word.length);
let spaceWord=word.split('');

wordDisplay.innerHTML=spaceWord;
console.log(spaceWord)

let displayArray = Array(word.length).fill("_");
wordDisplay.innerHTML = displayArray.join(" ") ;
// console.log(wordDisplay.innerHTML);


let incorrect=0;
let alpha=document.querySelectorAll('.alpha');
alpha.forEach((item)=>{
   item.addEventListener('click',(e)=>{
    // let chances=0;
    let bit=item.innerHTML.toLowerCase()
    let flag=false;

   
        for(let i=0;i<word.length;i++){
        if(bit ===  spaceWord[i]){
            // console.log(wordArray[i])
            displayArray[i] = bit;
            wordDisplay.innerHTML = displayArray.join(" ");
            flag=true;
        }
       }
       if(!flag){
        incorrect++;
        hangmanFigure();
        guess.innerHTML=incorrect;
       }
       if(incorrect === 6 ){
        // resultContainer.style.display="block";
        resultContainer.classList.add('overlay');
        // resultContainer.style.display="flex";
        resultContainer.innerHTML= 
        `<div class="result-display-container" style="display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center; padding:10px background:white">
        <div>You Lost !!!
        The correct answer is ${word}
        <p><button class="result-button">start again</button><p></div>
        <img src="./images/lost.gif" alt="You Lost" style="width:230px; height:230px;">      
    </div>`;
    // resultContainer.style.display="flex";     
    }
 
        else if(displayArray.every((value, index) => value === spaceWord[index])){
            resultWin();
        }
 
   
    
})
})
// console.log(spaceWord)
function resultWin(){
    resultContainer.classList.add("overlay");
    resultContainer.innerHTML= 
    `<div class="result-display-container" style="display: flex; flex-direction: row; align-items: center; justify-content: center; text-align: center; padding:10px background:white">
    <div>You won !!!
    The answer is ${word}
    <p><button class="result-button">start again</button><p></div>
    <img src="./images/victory.gif" alt="You Lost" style="width:230px; height:230px;">      
</div>`;
}

resultContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("result-button")) {
        window.location.reload();
    }
});


function hangmanFigure(){
      console.log(hangman[i])
      hangman[i].style.display="block";
      i++;
}


hintDisplay.innerHTML=`Hint: ${wordList[random].hint}`;



