import { BaseException } from "./base.exception";
import { ExceptionCodeEnum, ExceptionMessageMap } from "./exception.enum";
import { HttpStatus } from "@nestjs/common";


export class NotFoundTradeException extends BaseException {
  constructor() {
    super(
      ExceptionCodeEnum.TradeNotFound,
      ExceptionMessageMap[ExceptionCodeEnum.TradeNotFound],
      HttpStatus.BAD_REQUEST,
    );
  }
}