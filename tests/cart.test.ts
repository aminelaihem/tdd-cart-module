import { describe, expect, it, beforeEach } from "vitest";
import {
  addProduct,
  removeProduct,
  getProductCount,
  getTotal,
  applyDiscount,
  __resetCart
} from "../src/cart";
import { productFactory } from "../src/product";

describe("cart module", () => {
  beforeEach(() => {
    __resetCart();
  });

  it("ajoute un produit simple", () => {
    const product = productFactory({ id: "1", quantity: 2, price: 50 });
    addProduct(product);
    expect(getProductCount()).toBe(1);
  });

  it("ajoute un produit déjà existant et cumule la quantité", () => {
    const product = productFactory({ id: "1", quantity: 2 });
    addProduct(product);
    addProduct({ ...product, quantity: 3 });
    expect(getProductCount()).toBe(1);
    expect(getTotal()).toBe(product.price * 5);
  });

  it("supprime un produit existant", () => {
    const product = productFactory({ id: "1" });
    addProduct(product);
    removeProduct("1");
    expect(getProductCount()).toBe(0);
  });

  it("ignore la suppression d'un produit inexistant", () => {
    removeProduct("inconnu");
    expect(getProductCount()).toBe(0);
  });

  it("calcule le total sans promo", () => {
    const p1 = productFactory({ id: "1", price: 20, quantity: 2 });
    const p2 = productFactory({ id: "2", price: 10, quantity: 1 });    
    addProduct(p1);
    addProduct(p2);
    expect(getTotal()).toBe(50);
  });

  it("applique un code promo valide", () => {
    const product = productFactory({ price: 100, quantity: 1 });
    addProduct(product);
    applyDiscount("PROMO10");
    expect(getTotal()).toBe(90);
  });

  it("rejette un code promo invalide", () => {
    const product = productFactory({ price: 100 });
    addProduct(product);
    expect(() => applyDiscount("FAUXCODE")).toThrow("Code promo invalide");
  });

  it("rejette un produit invalide (prix négatif)", () => {
    const product = productFactory({ price: -5 });
    expect(() => addProduct(product)).toThrow();
  });

  it("rejette un produit invalide (quantité 0)", () => {
    const product = productFactory({ quantity: 0, price: 10 });
    expect(() => addProduct(product)).toThrow();
  });
});
