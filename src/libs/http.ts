import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export interface HTTPResponseType {
  success: boolean;
  code: number;
  message?: string;
  data?: unknown;
  error?: Record<string, unknown>;
  meta?: Record<string, unknown>;
}

export class HTTPResponse<T> {
  private success: boolean = true;
  private status: number = StatusCodes.OK;
  private message?: string;
  private data?: T;
  private error?: Record<string, unknown>;
  private meta?: Record<string, unknown>;

  public withStatus(status: number) {
    if (status >= 400) this.success = false;
    this.status = status;
    return this;
  }

  public withMessage(message: string) {
    this.message = message;
    return this;
  }

  public withData(data: T) {
    this.data = data;
    return this;
  }

  public withMeta(meta: Record<string, unknown>) {
    this.meta = meta;
    return this;
  }

  public withError(error?: Record<string, unknown>) {
    this.success = false;
    this.error = error;
    return this;
  }

  public parse(): HTTPResponseType {
    return {
      success: this.success,
      code: this.status,
      message: this.message,
      meta: this.meta,
      data: this.data,
      error: this.error
    };
  }
}

export const handleHTTPResponse = (res: Response, httpResponse: HTTPResponse<any>) => {
  const payload = httpResponse.parse();
  res.status(payload.code).json(payload);
};
