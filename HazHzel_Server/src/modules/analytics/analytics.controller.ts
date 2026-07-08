import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) { }

  @Get('dashboard')
  async getDashboardOverview(@Query('days') days?: string) {
    console.log('Received days parameter:', days);
    const timeRange = days ? parseInt(days, 10) : 365;
    return this.analyticsService.getDashboardOverview(timeRange);
  }
}
