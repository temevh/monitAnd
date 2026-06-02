import { HttpService } from '@nestjs/axios';
import { Injectable, Request } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { News } from 'src/types';
import { ConfigService } from '@nestjs/config';

//News API documentation https://newsapi.org/docs/get-started#search

@Injectable()
export class NewsService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getNews(keyword: string): Promise<News[]> {
    const apiKey = this.configService.get<string>('NEWS_API_KEY');
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&from=2026-05-27&sortBy=popularity&pageSize=10&apiKey=${apiKey}`;

    try {
      const response = await firstValueFrom(this.httpService.get(url));

      const articles = response.data.articles || [];
      console.log(articles);

      const formattedNews: News[] = articles.map((article: any) => ({
        title: article.title,
        source: article.source?.name || 'Unknown Source',
        url: article.url,
        date: article.publishedAt,
        content: article.content,
        author: article.author,
      }));

      //console.log(formattedNews);
      return formattedNews;
    } catch (error) {
      console.error('Failed to fetch news:', error.message);
      throw error;
    }
  }
}
