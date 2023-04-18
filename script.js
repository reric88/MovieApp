const apiURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=734204555dc0224f3924f520b13e51a9&page=1';

const imgPath = 'https://image.tmdb.org/t/p/w1280';

const searchAPI = 'https://api.themoviedb.org/3/search/movie?api_key=734204555dc0224f3924f520b13e51a9&query="';

const main = document.querySelector('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Get initial movies
getMovies(apiURL);


async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results)
}

function showMovies(movies){
    main.innerHTML = '';
    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${imgPath + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRating(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>overview</h3>
            ${overview}
        </div>
    `
    main.appendChild(movieEl);
    })
}

function getClassByRating(vote) {
    if (vote >= 7.5){
        return 'green'
    } else if (vote >=5){
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm && searchTerm !== ''){
        getMovies(searchAPI + searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    }
})















