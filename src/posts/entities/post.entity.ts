/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export default class PostEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @Column()
    content:string;

    @Column()
    authorName:string;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;
}