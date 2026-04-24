"use server";
import { sendRequest } from "@/utils/api";
import { IMasonryItem } from "@/types/collection";

export interface IAggregationResponse {
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: IMasonryItem[];
}

export async function getTitleAggregation(params: {
  current: number;
  pageSize: number;
}) {
  return sendRequest<IAggregationResponse>({
    url: "/title-aggregation",
    method: "GET",
    queryParams: {
      current: params.current,
      pageSize: params.pageSize,
    },
  });
}
