import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { findUserDto } from "../users/dto/find-user.dto";
import { Repository } from "typeorm";
import { CreateTagDto } from "./dto/create-tag.dto";
import { sortTagDto } from "./dto/sortTag.dto";
import { updateTagDto } from "./dto/updateTag.dto";
import { Tag } from "./tags.model";

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  async createTag(dto: CreateTagDto, userDto: findUserDto): Promise<Tag> {
    const candidate = await this.tagRepository.findOne(dto);
    if (candidate) {
      throw new HttpException("Такой тэг существует", HttpStatus.BAD_REQUEST);
    }
    const tag = await this.tagRepository.create({
      ...dto,
      creator: userDto,
    });
    return this.tagRepository.save(tag);
  }

  async getOneTag(id: string): Promise<Tag> {
    const tag = this.tagRepository.findOne(id);
    return tag;
  }

  async updateTag(id: string, dto: updateTagDto): Promise<Tag> {
    const tag = await this.tagRepository.findOne(id);
    this.tagRepository.merge(tag, dto);
    this.tagRepository.save(tag);
    return tag;
  }

  async deleteTag(id: string) {
    const tag = await this.tagRepository.delete(id);
    return true;
  }

  async sortTags(dto: sortTagDto): Promise<Tag[]> {
    const tags = await this.tagRepository
      .createQueryBuilder("tag")
      .orderBy("tag.name", "ASC")
      .getMany();
    return tags;
  }
}
