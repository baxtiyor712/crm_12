import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaysService } from './pays.service';
import { Pay } from './entities/pay.entity';
import { CreatePayInput } from './dto/create-pay.input';
import { UpdatePayInput } from './dto/update-pay.input';

@Resolver(() => Pay)
export class PaysResolver {
  constructor(private readonly paysService: PaysService) { }

  @Mutation(() => Pay)
  createPay(@Args('createPayInput') createPayInput: CreatePayInput) {
    return this.paysService.create(createPayInput);
  }

  @Query(() => [Pay], { name: 'pays' })
  findAll() {
    return this.paysService.findAll();
  }

  @Query(() => Pay, { name: 'pay' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.paysService.findOne(id);
  }

  @Mutation(() => Pay)
  updatePay(@Args('updatePayInput') updatePayInput: UpdatePayInput) {
    return this.paysService.update(updatePayInput.id, updatePayInput);
  }

  @Mutation(() => Pay)
  removePay(@Args('id', { type: () => Int }) id: number) {
    return this.paysService.remove(id);
  }
}
