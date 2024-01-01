import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VideosModule } from './videos/videos.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    VideosModule,
    CategoriesModule,
    UsersModule,
  ],
})
export class AppModule {}
