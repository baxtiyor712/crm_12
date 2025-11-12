// src/chart/entities/chart.entity.ts (yoki shunga o'xshash fayl)

import { ObjectType, Field, Int } from '@nestjs/graphql';

// ✅ Sinfga umumiy izoh qo'shildi
@ObjectType({ description: '✅ Oy davomidagi O‘quvchi Statisitikasining ma’lumot modeli' })
export class Chart {
  
  @Field(() => Int, { description: 'Muayyan oyda CRM ga qo‘shilgan yangi o‘quvchilar soni' }) // ✅ joined uchun izoh
  joined: number;

  @Field(() => Int, { description: 'Muayyan oyda CRM dan ketgan o‘quvchilar soni' }) // ✅ left uchun izoh
  left: number;
}


