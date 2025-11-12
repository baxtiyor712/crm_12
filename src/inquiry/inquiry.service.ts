import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInquiryInput } from './dto/create-inquiry.input';
import { UpdateInquiryInput } from './dto/update-inquiry.input';
import { Inquiry } from './entities/inquiry.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InquiryService {
  constructor(@InjectRepository(Inquiry) private inquiryRepo: Repository<Inquiry>) { }

  async create(createInquiryInput: CreateInquiryInput) {
    const inquiry = this.inquiryRepo.create(createInquiryInput)
    return await this.inquiryRepo.save(inquiry)
  }

  findAll() {
    return this.inquiryRepo.find()
  }

  async findOne(id: number) {
    const inquiry = await this.inquiryRepo.findOne({ where: { id: +id } })
    if (!inquiry) throw new NotFoundException()
    return inquiry
  }

  async update(id: number, updateInquiryInput: UpdateInquiryInput) {
    const inquiry = await this.inquiryRepo.findOne({ where: { id: +id } })
    if (!inquiry) throw new NotFoundException()
    return this.inquiryRepo.update(id, updateInquiryInput)
  }

  async remove(id: number) {
    const inquiry = await this.inquiryRepo.findOne({ where: { id: +id } })
    if (!inquiry) throw new NotFoundException()
    return this.inquiryRepo.delete(id)
  }
}
