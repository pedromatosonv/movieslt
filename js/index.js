let popularMovies = [];

(async function bootstrap() {
  try {
    popularMovies = await getPopularMovies()

    setMovieListMovies();
  } catch(err) {
    console.log('Um erro ocorreu ao iniciar a aplicação');
  }
})();

function getPopularMovies() {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/movie/popular?language=pt-BR&sort_by=release_date.desc&api_key=${API_ACCESS_TOKEN}`)
      .then(res => res.json())
      .then(res => {
        const movies = res.results.map(el => {
          return createMovieObject(el);
        })

        resolve(movies)
      })
      .catch(err => {
        reject();
      });
  })
}

function createMovieObject(rawData) {
  const movie = {
    id: rawData.id,
    title: rawData.title,
    overview: rawData.overview,
    genreIds: rawData.genre_ids,
    genreNames: rawData.genre_ids.map(el => movieGenres[el]),
    releaseDate: rawData.release_date,
    posterPath: rawData.poster_path,
    voteAverage: rawData.vote_average
  }

  return movie;
}

function setMovieListMovies() {
  const movieListContainer = document.querySelector('#movieList');

  popularMovies.forEach(movieObject => {

    const movieHtml =
      `<div class="movie">
        <div class="movie_image">
          <img src="${API_IMAGE_URL}/w780/${movieObject.posterPath}" class="fotos-filmes">
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