/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";
export class RegisterDto{
    @IsEmail({},{message:"Please provaide a valid email"})
    @IsNotEmpty()
    @IsString()
    email:string;

    @IsStrongPassword()
    @IsString()
    @MinLength(8,{})
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
    name:string;
}