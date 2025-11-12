import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InquiryService } from './inquiry.service';
import { Inquiry } from './entities/inquiry.entity';
import { CreateInquiryInput } from './dto/create-inquiry.input';
import { UpdateInquiryInput } from './dto/update-inquiry.input';

@Resolver(() => Inquiry)
export class InquiryResolver {
  constructor(private readonly inquiryService: InquiryService) { }

  @Mutation(() => Inquiry)
  createInquiry(@Args('createInquiryInput') createInquiryInput: CreateInquiryInput) {
    return this.inquiryService.create(createInquiryInput);
  }

  @Query(() => [Inquiry], { name: 'inquiries' })
  findAll() {
    return this.inquiryService.findAll();
  }

  @Query(() => Inquiry, { name: 'inquiry' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.inquiryService.findOne(id);
  }

  @Mutation(() => Inquiry)
  updateInquiry(@Args('updateInquiryInput') updateInquiryInput: UpdateInquiryInput) {
    return this.inquiryService.update(updateInquiryInput.id, updateInquiryInput);
  }

  @Mutation(() => Inquiry)
  removeInquiry(@Args('id', { type: () => Int }) id: number) {
    return this.inquiryService.remove(id);
  }
}
