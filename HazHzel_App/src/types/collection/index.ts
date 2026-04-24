export enum EntityType {
  STORE = "STORE",
  COLLECTION = "COLLECTION",
  CATEGORY = "CATEGORY",
}

export interface IMasonryItem {
  id: string;
  title: string;
  slug: string;
  type: EntityType;
  image: {
    secure_url: string;
    width: number;
    height: number;
  };
}
