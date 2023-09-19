import { BaseException } from "./base.exception";
import { ExceptionCodeEnum, ExceptionMessageMap } from "./exception.enum";
import { HttpStatus } from "@nestjs/common";


export class AlreadySellingStateException extends BaseException {
  constructor() {
    super(
      ExceptionCodeEnum.AlreadySellingState,
      ExceptionMessageMap[ExceptionCodeEnum.AlreadySellingState],
      HttpStatus.BAD_REQUEST,
    );
  }
}