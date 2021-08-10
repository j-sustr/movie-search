import './SearchPage.css';
import React, { useEffect, useState } from 'react';
import Select from '../../common/components/Select';
import { useDebounce } from '../../common/useDebounce';
import {
  isNonWhiteSpace,
  trimToUndefined,
} from '../../common/utils/string-utils';
import { MovieType } from '../../modules/movies/api/movie';
import { useMovieSearch } from '../../modules/movies/useMovieSearch';
import { createYearOptions } from '../../modules/movies/year-options';

const movieTypeOptions = [
  [MovieType.Movie, 'Movie'],
  [MovieType.Series, 'Series'],
  [MovieType.Episode, 'Episode'],
] as const;
const defaultMovieType = MovieType.Movie as string;
const yearOptions = createYearOptions();
const defaultYear = new Date().getFullYear().toString();

const SearchPage: React.FC = () => {
  const movieSearch = useMovieSearch();
  const [title, setTitle] = useState('');
  const [type, setType] = useState(defaultMovieType);
  const [year, setYear] = useState(defaultYear);
  const debouncedTitle = useDebounce(title, 500);

  useEffect(() => {
    if (isNonWhiteSpace(debouncedTitle)) {
      const y = trimToUndefined(year);
      movieSearch.run({
        title: debouncedTitle,
        type: trimToUndefined(type) as MovieType | undefined,
        releaseYear: y === undefined ? y : +y,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTitle, type, year]);

  const movie = movieSearch.value;
  (window as any).movie = movie;

  return (
    <div className="app-page">
      <h1>Search</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Select
          options={movieTypeOptions}
          value={type}
          onValueChange={(v) => setType(v)}
        />
        <Select
          options={yearOptions}
          value={year}
          onValueChange={(v) => setYear(v)}
        />
      </div>
      <div className="movie-container">
        {movieSearch.loading && <div>Loading...</div>}
        {movie?.Response === 'True' && (
          <>
            <div className="description-container">
              <h2>{movie.Title}</h2>
              <p>Type: {movie.Type}</p>
              <p>Released: {movie.Released}</p>
              <p>Genre: {movie.Genre}</p>
              <p>IMDb Rating: {movie.imdbRating}</p>
              <p>Director: {movie.Director}</p>
              <p>Writers: {movie.Writer}</p>
              <p>Actors: {movie.Actors}</p>
              <p>{movie?.Plot}</p>
            </div>
            <div className="poster-container">
              <img src={movie.Poster} alt={`Poster for ${movie.Title}`} />
            </div>
          </>
        )}
        {movie?.Response === 'False' && <div>Movie not found</div>}
      </div>
    </div>
  );
};

export default SearchPage;
