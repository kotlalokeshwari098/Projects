import { reviews } from "./Reviews.js";

const matter=document.querySelector('.matter');
const image=document.querySelector('img');
const name=document.querySelector('.name');
const container=document.querySelector('.container');


console.log(reviews)
let i=0;
setInterval(() => {
    if(i!==3){
        i+=1
        matter.textContent=reviews[i].data;
        name.textContent=reviews[i].name;
        image.src=reviews[i].image;
    }
    else if(i === 3){
        i=0
    }
    // console.log(matter.innerHTML);
}, 3000);