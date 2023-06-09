import {   ACCESS_KEY, API_URL, showMore, formEl, searchInput, searchResults} from './constants.js';

let inputData = "";
let page = 1;

 async function searchImages() {
    inputData = searchInput.value;
  
    const url = `${API_URL}/search/photos?page=${page}&query=${inputData}&client_id=${ACCESS_KEY }`;
    if (page === 1) {
        searchResults.innerHTML = "";
    }
    const response = await fetch(url);
    const data = await response.json();
    

    const results = data.results;
    console.log(data);

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;  
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++

    if (page > 1) {
        showMore.style.display = 'block'
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
  });
  
    showMore.addEventListener("click", () => {
    searchImages();
  });
  