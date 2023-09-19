import { BaseException } from "./base.exception";
import { ExceptionCodeEnum, ExceptionMessageMap } from "./exception.enum";
import { HttpStatus } from "@nestjs/common";


export class NotEnoughBalanceException extends BaseException {
  constructor() {
    super(
      ExceptionCodeEnum.NotEnoughBalance,
      ExceptionMessageMap[ExceptionCodeEnum.NotEnoughBalance],
      HttpStatus.BAD_REQUEST,
    );
  }
}