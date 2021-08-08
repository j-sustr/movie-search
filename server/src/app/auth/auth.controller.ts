import 'express-basic-auth';
import { Router, Request, Response } from 'express';
import logger from '../../common/logger';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  logger.info(`user "${(req as any).auth.user}" authenticated`);
  res.sendStatus(200);
});

export default router;
