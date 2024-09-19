import { Router } from 'express';
import { HTTPResponse } from '../libs/http';

const router = Router();

router.get('/', (_, res) => {
  return new HTTPResponse(res).withMessage('Hello World!').send();
});

export default router;
