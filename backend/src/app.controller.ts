import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { NewsService } from './services/news.service';
import { RedditService } from './services/reddit.service';
import { type postBodyDto } from './dto';
import { News, RedditPost } from './types';
import { KeywordService } from './services/keyword.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly newsService: NewsService,
    private readonly redditService: RedditService,
    private readonly keywordService: KeywordService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('keyword')
  @HttpCode(200)
  async postKeyword(@Body() postBody: postBodyDto) {
    const { keyword, sources } = postBody;
    let redditPosts: RedditPost[] = [];
    let newsData: News[] = [];

    const promises: Promise<any>[] = [];
    promises.push(this.keywordService.addKeywordToDatabase(keyword));

    if (sources.includes('reddit')) {
      promises.push(
        this.redditService
          .getReddit(keyword)
          .then((res) => (redditPosts = res)),
      );
    }

    if (sources.includes('news')) {
      promises.push(
        this.newsService.getNews(keyword).then((res) => (newsData = res)),
      );
    }

    await Promise.all(promises);

    return { message: { newsData, redditPosts } };
  }
}
