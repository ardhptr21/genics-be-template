import { handleHTTPResponse } from '@/libs/http';
import { validatePayloadMiddleware } from '@/middlewares/validator-middleware';
import { loginModelValidator, registerModelValidator } from '@/models/http/auth-model';
import { loginService, registerService } from '@/services/auth-service';
import { Router } from 'express';

const router = Router();

router.post('/register', validatePayloadMiddleware(registerModelValidator), async (req, res) => {
  const httpResponse = await registerService(req.body);
  return handleHTTPResponse(res, httpResponse);
});

router.post('/login', validatePayloadMiddleware(loginModelValidator), async (req, res) => {
  const httpResponse = await loginService(req.body);
  return handleHTTPResponse(res, httpResponse);
});

export default router;
