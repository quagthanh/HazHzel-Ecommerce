import { StaticImageData } from "next/image";
import { IProduct, IProductDetail, IProductVariant } from "../interface";
import { GetProp, UploadProps } from "antd";

export interface ListingClientProps {
  banner: StaticImageData;
  title?: string;
  initialProducts: IProduct[];
  initialMeta: {
    current: number;
    pageSize: number;
    total: number;
  };
}
export enum GenderType {
  MEN = "MEN",
  WOMEN = "WOMEN",
  UNISEX = "UNISEX",
}
export interface ProductInfoProps {
  product: IProductDetail;
  currentVariant: IProductVariant | null;
  uniqueAttributes: { name: string; values: string[] }[];
  selectedOptions: Record<string, string>;
  onOptionChange: (k: string, v: string) => void;
}

export interface AdminPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export interface ProductResponseData {
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: any[];
}
