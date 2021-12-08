import { IsString, Length } from "class-validator";

export class deleteTagDto {
    readonly id: number;
    @IsString()
    @Length(0, 40)
    readonly name: string;
    readonly sortOrder: string;
}