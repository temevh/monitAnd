import { SupabaseService } from './supabase.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KeywordService {
  constructor(private readonly SupabaseService: SupabaseService) {}

  async addKeywordToDatabase(keyword: string): Promise<void> {
    const keywordLowered = keyword.toLowerCase();
    const { error } = await this.SupabaseService.client.rpc(
      'log_keyword_search',
      { search_phrase: keywordLowered },
    );
    if (error) {
      console.error('Failed to log analytics metrics:', error.message);
      throw new Error(`Analytics exception: ${error.message}`);
    }
  }
}
