/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AuthEntity from './entities/auth.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from "bcryptjs"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(AuthEntity) private authRepository : Repository<AuthEntity>,private jwtService:JwtService){}
    async register(data:RegisterDto){
        const {email,password,name}=data;
        if(!email || !password ||!name)
            return {success:false,message:"Missing credentials"}
        try{
            const user=await this.authRepository.findOne({where:[{email},{name}]})
            if(user)
                throw new ConflictException('User with one'+email+'or '+name+'Already exist')
            const hashed=await bcrypt.hash(password,10);
            const uzr=this.authRepository.create({email,password:hashed,name})
            await this.authRepository.save(uzr);
            const {...result}=uzr
            result.password='';
            return {success:true,message:"User created Successfully",data:result}
        }
        catch(err){
            return {success:false,message:(err as Error).message}
        }
            
    }
    async login(data:RegisterDto){
        const {email,password}=data;
        if(!email || !password)
            return {success:false,message:"Missing credentials"}
        try{
            const user=await this.authRepository.findOne({where:{email}})
            if(!user)
                throw new ConflictException('No User with '+email+' exist')
            const same=await bcrypt.compare(password,user.password)
            if(!same)
                return {success:false,message:"Invalid password"}
            const token=this.generateToken(user);
            const {...result}=user
            result.password='';
            return {success:true,message:"User created Successfully",data:result,...token}        }
        catch(err){
            return {success:false,message:(err as Error).message}
        }

    }
    private generateToken(uzr:AuthEntity){
        return {
            accessToken:this.generateAccessToken(uzr),
            refreshToken:this.generateRefreshToken(uzr)
        }
    }
    private generateAccessToken(uzr:AuthEntity){
        const payload={
            email:uzr.email,
            sub:uzr.id,
            role:uzr.role,
        }
        return this.jwtService.sign(payload,{
            secret:process.env.JWT_SECRET,
            expiresIn:'15m'
        });
    }
    private generateRefreshToken(uzr:AuthEntity){
        const payload={
            sub:uzr.id,
        }
        return this.jwtService.sign(payload,{
            secret:process.env.JWT_SECRETS,
            expiresIn:'15m'
        });
    }
}
