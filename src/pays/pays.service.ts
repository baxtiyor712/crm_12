import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePayInput } from './dto/create-pay.input';
import { UpdatePayInput } from './dto/update-pay.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Pay } from './entities/pay.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaysService {
  constructor(@InjectRepository(Pay) private payRepo: Repository<Pay>) { }

  async create(createPayInput: CreatePayInput) {
    const pay = this.payRepo.create(createPayInput)
    return await this.payRepo.save(pay)
  }

  findAll() {
    return this.payRepo.find()
  }

  async findOne(id: number) {
    const pay = await this.payRepo.findOne({ where: { id: +id } })
    if (!pay) throw new NotFoundException()
    return pay
  }

  async update(id: number, updatePayInput: UpdatePayInput) {
    const pay = await this.payRepo.findOne({ where: { id: +id } })
    if (!pay) throw new NotFoundException()
    return this.payRepo.update(id, updatePayInput)
  }

  async remove(id: number) {
    const pay = await this.payRepo.findOne({ where: { id: +id } })
    if (!pay) throw new NotFoundException()
    return this.payRepo.delete(id)
  }
}
