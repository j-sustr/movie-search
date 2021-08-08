import axios from 'axios';

export async function authenticate(
  username: string,
  password: string
): Promise<boolean> {
  return axios
    .post(
      '/auth',
      {},
      {
        auth: {
          username,
          password,
        },
        validateStatus: () => true,
      }
    )
    .then((r) => r.status === 200);
}
