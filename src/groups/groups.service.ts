import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {
  constructor(@InjectRepository(Group) private groupRepo: Repository<Group>) { }

  async create(createGroupInput: CreateGroupInput) {
    const group = this.groupRepo.create(createGroupInput)
    return await this.groupRepo.save(group)
  }

  findAll() {
    return this.groupRepo.find()
  }

  async findOne(id: number) {
    const group = await this.groupRepo.findOne({ where: { id: +id } })
    if (!group) throw new NotFoundException()
    return group
  }

  async update(id: number, updateGroupInput: UpdateGroupInput) {
    const group = await this.groupRepo.findOne({ where: { id: +id } })
    if (!group) throw new NotFoundException()
    return this.groupRepo.update(id, updateGroupInput)
  }

  async remove(id: number) {
    const group = await this.groupRepo.findOne({ where: { id: +id } })
    if (!group) throw new NotFoundException()
    return this.groupRepo.delete(id)
  }
}
