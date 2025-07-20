/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class LoginDto{
    @IsEmail({},{message:"Please provaide a valid email"})
    @IsString()
    @IsNotEmpty()
    email:string;

    @IsStrongPassword()
    @IsString()
    @MinLength(8,{})
    @IsNotEmpty()
    password:string;
}