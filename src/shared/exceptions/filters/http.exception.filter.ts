import { Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      status,
      message: this.createExceptionMessage(status, exception),
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }

  private createExceptionMessage(status: HttpStatus, exception: HttpException): string {
    const exceptionResponse = exception.getResponse() as string | { message: string | string[] };
    const defaultMessage = typeof exceptionResponse === 'string' ? exceptionResponse : exceptionResponse.message[0];

    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return `This value is not exist.`;
      case HttpStatus.NOT_FOUND:
        return `This value is not found.`;
      default:
        return defaultMessage;
    }
  }
}
