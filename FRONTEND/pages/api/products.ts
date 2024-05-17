import type { NextApiRequest, NextApiResponse } from "next";
import { ProductTypeList } from "types";

// ProductTypeList

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch("http://localhost:5000/products");
  const products: ProductTypeList[] = await response.json();

  res.status(200).json(products);
};
