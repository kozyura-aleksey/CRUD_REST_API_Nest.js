import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { deleteTagDto } from "../tags/dto/deleteTag.dto";
import { Tag } from "../tags/tags.model";
import { Repository } from "typeorm";
import { AddToUserDto } from "./dto/add-to-user.dto";
import { GetTagsDto } from "./dto/get-tags.dto";
import { User } from "./users.model";

@Injectable()
export class UserTagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  async checkAndAddToUserTags(id: string, dto: AddToUserDto) {
    const tag = await this.tagRepository
      .createQueryBuilder()
      .update(Tag)
      .set({
        creator: dto,
      })
      .execute();
    return tag;
  }

  async deleteTag(id: string) {
    const tag = await this.tagRepository.delete(id);
    return true;
  }

  async getTagsIfUserCreator(dto: GetTagsDto): Promise<Tag[]> {
    const tags = await this.tagRepository.find({
      where: {
        name: dto.name,
      },
    });
    return tags;
  }
}
