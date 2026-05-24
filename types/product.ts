import type { Product } from "@/sanity.types";

export type ProductForCard = Omit<Product, "categories"> & {
  categories?: Product["categories"] | Array<string | null> | null;
};
