let popularMovies = [];
const urlParams = Object.fromEntries((new URLSearchParams(window.location.search)).entries());

function getSearchedMovies() {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/search/movie?language=pt-BR&query=${urlParams.searchText}&api_key=${API_ACCESS_TOKEN}`)
      .then(res => res.json())
      .then(res => {
        const movies = res.results.map(el => {
          return {
            id: el.id,
            title: el.title,
            overview: el.overview,
            genreIds: el.genre_ids,
            genreNames: el.genre_ids.map(el => movieGenres[el]),
            releaseDate: el.release_date,
            posterPath: el.poster_path,
            voteAverage: el.vote_average
          }
        })

        resolve(movies)
      })
      .catch(err => {
        reject();
      });
  })
}

function setMovieListMovies() {
  const movieListContainer = document.querySelector('#movieList');

  popularMovies.forEach(movieObject => {

    const movieHtml =
      `<div class="movie">
        <div class="movie_image">
          <img src="${API_IMAGE_URL}/w780/${movieObject.posterPath}" onerror="this.src='https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'" class="fotos-filmes">
        </div>
        <div class="movie_desc">
          <h4 class="movie_title"><a href="/detalhes.html?movieId=${movieObject.id}" target="_blank">${movieObject.title}</a></h4>
          <p>Gênero: ${movieObject.genreNames.join(', ')}</p>
          <p>Avaliação: ${movieObject.voteAverage}</p>
          <p>Lançamento: ${movieObject.releaseDate}</p>
        </div>
      </div>`;

      movieListContainer.innerHTML += movieHtml;
  });
}

async function start() {
  try {
    popularMovies = await getSearchedMovies()

    setMovieListMovies();
  } catch {
    console.log('Um erro ocorreu ao iniciar a aplicação');
  }
};

start();