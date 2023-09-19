import { Body, Controller, Get, Param, ParseFloatPipe, ParseIntPipe, Post, UseInterceptors } from "@nestjs/common";
import { TradeService } from './trade.service';
import { TransactionInterceptor } from '../database/transaction.interceptor';
import { TransactionManager } from '../database/transaction.decorator';
import { EntityManager } from 'typeorm';
import { BaseResponse } from './dto/response/base.response';
import { UserNotFoundException } from "./dto/exception/not-found-user.exception";

@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  /**
   * 거래소 아이템 등록 - [완료]
   */
  @Post('/sell/item/:itemId/')
  @UseInterceptors(TransactionInterceptor)
  async sellItem(
    @TransactionManager() queryRunnerManager: EntityManager,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body('price', ParseFloatPipe) price: number,
    @Body('sellerId', ParseFloatPipe) sellerId: number,
  ): Promise<BaseResponse> {
    await this.tradeService.sellItem(
      queryRunnerManager,
      sellerId,
      itemId,
      price,
    );
    return BaseResponse.ok();
  }

  /**
   * 거래소 아이템 구입 - [완료]
   */
  @Post('/:tradeId/buy/')
  @UseInterceptors(TransactionInterceptor)
  async buyItem(
    @TransactionManager() queryRunnerManager: EntityManager,
    @Param('tradeId', ParseIntPipe) tradeId: number,
    @Body('buyerId', ParseFloatPipe) buyerId: number,
  ): Promise<BaseResponse> {
    await this.tradeService.buyItem(queryRunnerManager, buyerId, tradeId);
    return BaseResponse.ok();
  }

  /**
   * 거래소 아이템 조회 - [완료]
   */
  @Get('/item/:itemId')
  async getTradingItems(
    @Param('itemId', ParseIntPipe) itemId: number,
  ): Promise<BaseResponse> {
    const sellingItems = await this.tradeService.getTradingItems(itemId);
    return BaseResponse.ok(sellingItems);
  }

}
