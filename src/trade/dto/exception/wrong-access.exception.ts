import { BaseException } from "./base.exception";
import { ExceptionCodeEnum, ExceptionMessageMap } from "./exception.enum";
import { HttpStatus } from "@nestjs/common";


export class WrongAccessException extends BaseException {
  constructor() {
    super(
      ExceptionCodeEnum.WrongAccess,
      ExceptionMessageMap[ExceptionCodeEnum.WrongAccess],
      HttpStatus.BAD_REQUEST,
    );
  }
}