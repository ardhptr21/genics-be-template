import { HTTPResponse } from '@/libs/http';
import { baseService } from '@/services/base-service';
import { StatusCodes } from 'http-status-codes';

describe('Base Service', () => {
  it('must return Hello World!', () => {
    const serv = baseService();
    expect(serv).toBeInstanceOf(HTTPResponse);

    const result = serv.parse();

    expect(result.success).toBe(true);
    expect(result.message).toBe('Hello World!');
    expect(result.code).toBe(StatusCodes.OK);
  });
});
