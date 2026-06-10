import { SupabaseService } from './supabase.service';
import { Injectable } from '@nestjs/common';
import { KeywordData } from '../dto';
@Injectable()
export class KeywordService {
  constructor(private readonly SupabaseService: SupabaseService) {}

  async addKeywordToDatabase(keyword: string): Promise<void> {
    const { error } = await this.SupabaseService.client.rpc(
      'log_keyword_search',
      { search_phrase: keyword },
    );
    if (error) {
      console.error('Failed to log analytics metrics:', error.message);
      throw new Error(`Analytics exception: ${error.message}`);
    }
  }

  async getKeywordData(keyword: string): Promise<KeywordData | null> {
    const { data, error } = await this.SupabaseService.client
      .from('keywords')
      .select(
        'keyword, search_count, last_searched_at, search_logs (searched_at)',
      )
      .eq('keyword', keyword)
      .maybeSingle();
    console.log('getKeywordData raw payload:', data);
    if (error) {
      console.error('getKeywordData error', error.message);
      return null;
    }
    return data;
  }
}
