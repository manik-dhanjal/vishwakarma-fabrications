import data from "./products.json";
import type { Product } from "../types";

// products.json carries per-row literal types; assert the shared Product shape.
const products = data as unknown as Product[];

export default products;
