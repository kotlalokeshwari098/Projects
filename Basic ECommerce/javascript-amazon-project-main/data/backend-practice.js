const xhr=new XMLHttpRequest();

xhr.addEventListener('load',()=>{
    console.log(xhr.response);
    // here response is string
})

xhr.open('GET','https://supersimplebackend.dev');
// xhr.open('GET','https://supersimplebackend.dev/hello');
// xhr.open('GET','https://supersimplebackend.dev/products/first');
// xhr.open('GET','https://supersimplebackend.dev/documentation');
// xhr.open('GET','https://supersimplebackend.dev/images/apple.jpg');
xhr.send();
// xhr.response;
// here it will be undefined as it is a async code so use event listener so when i will be loaded the response can be used