import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { NewsService } from './services/news.service';
import { RedditService } from './services/reddit.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly newsService: NewsService,
    private readonly redditService: RedditService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('keyword')
  @HttpCode(200)
  async postKeyword(@Body('keyword') keyword: string) {
    const newsData = await this.newsService.getNews(keyword);
    const redditPosts = await this.redditService.getReddit(keyword);
    return { message: { newsData: newsData, redditPosts: redditPosts } };
  }
}
