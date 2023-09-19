import { BaseException } from "./base.exception";
import { HttpStatus } from "@nestjs/common";
import { ExceptionCodeEnum, ExceptionMessageMap } from "./exception.enum";

export class UnCatchedException extends BaseException {
  constructor() {
    super(
      ExceptionCodeEnum.UnCaught,
      ExceptionMessageMap[ExceptionCodeEnum.UnCaught],
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}