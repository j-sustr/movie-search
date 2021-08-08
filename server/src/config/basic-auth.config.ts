import { BasicAuthMiddlewareOptions } from 'express-basic-auth';
import { USER_CREDENTIALS } from './config';

const [username, password] = USER_CREDENTIALS.split(':');

export const basicAuthOptions: BasicAuthMiddlewareOptions = {
  users: {
    [username]: password,
  },
};
