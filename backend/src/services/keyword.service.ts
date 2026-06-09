import { SupabaseService } from './supabase.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KeywordService {
  constructor(private readonly SupabaseService: SupabaseService) {}

  async addKeywordToDatabase(keyword: string) {
    const { data, error } = await this.SupabaseService.client
      .from('keywords')
      .upsert({ keyword: keyword })
      .select();
    if (error) console.log(error);
    if (data) return true;
    return false;
  }
}
