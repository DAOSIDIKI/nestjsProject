/* eslint-disable prettier/prettier */
import { IsDate, IsOptional, IsString } from "class-validator";

export default class PostUpdateDTO{
    @IsString()
    @IsOptional()
    title?:string;

    @IsString()
    @IsOptional()
    content?:string;

    @IsString()
    @IsOptional()
    authorName?:string;

    @IsDate()
    @IsOptional()
    createdAt?:Date

    @IsDate()
    @IsOptional()
    updatedAt?:Date
}