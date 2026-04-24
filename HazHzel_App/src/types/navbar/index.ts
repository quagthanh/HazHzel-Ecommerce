import { StaticImageData } from "next/image";

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
  type: "dynamic" | "static"; // Phân biệt loại menu
  label: string;
  // Dành cho dynamic (API)
  baseParams?: string;
  items?: any[];
  // Dành cho static (Hardcoded)
  href?: string;
}
