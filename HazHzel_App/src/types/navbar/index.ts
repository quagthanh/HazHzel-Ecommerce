import { StaticImageData } from "next/image";
import { linkType, typeNavMenuItem } from "../enum";

export interface NavMenuColumn {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

export interface NavMenuPromo {
  image: StaticImageData | string;
  store: string;
  title: string;
  href: string;
}

export interface NavItem {
  _id: string;
  name: string;
  slug: string;
  children?: NavItem[];
}

export interface NavGroup {
  label: string;
  baseParams: string;
  items: NavItem[];
}
export interface NavMenuItem {
  type: typeNavMenuItem.DYNAMIC | typeNavMenuItem.STATIC;
  label: string;
  baseParams?: string;
  linkType?: linkType.PRODUCTS | linkType.STORES;
  items?: any[];
  href?: string;
}
export interface IFilterConfig {
  filter_config: {
    productTypeName: any[];
    brandName: any[];
    sizeFilter: string[];
    colorFilter: string[];
    prices: number[];
  };
}
