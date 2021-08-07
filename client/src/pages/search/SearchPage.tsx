import React from 'react';
import { useIsMounted } from '../../common/useIsMounted';
import { useMovieSearch } from '../../modules/movies/useMovieSearch';

const SearchPage: React.FC = () => {
  const getIsMounted = useIsMounted();
  const movieSearch = useMovieSearch();

  const handleSearchChange = (e: any) => {
    movieSearch.run({
      title: e.target.value,
    });
  };

  return (
    <div>
      <h1>Search</h1>
      <div className="search-bar">
        <input type="text" onChange={handleSearchChange} />
      </div>
      <div className="result">{JSON.stringify(movieSearch)}</div>
    </div>
  );
};

export default SearchPage;
