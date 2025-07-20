/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import PostEntity from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PostCreationDTO from './dto/posts-creation.dto';
import PostUpdateDTO from './dto/posts.update.dto';
@Injectable()
export class PostsService {
    constructor(@InjectRepository(PostEntity) private postRepository:Repository<PostEntity>){}
    async findAll():Promise<PostEntity[]>{
        return await this.postRepository.find();
    }
    async findById(id:number):Promise<PostEntity>{
            const post=await this.postRepository.findOne({where:{id}})
            if(!post)
                throw new NotFoundException('No post with this id')
            return post;
    }
    async create(post:PostCreationDTO):Promise<PostEntity[]>{
        await this.postRepository.save(post)
        return await this.findAll()
    }
    async delete(id:number):Promise<PostEntity[]>{
         await this.postRepository.delete(id);
         return this.findAll();
    }
    async update(id:number,post:PostUpdateDTO):Promise<PostEntity[]>{
        const posted={...await this.findById(id)}
        if(post.title)
            posted.title=post.title;
        if(post.content)
            posted.content=post.content;
        if(post.authorName)
            posted.authorName=post.authorName;
        posted.updatedAt=new Date();
        await this.postRepository.save(posted);
        return this.findAll();
    }
}
