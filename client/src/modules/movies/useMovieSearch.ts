import axios from 'axios';
import { useAsync } from '../../common/useAsync';
import { MovieSpecification } from './api/movie.specification';

const MOVIES_SEARCH_ENDPOINT = '/movies/search';

export const useMovieSearch = () => {
  const movieFetch = useAsync((spec) => {
    return axios.get(MOVIES_SEARCH_ENDPOINT, {
      params: createParams(spec as MovieSpecification),
    });
  });

  const run = (spec: MovieSpecification): Promise<void> => {
    return movieFetch.run(spec);
  };

  return { ...movieFetch, run };
};

function createParams(spec: MovieSpecification) {
  return {
    t: spec.title,
    type: spec.type,
    y: spec.releaseYear,
    plot: spec.plot,
  };
}
