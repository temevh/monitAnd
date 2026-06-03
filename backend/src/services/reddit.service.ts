import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { RedditPost } from 'src/types';
import { firstValueFrom } from 'rxjs';
import Parser from 'rss-parser';

interface RedditRssItem {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  content: string;
  contentSnippet: string;
  id: string;
  isoDate: string;
}

@Injectable()
export class RedditService {
  // Use Record<string, never> instead of any to satisfy strict ESLint rules for no-unsafe assignments
  private rssParser: Parser<Record<string, never>, RedditRssItem>;

  constructor(private readonly httpService: HttpService) {
    this.rssParser = new Parser<Record<string, never>, RedditRssItem>();
  }

  async getReddit(keyword: string): Promise<RedditPost[]> {
    const url = `https://www.reddit.com/search.rss?q=${encodeURIComponent(keyword)}&sort=hot`;
    try {
      const response = await firstValueFrom(
        this.httpService.get<string>(url, {
          responseType: 'text',
          headers: {
            'User-Agent': 'nestjs:news-feed-app:v1.0.0 (by /u/spez)',
          },
        }),
      );

      const feed = await this.rssParser.parseString(response.data);
      // Explicitly type items array or fallback to empty array safely
      const items: RedditRssItem[] = feed.items || [];
      console.log(items);

      // Changed (post: RedditRssResponse) to (post: RedditRssItem)
      const formattedPosts: RedditPost[] = items
        .slice(0, 10)
        .map((post: RedditRssItem): RedditPost => {
          const sub = post.link ? post.link.split('/')[4] : 'unknown';
          return {
            title: post.title || '',
            link: post.link || '',
            author: post.author || 'anonymous',
            subreddit: `r/${sub}`,
            date: post.isoDate || new Date().toISOString(),
          };
        });

      return formattedPosts;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown network failure';

      console.error('Failed to fetch news:', errorMessage);
      throw error;
    }
  }
}
