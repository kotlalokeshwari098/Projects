const htmlCode = document.getElementById('htmlCode');
const cssCode = document.getElementById('cssCode');
const jsCode = document.getElementById('jsCode');
const output = document.getElementById('output')
document.querySelector("h1").style.color="red"

console.log(htmlCode);

htmlCode.onkeyup = () => run();
// htmlCode.addEventListener(('keyup'),()=>{})
cssCode.onkeyup = () => run();
jsCode.onkeyup = () => run();

function run() {
   
    output.contentDocument.body.innerHTML = `<style>${cssCode.value}</style>` + htmlCode.value;

    const script = output.contentDocument.createElement('script');
    script.textContent = jsCode.value; // Set the JavaScript code
    output.contentDocument.body.appendChild(script); // Add it to the iframe

    localStorage.setItem("htmlCode",htmlCode.value)
    localStorage.setItem("cssCode",cssCode.value)
    localStorage.setItem("jsCode",script.textContent);


}
htmlCode.value=localStorage.htmlCode|| "";
cssCode.value=localStorage.cssCode|| "";
jsCode.value=localStorage.jsCode|| "";