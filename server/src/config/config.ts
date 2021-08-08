export const __prod__ = process.env.NODE_ENV === 'production';
export const LOG_DIR = process.env.LOG_DIR as string;
export const PORT = +(process.env.PORT ?? 8080);
export const OMDB_API_KEY = process.env.OMDB_API_KEY as string;
export const USER_CREDENTIALS = process.env.USER_CREDENTIALS as string;
