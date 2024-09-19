import { Response } from 'express';

export class HTTPResponse<T> {
  private r: Response;
  private success: boolean = true;
  private status: number = 200;
  private message?: string;
  private data?: T;
  private error?: Record<string, unknown>;
  private meta?: Record<string, unknown>;

  public constructor(r: Response) {
    this.r = r;
  }

  public withStatus(status: number) {
    if (status >= 400) this.success = false;
    this.status = status;
    return this;
  }

  public withMessage(message: string) {
    this.message = message;
    return this;
  }

  withData(data: T) {
    this.data = data;
    return this;
  }

  withMeta(meta: Record<string, unknown>) {
    this.meta = meta;
    return this;
  }

  withError(error?: Record<string, unknown>) {
    this.success = false;
    this.error = error;
    return this;
  }

  public send() {
    return this.r.status(this.status).json({
      success: this.success,
      code: this.status,
      message: this.message,
      meta: this.meta,
      data: this.data,
      error: this.error
    });
  }
}
