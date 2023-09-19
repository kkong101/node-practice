export class BaseResponse {
  code: string;
  message: string;
  data?: any;

  static ok(data?: any) {
    return {
      code: '0000',
      message: '성공',
      data: data,
    };
  }
}
