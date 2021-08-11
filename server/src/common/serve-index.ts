import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { PUBLIC_DIR } from '../config/config';

export default () => (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.resolve(path.join(PUBLIC_DIR, 'index.html')));
};
