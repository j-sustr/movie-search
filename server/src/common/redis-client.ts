import redis from 'redis';
import { REDIS_URL } from '../config/config';

const redisClient = redis.createClient(REDIS_URL);

export default redisClient;
