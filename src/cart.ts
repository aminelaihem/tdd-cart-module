import { Product, ProductSchema } from "./product";

let cart: Product[] = [];
let discountCode: string | null = null;

const validDiscounts: Record<string, number> = {
  PROMO10: 0.1,
  PROMO20: 0.2,
};

export function __resetCart() {
  cart = [];
  discountCode = null;
}

export function addProduct(product: Product): void {
  ProductSchema.parse(product);
  const existing = cart.find((p) => p.id === product.id);
  if (existing) {
    existing.quantity += product.quantity;
  } else {
    cart.push({ ...product });
  }
}

export function removeProduct(productId: string): void {
  cart = cart.filter((p) => p.id !== productId);
}

export function getProductCount(): number {
  return cart.length;
}

export function getTotal(): number {
  let total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  if (discountCode && validDiscounts[discountCode]) {
    total *= 1 - validDiscounts[discountCode];
  }
  return total;
}

export function applyDiscount(code: string): void {
  if (!validDiscounts[code]) {
    throw new Error("Code promo invalide");
  }
  discountCode = code;
}
