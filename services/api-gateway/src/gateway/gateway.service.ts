import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  private services: Record<string, string> = {};

  constructor(private readonly httpService: HttpService) {
    this.services.auth = process.env.AUTH_SERVICE_URL || 'http://localhost:4001';
    this.services.listings = process.env.LISTINGS_SERVICE_URL || 'http://localhost:4002';
    this.services.bookings = process.env.BOOKINGS_SERVICE_URL || 'http://localhost:4003';
    this.services.ambassador = process.env.AMBASSADOR_SERVICE_URL || 'http://localhost:4004';
  }

  async forwardRequest(
    service: string,
    path: string,
    method: string,
    body?: any,
    headers?: Record<string, string>,
  ): Promise<any> {
    const baseUrl = this.services[service];
    if (!baseUrl) {
      throw new HttpException(`Service '${service}' not found`, HttpStatus.NOT_FOUND);
    }

    const url = `${baseUrl}${path}`;

    try {
      const config: any = {
        method: method.toLowerCase(),
        url,
        headers: {
          'Content-Type': 'application/json',
          ...(headers?.authorization ? { Authorization: headers.authorization } : {}),
        },
        data: body,
      };

      const response = await firstValueFrom(this.httpService.request(config));
      return response.data;
    } catch (error: any) {
      const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const message = error.response?.data?.message || error.message || 'Service unavailable';
      throw new HttpException(message, status);
    }
  }
}
