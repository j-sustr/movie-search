import { Router, Request, Response } from 'express';

const router = Router();

router.get('/movies/search', (req: Request, res: Response) => {
  res.json({
    message: 'hello',
  });
});

export default router;
