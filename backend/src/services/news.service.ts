import { HttpService } from '@nestjs/axios';
import { Injectable, Request } from '@nestjs/common';
import { error } from 'console';
import { firstValueFrom } from 'rxjs';

//News API documentation https://newsapi.org/docs/get-started#search

@Injectable()
export class NewsService {
  constructor(private readonly httpService: HttpService) {}

  async getNews(keyword: string): Promise<any> {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&from=2026-05-27&sortBy=popularity&apiKey=f033398ae51d4d09a8d1ee9b1222b188`;
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch news:', error.message);
      throw error;
    }
  }
}
