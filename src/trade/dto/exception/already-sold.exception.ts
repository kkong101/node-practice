import { BaseException } from "./base.exception";
import { ExceptionCodeEnum, ExceptionMessageMap } from "./exception.enum";
import { HttpStatus } from "@nestjs/common";


export class AlreadySoldException extends BaseException {
  constructor() {
    super(
      ExceptionCodeEnum.AlreadySold,
      ExceptionMessageMap[ExceptionCodeEnum.AlreadySold],
      HttpStatus.BAD_REQUEST,
    );
  }
}