import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { findUserDto } from "../users/dto/find-user.dto";
import { CreateTagDto } from "./dto/create-tag.dto";
import { deleteTagDto } from "./dto/deleteTag.dto";
import { getOneTagDto } from "./dto/getOneTag.dto";
import { sortTagDto } from "./dto/sortTag.dto";
import { updateTagDto } from "./dto/updateTag.dto";
import { Tag } from "./tags.model";
import { TagsService } from "./tags.service";

@UseGuards(JwtAuthGuard)
@Controller("tag")
export class TagsController {
  constructor(private tagService: TagsService) {}

  @Post()
  createTag(@Body() dto: CreateTagDto, userDto: findUserDto): Promise<Tag> {
    return this.tagService.createTag(dto, userDto);
  }

  @Get(":id")
  getOneTag(@Param("id") id: string, @Body() dto: getOneTagDto): Promise<Tag> {
    return this.tagService.getOneTag(id);
  }

  @Put(":id")
  updateTag(@Param("id") id: string, @Body() dto: updateTagDto): Promise<Tag> {
    return this.tagService.updateTag(id, dto);
  }

  @Delete(":id")
  deleteTag(@Param("id") id: string) {
    return this.tagService.deleteTag(id);
  }

  @Get()
  sortTags(@Body() dto: sortTagDto): Promise<Tag[]> {
    return this.tagService.sortTags(dto);
  }
}
