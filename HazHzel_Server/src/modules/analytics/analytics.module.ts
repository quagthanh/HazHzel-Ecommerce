import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { OrderModule } from '../order/order.module';
import { UsersModule } from '../users/users.module';
import { VariantModule } from '../variant/variant.module';

@Module({
  imports: [OrderModule, UsersModule, VariantModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
