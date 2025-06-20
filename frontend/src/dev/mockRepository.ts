import { IProductRepository } from "../app/repositories/IProductRepository";
import { IProduct } from "../app/domain/IProduct";
import dummy_data from "../../data/dummy_product.json";

class MockRepository implements IProductRepository {
  private products = new Map<string, IProduct>();

  public constructor() {
    this.init();
  }

  private init() {
    dummy_data.forEach((product) => {
      this.products.set(product.id, {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
      });
    });
  }

  public set(product: IProduct): IProduct {
    product.id = this.nextId();
    this.products.set(product.id, product);
    return product;
  }

  public update(product: IProduct): IProduct {
    if (!this.products.has(product.id)) {
      throw new Error(`Product with id ${product.id} does not exist.`);
    }
    this.products.set(product.id, product);
    return product;
  }

  public getAll(): IProduct[] {
    return Array.from(this.products.values());
  }

  public getById(id: string): IProduct | undefined {
    return this.products.get(id);
  }

  public delete(id: string): void {
    this.products.delete(id);
  }

  public get size(): number {
    return this.products.size;
  }

  private nextId(): string {
    return (this.products.size + 1).toString();
  }
}

export const productRepository = new MockRepository();
