import { IsString, IsUUID, isUUID, Length } from "class-validator";
import { Tag } from "src/tags/tags.model";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: string;

    @Length(100)
    @IsString()
    @Column({ type: 'varchar', unique: true })
    email: string;

    @Length(8, 100)
    @IsString()
    @Column({ type: 'varchar' })
    password: string;

    @Length(30)
    @IsString()
    @Column({ type: 'varchar', unique: true })
    nickname: string;

    @OneToMany(() => Tag, (tag) => tag.creator)
    createdTags: Tag[];
}