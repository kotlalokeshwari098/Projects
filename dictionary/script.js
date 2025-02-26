const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWordInfo(form.elements[0].value);

})
function playAudio(audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play();
}
// if this is not here the page reload nhi hote when i click on search
// form.elements[0].value -->first child of form accessing

const getWordInfo = async (word) => {
    try {
        resultDiv.innerHTML="Fetching data......";
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        let definitions = data[0].meanings[0].definitions[0]
        let audios = data[0].phonetics[0].audio;
        console.log(audios);



        resultDiv.innerHTML =
            `<div>
        <button 
            onclick="playAudio('${audios}')" 
            style="background:none; border:none; cursor:pointer;">
            <img src="https://img.icons8.com/ios-filled/50/000000/speaker.png" alt="Play Audio" style="width:20px; height:20px;">
        </button>
    </div>

     <p><strong>Word:</strong>${data[0].word}</p>

     <p class="partOfSpeech"><strong></strong>${data[0].meanings[0].partOfSpeech}</p>

     <p><strong>Meaning:</strong>${definitions.definition === undefined ? "Not found" : definitions.definition}</p>

     <p><strong>Example:</strong>${definitions.example === undefined ? "Not found" : definitions.example}</p>

     <p><strong>Antonyms:</strong></p>`;

        //  fetching antonyms
        if (definitions.antonyms.length === 0) {
            resultDiv.innerHTML += `<span>Not Found</span>`
        }
        else {
            for (let i = 0; i < definitions.antonyms.length; i++) {
                resultDiv.innerHTML += `<div><li>${definitions.antonyms[i]}</li></div>`;
            }
        }


        resultDiv.innerHTML +=`<p><strong>Synonyms:</strong></p>`
        if (definitions.synonyms.length === 0) {
            resultDiv.innerHTML += `<span>Not Found</span>`
        }
        else {
            for (let i = 0; i < definitions.synonyms.length; i++) {
                resultDiv.innerHTML += `<div><li>${definitions.synonyms[i]}</li></div>`;
            }
        }


        //  adding read more button
        resultDiv.innerHTML += `<div><a href=${data[0].sourceUrls} target="_blank" class
        "readmore">Read More</a></div>`
        console.log(data);

    }
    catch (error) {
           resultDiv.innerHTML += `<p>Sorry, word could not be found~~~~~</p>`
    }
    // for audio to play



}