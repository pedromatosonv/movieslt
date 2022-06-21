(async function bootstrap() {
  try {
    movieDetails = await getMovieDetails()
    setMovie(movieDetails);
  } catch(err) {
    console.log(err);
    console.log('Um erro ocorreu ao iniciar a aplicação');
  }
})();

function getMovieDetails() {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/movie/${urlParams.movieId}?language=pt-BR&api_key=${API_ACCESS_TOKEN}`)
      .then(res => res.json())
      .then(res => {
        const movie = createMovieObject(res);
        resolve(movie)
      })
      .catch(err => {
        console.log(err)
        reject();
      });
  })
}

function createMovieObject(rawData) {
  const movie = {
    id: rawData.id,
    title: rawData.title,
    overview: rawData.overview,
    genreIds: rawData.genres.map(el => el.id),
    genreNames: rawData.genres.map(el => el.name),
    releaseDate: rawData.release_date,
    posterPath: rawData.poster_path,
    voteAverage: rawData.vote_average
  }

  return movie;
}

function setMovie(movieObject) {
  const movieContainer = document.querySelector('#movieContainer');

  const movieHtml =
    `<div class="movie">
      <div class="movie_image">
        <img src="${API_IMAGE_URL}/w780/${movieObject.posterPath}" class="fotos-filmes">
      </div>
      <div class="movie_desc">
        <h4 class="movie_title">${movieObject.title}</h4>
        <p>${movieObject.overview}</p>
        <p>Gênero: ${movieObject.genreNames.join(', ')}</p>
        <p>Avaliação: ${movieObject.voteAverage}</p>
        <p>Lançamento: ${movieObject.releaseDate}</p>
      </div>
    </div>`;

  movieContainer.innerHTML += movieHtml;
}