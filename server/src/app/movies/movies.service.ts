import axios from 'axios';
import { OMDB_API_KEY } from '../../config/config';
import { Movie } from './models/movie';
import { MovieSpecification } from './models/movie.specification';
import { MoviesCache } from './movies-cache';

const OMDB_API_URL = 'http://www.omdbapi.com/';

export class MoviesService {
  constructor(private readonly cache: MoviesCache) {}

  async find(spec: MovieSpecification): Promise<Movie> {
    let movie = await this.cache.get(spec);
    if (movie) {
      return movie;
    }

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

    movie = response.data as Movie;

    this.cache.add(spec, movie);

    return movie;
  }
}
