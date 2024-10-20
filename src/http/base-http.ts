import { handleHTTPResponse, HTTPResponse } from '@/libs/http';
import { mustAuthMiddleware } from '@/middlewares/auth-middleware';
import { baseService } from '@/services/base-service';
import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
  const httpResponse = baseService();
  return handleHTTPResponse(res, httpResponse);
});

router.get('/sample-auth', mustAuthMiddleware, (req, res) => {
  const httpResponse = new HTTPResponse().withStatus(200).withData({ user: req.user });
  return handleHTTPResponse(res, httpResponse);
});

export default router;
