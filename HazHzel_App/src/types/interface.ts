import { StaticImageData } from "next/image";
import { IUser } from "./next-auth";
import { statusProduct } from "./enum";
import { EntityType } from "./collection";
import { GenderType } from "./product";

export interface Promo {
  href: string;
  image: StaticImageData;
  data_title: string;
  subtitle: string;
}

export interface SubChild {
  href: string;
  label: string;
}

export interface Child {
  href: string;
  label: string;
  subChildren?: SubChild[];
}

export interface NavItem {
  href: string;
  label: string;
  data_title: string;
  children?: Child[];
  promos?: Promo[];
}

export interface ImageUnisexCollections {
  href: string;
  src: StaticImageData;
  data_title: string;
  subtitle: string;
  width: number;
  height: number;
}
export interface UnisexItem {
  href: string;
  label: string;
  image: ImageUnisexCollections[];
}

export interface ImageFeaturedBrands {
  href: string;
  src: StaticImageData;
  data_title: string;
  subtitle: string;
  width: number;
  height: number;
}
export interface FeatureBrands {
  name: string;
  slug: string;
  label: string;
  image: ImageFeaturedBrands[];
}
export interface DataShopFavorite {
  href: string;
  src: StaticImageData;
  product_name: string;
  price: string;
  vendor: string;
  is_new: boolean;
  is_sale: boolean;
  is_hot: boolean;
}
export interface ShopFavorite {
  href: string;
  label: string;
  items: DataShopFavorite[];
}
export interface INewBrand {
  src: StaticImageData;
  href: string;
  label: string;
  description: string;
}

export interface SearchDrawerProps {
  open: boolean;
  onClose: () => void;
}

export interface ICancelButton {
  onClick: () => void;
  children: React.ReactNode;
}

export interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}
export interface Meta {
  current: number;
  pageSize: number;
  total: number;
  pages?: number;
}

export interface UserListProps {
  initialUsers?: IUser[];
  initialMeta?: Meta;
}
export interface IImage {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
}

export interface IProductCategory {
  _id: string;
  name: string;
  slug?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAddress {
  street?: string;
  ward?: string;
  district?: string;
  city?: string;
  province?: string;
  country?: string;
}

export interface IProductSupplier {
  _id: string;
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: IAddress;
  description?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}
export interface IVariantAttribute {
  k: string;
  v: string;
}
export interface IProductVariant {
  _id: string;
  name: string;
  productId: string;
  originalPrice?: number;
  discountPrice?: number;
  currentPrice: number;
  promoCodePrice?: string;
  attributes: IVariantAttribute[];
  images: IImage[];
  stock: number;
  sku?: string;
}
export interface IProductDetail {
  _id: string;
  name: string;
  description: string;
  slug: string;
  images: IImage[];
  supplierId: { name: string; _id: string; slug: string };
  categoryId: { name: string; _id: string; slug: string };
  variants: IProductVariant[];
  currentPrice: number;
  originalPrice: number;
  discountPrice?: number;
  isSale?: boolean;
  isHot?: boolean;
  stock?: number;
}
export interface IProduct {
  _id: string;
  name: string;
  description: string;
  views: number;
  slug: string;
  categoryId: IProductCategory;
  supplierId: IProductSupplier;
  images: IImage[];
  status: statusProduct.ACTIVE | statusProduct.INACTIVE;
  isHot: boolean;
  isSale: boolean;
  gender: GenderType;
  originalPrice: number;
  discountPrice?: number;
  currentPrice: number;
  variants?: IProductVariant;
  createdAt: string;
  updatedAt: string;
}

export interface IUserTable {
  _id: string;
  name: string;
  email: string;
}

export interface IProps {
  users: IUserTable[] | [];
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
}

export interface ICategory {
  _id: string;
  name?: string;
  slug?: string;
  status?: string;
  images?: IImage[];
}

export interface ISupplier {
  _id: string;
  name?: string;
  contactName?: string;
  slug?: string;
  email?: string;
  phone?: string;
  images?: IImage[];
  address?: string;
  status?: boolean;
}
export interface ICollection {
  _id: string;
  name?: string;
  slug?: string;
  images?: IImage[];
  status?: string;
}
export interface IProductGrid {
  products: IProduct[];
}
export interface TopSupplier {
  supplierId: string;
  totalViews: number;
  totalProducts: number;
  supplier: {
    name: string;
    slug: string;
    images: IImage[];
    description?: string;
    status: string;
  };
}
export interface ListPageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
export interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
export interface ResponseData<T> {
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: T[];
}
