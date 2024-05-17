export type ProductType = {
  id: string;
  Name: string;
  Description: string;
  Price: number;
  Quantity: number;
  color: string;
  ProductID: string;
  Image : string;
};

export type ProductTypeList = {
  _id: string;
  Name: string;
  Description: string;
  Quantity: number;
  Price: number;
  ProductID: string;
  Image : string;
};

export type ProductStoreType = {
  id: string;
  name: string;
  thumb: string;
  price: number;
  count: number;
  color: string;
  size: string;
};
