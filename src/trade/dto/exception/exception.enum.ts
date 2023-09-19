

export enum ExceptionCodeEnum {
  UnCaught = '9999',
  UserNotFound = '0001',
  ItemNotFound = '0002',
  NotEnoughBalance = '0003',
  AlreadySold = '0004',
  TradeNotFound = '0005',
  WrongAccess = '0006',
  AlreadySellingState = '0007'
}

export const ExceptionMessageMap = {
  [ExceptionCodeEnum.UnCaught]: '예기치 못한 에러 발생.',
  [ExceptionCodeEnum.UserNotFound]: '사용자를 찾을 수 없습니다.',
  [ExceptionCodeEnum.ItemNotFound]: '아이템을 찾을 수 없습니다.',
  [ExceptionCodeEnum.NotEnoughBalance]: '잔액이 충분하지 않습니다.',
  [ExceptionCodeEnum.AlreadySold]: '이미 판매된 아이템 입니다.',
  [ExceptionCodeEnum.TradeNotFound]: '거래를 찾을 수 없습니다.',
  [ExceptionCodeEnum.WrongAccess]: '접근에 대한 권한이 없습니다.',
  [ExceptionCodeEnum.AlreadySellingState]: '이미 판매되고 있습니다.',
};
