import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Tag } from "src/tags/tags.model";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AddToUserDto } from "./dto/add-to-user.dto";
import { GetTagsDto } from "./dto/get-tags.dto";
import { UserTagService } from "./user-tag.service";
import { UsersService } from "./users.service";

@UseGuards(JwtAuthGuard)
@Controller("user/tag")
export class UserTagController {
  constructor(private userTagService: UserTagService) {}

  @Post("")
  checkAndAddToUserTags(id: string, dto: AddToUserDto) {
    return this.userTagService.checkAndAddToUserTags(id, dto);
  }

  @Delete(":id")
  deleteTag(@Param("id") id) {
    return this.userTagService.deleteTag(id);
  }

  @Get("/my")
  getTagsIfUserCreator(dto: GetTagsDto): Promise<Tag[]> {
    return this.userTagService.getTagsIfUserCreator(dto);
  }
}
