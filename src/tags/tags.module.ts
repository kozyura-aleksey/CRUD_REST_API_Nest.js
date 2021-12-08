import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/users.model';
import { TagsController } from './tags.controller';
import { Tag } from './tags.model';
import { TagsService } from './tags.service';

@Module({
    providers: [TagsService],
    controllers: [TagsController],
    exports: [TagsService, TypeOrmModule],
    imports: [TypeOrmModule.forFeature([User, Tag]),
    forwardRef(() => AuthModule)]
})
export class TagsModule { }
