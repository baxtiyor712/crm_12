import { Module } from '@nestjs/common';
import { PaysService } from './pays.service';
import { PaysResolver } from './pays.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pay } from './entities/pay.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pay])],
  providers: [PaysResolver, PaysService],
})
export class PaysModule {}
