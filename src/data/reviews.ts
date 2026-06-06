import data from "./reviews.json";
import type { Review } from "../types";

const reviews = data as unknown as Review[];

export default reviews;
