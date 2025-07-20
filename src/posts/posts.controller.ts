/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, ParseIntPipe,Post, Delete, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import PostEntity from './entities/post.entity';
import PostExistPipe from './pipes/posts-e-pipe';
import PostCreationDTO from './dto/posts-creation.dto';
import PostUpdateDTO from './dto/posts.update.dto';

@Controller('posts')
export class PostsController {
    constructor(private postsService:PostsService){}
    @Get()
    async findAll():Promise<PostEntity[]>{
        return await this.postsService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe,PostExistPipe) id:number):Promise<PostEntity>{
        return await this.postsService.findById(id);
    }
    @Post()
    async create(@Body() post:PostCreationDTO):Promise<PostEntity[]>{
        return await this.postsService.create(post);
    }
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe,PostExistPipe) id:number):Promise<PostEntity[]>{
        return await this.postsService.delete(id);
    }
    @Put(':id')
    async update(@Body() post:PostUpdateDTO,@Param('id', ParseIntPipe,PostExistPipe) id:number):Promise<PostEntity[]>{
        return await this.postsService.update(id,post);
    }

}
