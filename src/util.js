export function getGenreId(genre) {
  return genre.toLowerCase().replace(' ', '-');
}

export function getMoviesByGenre(movies) {
  return movies.reduce((dict, movie) => {
    movie.genres.forEach(genre => {
      const genreMovies = dict[genre];
      if (genreMovies) {
        genreMovies.push(movie);
      } else {
        dict[genre] = [movie];
      }
    });
    return dict;
  }, {});
}
