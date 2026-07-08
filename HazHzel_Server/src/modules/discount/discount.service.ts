import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscountService {
  ccreat() {
    return 'This action adds a new discount';
  }

  findAll() {
    return `This action returns all discount`;
  }

  findOne(id: number) {
    return `This action returns a #${id} discount`;
  }

  update(id: number) {
    return `This action updates a #${id} discount`;
  }

  remove(id: number) {
    return `This action removes a #${id} discount`;
  }
}
