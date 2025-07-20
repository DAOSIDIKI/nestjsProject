/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export default class PostCreationDTO{
    @IsString()
    @IsNotEmpty()
    title:string;

    @IsString()
    @IsNotEmpty()
    content:string;

    @IsString()
    @IsNotEmpty()
    authorName:string;
}