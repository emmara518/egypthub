import {
  Controller,
  All,
  Req,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GatewayService } from './gateway.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('API Gateway')
@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @All('auth/:path*')
  @ApiOperation({ summary: 'توجيه طلبات التوثيق' })
  async forwardAuth(@Req() req: Request, @Res() res: Response) {
    return this.forward('auth', req, res);
  }

  @All('listings/:path*')
  @ApiOperation({ summary: 'توجيه طلبات المنشآت والعروض' })
  async forwardListings(@Req() req: Request, @Res() res: Response) {
    return this.forward('listings', req, res);
  }

  @All('bookings/:path*')
  @ApiOperation({ summary: 'توجيه طلبات الحجوزات' })
  async forwardBookings(@Req() req: Request, @Res() res: Response) {
    return this.forward('bookings', req, res);
  }

  @All('ambassador/:path*')
  @ApiOperation({ summary: 'توجيه طلبات السفراء' })
  async forwardAmbassador(@Req() req: Request, @Res() res: Response) {
    return this.forward('ambassador', req, res);
  }

  @All('health')
  @ApiOperation({ summary: 'فحص صحة البوابة' })
  healthCheck() {
    return {
      success: true,
      message: 'EgyptHub API Gateway شغالة تمام',
      timestamp: new Date().toISOString(),
    };
  }

  private async forward(service: string, req: Request, res: Response) {
    try {
      const path = req.originalUrl.replace(`/api/v1/${service}`, '') || '/';
      const data = await this.gatewayService.forwardRequest(
        service,
        path,
        req.method,
        req.body,
        req.headers as Record<string, string>,
      );
      return res.status(HttpStatus.OK).json(data);
    } catch (error: any) {
      const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message = error.message || 'Internal server error';
      return res.status(status).json({
        success: false,
        error: message,
      });
    }
  }
}
