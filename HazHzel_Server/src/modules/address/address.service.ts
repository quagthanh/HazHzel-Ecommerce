import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './schemas/address.schema';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address.name)
    private readonly addressModel: Model<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    if (createAddressDto.isDefault && createAddressDto.userId) {
      await this.addressModel.updateMany(
        { userId: createAddressDto.userId },
        { $set: { isDefault: false } },
      );
    }

    return this.addressModel.create(createAddressDto);
  }

  async findAll() {
    return this.addressModel.find().exec();
  }

  async findOne(id: string) {
    const address = await this.addressModel.findById(id).exec();
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return address;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const existingAddress = await this.findOne(id);

    if (updateAddressDto.isDefault) {
      const userId = updateAddressDto.userId || existingAddress.userId;
      if (userId) {
        await this.addressModel.updateMany(
          { userId, _id: { $ne: id } },
          { $set: { isDefault: false } },
        );
      }
    }

    const updatedAddress = await this.addressModel
      .findByIdAndUpdate(id, updateAddressDto, { new: true })
      .exec();

    return updatedAddress;
  }

  async remove(id: string) {
    const deletedAddress = await this.addressModel.findByIdAndDelete(id).exec();
    if (!deletedAddress) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return deletedAddress;
  }
}
