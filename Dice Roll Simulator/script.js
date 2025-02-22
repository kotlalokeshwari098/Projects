let dice=[
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Dice-1-b.svg/900px-Dice-1-b.svg.png?20231029222439",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Dice-2-b.svg/900px-Dice-2-b.svg.png?20231029222526",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Dice-3-b.svg/900px-Dice-3-b.svg.png?20231029222626",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Dice-4-b.svg/900px-Dice-4-b.svg.png?20231029222734",
    "https://cdn.pixabay.com/photo/2014/04/03/11/56/dice-312622_1280.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Dice-6-b.svg/900px-Dice-6-b.svg.png?20231029222821"
]

const resultOfDice=document.querySelector('.result-of-dice');
const button=document.querySelector('button');
let i=0;

function rollDice(diceNumber){
    if(resultOfDice.children.length>4){
        resultOfDice.removeChild(resultOfDice.children[0]);
    }
    let div=document.createElement('div');
    div.classList.add('dice');
    let p=document.createElement('p');
    p.innerText=`Roll ${i++}:`;
    let img=document.createElement('img');
    img.src=diceNumber;
    div.appendChild(p);
    div.appendChild(img);
    resultOfDice.appendChild(div);

}

button.addEventListener('click',()=>{
    let random=Math.floor(Math.random()*6);
    let diceNumber=dice[random];
    rollDice(diceNumber);
    
})





