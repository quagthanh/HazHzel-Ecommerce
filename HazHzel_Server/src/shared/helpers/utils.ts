import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { RoleEnum } from '../enums/role.enum';
import { Model } from 'mongoose';
import aqp from 'api-query-params';
import { Role } from '@/modules/role/schemas/role.schema';
import { BadRequestException } from '@nestjs/common';
import { statusOrderAdminEnum } from '../enums/statusOrder.enum';

const saltOrRounds = 10;

export const hashPassword = async (plainPassword: string) => {
  try {
    return await bcrypt.hash(plainPassword, saltOrRounds);
  } catch (error) {}
};
export const comparePassword = async (
  plainPassword: string,
  hashPassword: string,
) => {
  try {
    return await bcrypt.compare(plainPassword, hashPassword);
  } catch (error) {}
};

export const isValidId = (id: string): boolean => mongoose.isValidObjectId(id);
export function pickHighestRole(roles: RoleEnum[]): RoleEnum {
  const priority = [RoleEnum.SYSTEM_ADMIN, RoleEnum.ADMIN];

  return priority.find((role) => roles.includes(role));
}
export async function pagination(
  model: Model<any>,
  query: string,
  current: number = 1,
  pageSize: number = 5,
  populate: any[] = [],
  baseProjection?: any,
  isAll: boolean = false,
) {
  const { filter, sort, projection } = aqp(query);
  if (!current) current = 1;
  if (!pageSize) pageSize = 5;

  if (filter.current) delete filter.current;
  if (filter.pageSize) delete filter.pageSize;

  if (filter.all) delete filter.all;

  const totalItems = await model.countDocuments(filter);
  const finalProjection = projection
    ? { ...baseProjection, ...projection }
    : baseProjection;

  let resultQuery = model
    .find(filter)
    .select(finalProjection)
    .sort(sort as any)
    .populate(populate);

  if (!isAll) {
    const skip = (current - 1) * pageSize;
    resultQuery = resultQuery.skip(skip).limit(pageSize);
  }

  const result = await resultQuery;

  return {
    meta: {
      current: isAll ? 1 : current,
      pageSize: isAll ? totalItems : pageSize,
      pages: isAll ? 1 : Math.ceil(totalItems / pageSize),
      total: totalItems,
    },
    result,
  };
}

export async function paginationAggregate(
  model: Model<any>,
  query: string,
  current = 1,
  pageSize = 10,
  aggregatePipeline: any[] = [],
) {
  const { filter, sort } = aqp(query);

  if (filter.current) delete filter.current;
  if (filter.pageSize) delete filter.pageSize;

  const skip = (current - 1) * pageSize;

  const totalItemsAgg = await model.aggregate([
    { $match: filter },
    ...aggregatePipeline,
    { $count: 'total' },
  ]);

  const totalItems = totalItemsAgg[0]?.total || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const result = await model.aggregate([
    { $match: filter },
    ...aggregatePipeline,
    { $sort: sort || { createdAt: -1 } },
    { $skip: skip },
    { $limit: pageSize },
  ]);

  return {
    meta: {
      current,
      pageSize,
      pages: totalPages,
      total: totalItems,
    },
    result,
  };
}
export async function paginationAggregateNew(
  model: Model<any>,
  current = 1,
  pageSize = 10,
  sort: any = { createdAt: -1 },
  aggregatePipeline: any[] = [],
  customMatchStage: any = {},
) {
  const fullPipeline = [{ $match: customMatchStage }, ...aggregatePipeline];

  const skip = (current - 1) * pageSize;

  const totalItemsAgg = await model.aggregate([
    ...fullPipeline,
    { $count: 'total' },
  ]);

  const totalItems = totalItemsAgg[0]?.total || 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  const result = await model.aggregate([
    ...fullPipeline,
    { $sort: sort },
    { $skip: skip },
    { $limit: pageSize },
  ]);

  return {
    meta: {
      current,
      pageSize,
      pages: totalPages,
      total: totalItems,
    },
    result,
  };
}
export async function CheckRole(roleModel: Model<Role>, _id: string) {
  const customerRole = await roleModel.findOne({ _id });
  if (customerRole?.name !== RoleEnum.CUSTOMER) {
    throw new BadRequestException('Must is customer role');
  }
  return !!customerRole;
}

export const validOrderTransitions: Record<
  statusOrderAdminEnum,
  statusOrderAdminEnum[]
> = {
  [statusOrderAdminEnum.PENDING]: [
    statusOrderAdminEnum.COMPLETED,
    statusOrderAdminEnum.CANCELLED,
  ],

  [statusOrderAdminEnum.COMPLETED]: [],

  [statusOrderAdminEnum.CANCELLED]: [],
};

export const getDateRange = (days: number) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);
  return { startDate, endDate };
};
