import { Movie } from './models/movie';
import { RedisClient } from 'redis';
import { MovieSpecification } from './models/movie.specification';
import logger from '../../common/logger';

const KEY_PREFIX = 'movie:';
const EXPIRE_SECONDS = 600;

export interface MoviesCache {
  get(spec: MovieSpecification): Promise<Movie | null>;
  add(spec: MovieSpecification, movies: Movie): Promise<void>;
}

export class RedisMoviesCache implements MoviesCache {
  constructor(private readonly client: RedisClient) {}

  get(spec: MovieSpecification): Promise<Movie | null> {
    const key = createKey(spec);
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          logger.error(err);
          return reject(err);
        }
        if (!value) {
          return resolve(null);
        }
        resolve(JSON.parse(value as string));
      });
    });
  }

  add(spec: MovieSpecification, movies: Movie): Promise<void> {
    const key = createKey(spec);
    const value = JSON.stringify(movies);
    return new Promise((resolve, reject) => {
      this.client.setex(key, EXPIRE_SECONDS, value, (err) => {
        if (err) {
          logger.error(err);
          return reject(err);
        }
        resolve();
      });
    });
  }
}

function createKey(spec: MovieSpecification) {
  return KEY_PREFIX + JSON.stringify(spec);
}
