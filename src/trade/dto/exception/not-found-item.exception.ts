import { BaseException } from "./base.exception";
import { HttpStatus } from "@nestjs/common";
import { ExceptionCodeEnum, ExceptionMessageMap } from "./exception.enum";

export class NotFoundItemException extends BaseException {
  constructor() {
    super(
      ExceptionCodeEnum.ItemNotFound,
      ExceptionMessageMap[ExceptionCodeEnum.ItemNotFound],
      HttpStatus.BAD_REQUEST,
    );
  }
}