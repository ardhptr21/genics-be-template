import { handleHTTPResponse } from '@/libs/http';
import { baseService } from '@/services/base-service';
import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
  const httpResponse = baseService();
  return handleHTTPResponse(res, httpResponse);
});

export default router;
