import { IProductRepository } from "../app/repositories/IProductRepository";
import { IProduct } from "../app/domain/IProduct";
import dummy_data from "../../data/dummy_product.json";

export class MockRepository implements IProductRepository {
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

  public add(product: IProduct): void {
    this.products.set(product.id, product);
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
}
