import app from '@/apps/api';
import { HTTPResponseType } from '@/libs/http';
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

describe('Base HTTP API Endpoint', () => {
  it('GET /', async () => {
    const res = await request(app).get('/');
    const result: HTTPResponseType = res.body;

    expect(result.success).toBe(true);
    expect(result.code).toBe(StatusCodes.OK);
    expect(result.message).toBe('Hello World!');
  });

  it('GET /path-does-not-exists', async () => {
    const res = await request(app).get('/path-does-not-exists');
    const result: HTTPResponseType = res.body;

    expect(result.success).toBe(false);
    expect(result.code).toBe(StatusCodes.NOT_FOUND);
    expect(result.message).toBe('Route not found.');
  });
});
