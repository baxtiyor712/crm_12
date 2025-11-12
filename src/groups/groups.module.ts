import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsResolver } from './groups.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  providers: [GroupsResolver, GroupsService],
})
export class GroupsModule { }
