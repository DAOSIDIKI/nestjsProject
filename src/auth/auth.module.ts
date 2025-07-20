/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthEntity from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports:[TypeOrmModule.forFeature([AuthEntity]),JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
