

const accessKey = 'p3bi1xOGBQTnjvMe725vU2pbW4fkyAAy39i_vDxKt-c';
const searchForm = document.querySelector('form');
const imagesContainer = document.querySelector('.images-container');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.loadMoreBtn');
let page = 1;

// function to fetch images using unsplash API
const fetchImages = async (query, pageNo) => {
   try {


      if (pageNo === 1) {
         imagesContainer.innerHTML = '';
      }


      const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;

      const response = await fetch(url);
      const data = await response.json();

      // if that item has no images then showing red alert

      if (data.results.length > 0) {
         data.results.forEach((photo) => {
            const imageElement = document.createElement('div');
            imageElement.classList.add('imageDiv');
            imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;


            const overlayElement = document.createElement('div');
            overlayElement.classList.add('overlay');


            // creating overlay text
            const overlayText = document.createElement('div');
            overlayText.classList.add('overlayText');
            overlayText.textContent = `${photo.alt_description}`;

            // creating overlay
            // overlayElement.appendChild(overlayText);
            imageElement.appendChild(overlayElement);
            imageElement.appendChild(overlayText);


            imagesContainer.appendChild(imageElement);
         })


         // to show load more button

         if (data.total_pages === pageNo) {
            loadMoreBtn.style.display = 'none';
         }
         else {
            loadMoreBtn.style.display = 'block';
         }

      }
      else {
         imagesContainer.innerHTML = `<h2>Images not found</h2>`
         if(loadMoreBtn.style.display==='block'){
            loadMoreBtn.style.display==='none';
         }
      }

      console.log(data);
   }

   catch (error) {
         console.log(error);
         imagesContainer.innerHTML=`<h2>Failed to fetch images, please try again.</h2>`
   }
}
// adding event listener to search form
searchForm.addEventListener('submit', (e) => {
   e.preventDefault();
   const inputText = searchInput.value.trim();
   if (inputText !== '') {
      page = 1;
      fetchImages(inputText, page);
   }
   else {
      imagesContainer.innerHTML = `<h2>Please enter a search query.</h2>`;
   }
});

// adding event listener to load more button to fetch more images
loadMoreBtn.addEventListener('click', () => {
   fetchImages(searchInput.value.trim(), ++page);
})
