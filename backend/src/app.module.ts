import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsService } from './services/news.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { RedditService } from './services/reddit.service';
import { SupabaseModule } from './supabase.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, NewsService, RedditService],
})
export class AppModule {}
