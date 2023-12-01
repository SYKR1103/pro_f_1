
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";



export abstract class BaseEntity {


    @PrimaryGeneratedColumn('uuid')
    public id : string

    @CreateDateColumn()
    public createdAt : Date

    @UpdateDateColumn()
    public updatedAt : Date




}