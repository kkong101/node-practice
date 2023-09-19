import { ExceptionCodeEnum, ExceptionMessageMap } from "./exception.enum";
import { HttpException } from "@nestjs/common";

export interface IBaseException {
  code: string;
  message: string;
  statusCode: number;
}

export class BaseException extends HttpException implements IBaseException {

  constructor(customCode:string, message: string, statusCode: number) {
    super(message, statusCode);
    this.code = customCode;
    this.statusCode = statusCode;
    this.message = message;
  }

  code: string;
  message: string;
  statusCode: number;

}
