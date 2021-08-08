import { Router, Request, Response } from 'express';
import logger from '../../common/logger';

const router = Router();

router.get('/authentication', (req: Request, res: Response) => {
  logger.info(`user authenticated`);
  res.status(200);
});

export default router;
