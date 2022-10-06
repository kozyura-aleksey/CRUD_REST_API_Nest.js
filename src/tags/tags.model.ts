import { IsString, Length } from "class-validator";
import { User } from "../users/users.model";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Tag {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => User, (user) => user.createdTags)
  creator: User;

  @Length(40)
  @IsString()
  @Column({ type: "varchar", unique: true })
  name: string;

  @IsString()
  @Column({ type: "varchar", default: 0 })
  sortOrder: string;
}
