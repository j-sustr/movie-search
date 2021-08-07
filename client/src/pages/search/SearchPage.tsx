import React, { useEffect, useState } from 'react';
import Select from '../../common/components/Select';
import { useDebounce } from '../../common/useDebounce';
import { useIsMounted } from '../../common/useIsMounted';
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
const yearOptions = createYearOptions();
const defaultYearOption = new Date().getFullYear().toString();

const SearchPage: React.FC = () => {
  const getIsMounted = useIsMounted();
  const movieSearch = useMovieSearch();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');
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
  }, [debouncedTitle, type, year]);

  return (
    <div>
      <h1>Search</h1>
      <div className="search-bar">
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
        <Select options={movieTypeOptions} onValueChange={(v) => setType(v)} />
        <Select
          options={yearOptions}
          onValueChange={(v) => setYear(v)}
          selectedValue={defaultYearOption}
        />
      </div>
      <div className="result">{JSON.stringify(movieSearch)}</div>
    </div>
  );
};

export default SearchPage;
