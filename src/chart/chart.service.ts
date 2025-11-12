// src/chart/chart.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from '../students/entities/student.entity'; // ✅ Entity importi to'g'ri bo'lishi kerak

@Injectable()
export class ChartService {
    getMonthlyStats(year: number, month: number): import("./entities/chart.entity").Chart | PromiseLike<import("./entities/chart.entity").Chart> {
      throw new Error('Method not implemented.');
    }
    constructor(
        // Student modelini injeksiya qilish
        @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
    ) {}

    // ✅ Tuzatilgan funksiya: joinedAt bo'yicha filtrlash
    async getJoinedStudents(start: Date, end: Date) {
        return this.studentModel.find({ 
            joinedAt: { 
                $gte: start, // Boshlanish sanasidan katta yoki teng
                $lte: end    // Tugash sanasidan kichik yoki teng
            } 
        }).exec();
    }
    
    // ✅ Tuzatilgan funksiya: leftAt bo'yicha filtrlash
    async getLeftStudents(start: Date, end: Date) {
        return this.studentModel.find({ 
            leftAt: { 
                $gte: start, 
                $lte: end    
            } 
        }).exec();
    }
    
    // ... (ChartService'dagi boshqa funksiyalar)
}