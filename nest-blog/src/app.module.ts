import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypegooseModule } from "nestjs-typegoose";

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/huangluBlog',{
      useNewUrlParser: true
    })
    ,PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
