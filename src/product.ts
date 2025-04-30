import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

export type Product = z.infer<typeof ProductSchema>;

export function productFactory(product?: Partial<Product>): Product {
  const now = Date.now().toString();
  return {
    id: product?.id || now,
    name: product?.name || `Product ${now}`,
    quantity: product?.quantity !== undefined ? product.quantity : Math.floor(Math.random() * 10 + 1),
    price: product?.price !== undefined ? product.price : Math.floor(Math.random() * 100 + 1),
};
}
