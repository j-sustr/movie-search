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

  return (
    <div>
      <h1>Search</h1>
      <div className="search-bar">
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
        <Select
          options={movieTypeOptions}
          onValueChange={(v) => setType(v)}
          selectedValue={defaultMovieType}
        />
        <Select
          options={yearOptions}
          onValueChange={(v) => setYear(v)}
          selectedValue={defaultYear}
        />
      </div>
      <div className="result">{JSON.stringify(movieSearch.value)}</div>
      <img
        src={movieSearch.value?.Poster}
        alt={`Poster for ${movieSearch.value?.Title}`}
      />
    </div>
  );
};

export default SearchPage;
