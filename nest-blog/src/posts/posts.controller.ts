import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { Post as postSchema } from './post.model';
import{ IsNotEmpty} from 'class-validator'
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';


class CreatePostDTO {
    @ApiProperty({description:'tiezibiaoti', example: '我是帖子名称'})
    @IsNotEmpty({message: '标题不能为空'})
    title: string
    @ApiProperty({description:'tiezicontent', example: '我是帖子内容'})
    content: string
}

@Controller('posts')
@ApiTags('帖子')
export class PostsController {
    constructor(
        @InjectModel(postSchema) private readonly postModel:ModelType<postSchema>
    ){}
    @Get()
    @ApiOperation({ summary: '获取帖子'})
    async index() {
        return await this.postModel.find()
    }
    @Get(':id')
    @ApiOperation({ summary: '获取帖子详情'})
    async detail(@Param('id') id: string) {
        return await this.postModel.findById(id)
    }
    @Post()
    @ApiOperation({ summary: '创建帖子'})
    async create(@Body() createPostDTO: CreatePostDTO ) {
        await this.postModel.create(createPostDTO)
        return {
            status: '200k',
            message: '创建成功'
        }
    }
    @Put('id')
    @ApiOperation({ summary: 'xiugai帖子'})
    async update(@Param('id') id: string, @Body() updatePostDTO:CreatePostDTO) {
        await this.postModel.findByIdAndUpdate(id,updatePostDTO)
        return {
            success: 'true',
            id:id
        }
    }
    @Delete(':id')
    @ApiOperation({ summary: 'delete帖子'})
    async delete(@Param('id') id: string) {
        await this.postModel.findByIdAndDelete(id)
        return {
            status: '200k',
            message: '铲除成功'
        }
    }


}
