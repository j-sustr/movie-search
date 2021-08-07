import axios from 'axios';
import { OMDB_API_KEY } from '../../config/config';
import { Movie } from './models/movie';
import { MovieSpecification } from './models/movie.specification';

const OMDB_API_URL = 'http://www.omdbapi.com/';

export class MoviesService {
  async find(spec: MovieSpecification): Promise<Movie> {
    const response = await axios.get(OMDB_API_URL, {
      params: {
        apikey: OMDB_API_KEY,
        t: spec.title,
        plot: spec.plot,
        y: spec.releaseYear,
      },
    });

    if (response.status !== 200) {
      throw new Error('request failed');
    }

    const movie = response.data as Movie;

    return movie;
  }
}
