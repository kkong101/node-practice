import { BaseException } from "./base.exception";
import { HttpStatus } from "@nestjs/common";
import { ExceptionCodeEnum, ExceptionMessageMap } from "./exception.enum";

export class UserNotFoundException extends BaseException {
  constructor() {
    super(
      ExceptionCodeEnum.UserNotFound,
      ExceptionMessageMap[ExceptionCodeEnum.UserNotFound],
      HttpStatus.BAD_REQUEST,
    );
  }
}