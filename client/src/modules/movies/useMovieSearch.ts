import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { useAsync } from '../../common/useAsync';
import { Movie } from './api/movie';
import { MovieSpecification } from './api/movie.specification';

const MOVIES_SEARCH_ENDPOINT = '/movies/search';

export const useMovieSearch = () => {
  const movieFetch = useAsync<Movie>((spec: unknown) => {
    return axios
      .get<Movie>(MOVIES_SEARCH_ENDPOINT, {
        params: createParams(spec as MovieSpecification),
      })
      .then((r) => r.data);
  });

  const run = useCallback(
    (spec: MovieSpecification): Promise<void> => {
      return movieFetch.run(spec);
    },
    [movieFetch]
  );

  return useMemo(() => ({ ...movieFetch, run }), [movieFetch, run]);
};

function createParams(spec: MovieSpecification) {
  return {
    t: spec.title,
    type: spec.type,
    y: spec.releaseYear,
    plot: spec.plot,
  };
}
