/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import PostEntity from './posts/entities/post.entity';
import AuthEntity from './auth/entities/auth.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3000,
      username: 'postgres',
      password: 'sidikidao',
      database: 'typeorm',
      entities: [PostEntity,AuthEntity],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal:true,
      load:[appConfig]
    }),
    PostsModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
