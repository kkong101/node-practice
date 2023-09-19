import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { BaseException } from './base.exception';
import { UnCatchedException } from "./un-catched.exception";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const res =
      exception instanceof BaseException ? exception : new UnCatchedException();

    if (exception instanceof UnCatchedException) console.error(exception);
    console.error(exception);

    response.status(res.statusCode).json({
      code: res.code,
      message: res.message,
    });
  }
}