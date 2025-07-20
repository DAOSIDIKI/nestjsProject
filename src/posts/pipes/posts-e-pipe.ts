/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { PostsService } from "../posts.service";

@Injectable()
export default class PostExistPipe implements PipeTransform{
    constructor(private postsService:PostsService){}
    async transform(value: any, metadata: ArgumentMetadata) {
        try{
            const post=await this.postsService.findById(value);
        }catch(err){
            throw new NotFoundException(err)
        }
        return value;
    }
    
}