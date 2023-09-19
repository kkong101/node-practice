import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          host: configService.get('database.host'),
          username: configService.get('database.user'),
          port: configService.get('database.port'),
          type: 'mysql',
          password: configService.get('database.password'),
          database: configService.get('database.database'),
          entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
          synchronize: configService.get('database.synchronize'),
          logging: configService.get('database.logging'),
        };
      },
    }),
  ],
})
export class DatabaseModule {}
