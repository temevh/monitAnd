import { HttpService } from '@nestjs/axios';
import { Injectable, Request } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { News } from 'src/types';
import { ConfigService } from '@nestjs/config';

//News API documentation https://newsapi.org/docs/get-started#search

interface NewsApiArticle {
  title: string;
  source?: {
    id: string | null;
    name: string;
  };
  url: string;
  publishedAt: string;
  content: string;
  author: string | null;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
}

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
      const response = await firstValueFrom(
        this.httpService.get<NewsApiResponse>(url),
      );

      const articles = response.data.articles || [];

      const formattedNews: News[] = articles.map((article: NewsApiArticle) => ({
        title: article.title,
        source: article.source?.name || 'Unknown Source',
        url: article.url,
        date: article.publishedAt,
        content: article.content,
        author: article.author || 'Anonymous',
      }));

      return formattedNews;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown network failure';

      console.error('Failed to fetch news:', errorMessage);
      throw error;
    }
  }
}
