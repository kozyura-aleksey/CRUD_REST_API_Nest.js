import { IsString, Length } from "class-validator";

export class CreateTagDto {
    readonly id: number;
    @IsString()
    @Length(0, 40)
    readonly name: string;
    readonly sortOrder: string;
}