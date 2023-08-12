const apiKeyField = document.getElementById('txt_API_KEY');
const searchField = document.getElementById('txt_search');
let apiurl = `https://www.omdbapi.com/?s=${searchField.value}&apikey=${apiKeyField.value}`;

const divcontainer = document.getElementById('cards-container');
const loader = document.getElementById('loader-container');

const Data = [];

function fnSearch() {
    const apikey = apiKeyField.value;
    const moviename = searchField.value;
    if (!apikey) {
        alert("Please enter api key");
        return;
    }
    if (!moviename) {
        alert("Please enter moviename");
        return;
    }

    loader.style.display = "block";

    apiurl = `https://www.omdbapi.com/?s=${moviename}&apikey=${apikey}`;

    fetch(apiurl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            fndisplayData(data);
            loader.style.display = 'none';
        })
        .catch(error => {
            alert('Error while fetching data:', error);
            divcontainer.innerHTML = "";
            loader.style.display = 'none';
        });
};

function fndisplayData(data) {
    let generatedhtml = '';
    let count = 1;
    data.forEach(item => {
        generatedhtml += `<div class="card">
        <img src="${item.Poster}" alt="movie-1">
        <span id="movie-title">${item.Title}</span>
        <span id="movie-sequence">${count}</span>
        </div>`;
        count++;
    });
    divcontainer.innerHTML = generatedhtml;
}