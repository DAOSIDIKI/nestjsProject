/* eslint-disable prettier/prettier */
import PostEntity from "src/posts/entities/post.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum userRole {
    USER="user",
    ADMIN="admin"
}
@Entity()
export default class AuthEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    name:string;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column({type:'enum',enum:userRole,default:userRole.USER})
    role:userRole;

    @OneToMany(() => PostEntity, (post) =>post.authorName)
    posts:PostEntity[]
    
    @UpdateDateColumn()
    updatedAt:Date;

    @CreateDateColumn()
    createdAt:Date
}