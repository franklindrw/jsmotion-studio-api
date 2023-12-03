import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VideosModule } from './videos/videos.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    VideosModule,
    CategoriesModule,
  ],
})
export class AppModule {}
