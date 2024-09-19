export class HTTPException extends Error {
  public status: number;
  public message: string;
  public error?: Record<string, unknown>;

  public constructor(status: number, message: string, error?: Record<string, unknown>) {
    super(message);
    this.status = status;
    this.message = message;
    this.error = error;
  }
}
