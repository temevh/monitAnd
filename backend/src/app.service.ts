import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getKeyword(keyword: string): string {
    return `Keyword ${keyword} processed`;
  }
}
