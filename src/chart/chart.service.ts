import { Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/students/entities/student.entity';

@Injectable()
export class ChartService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) { }

  async getMonthlyStats(year: number, month: number) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const joined = await this.studentRepo.countBy({
      joinedAt: Between(start, end),
    });

    const left = await this.studentRepo.countBy({
      leftAt: Between(start, end),
    });

    return { joined, left };
  }
}
