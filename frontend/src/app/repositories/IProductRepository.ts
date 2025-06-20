import { IProduct } from "../domain/IProduct";

export interface IProductRepository {
  set(product: IProduct): IProduct;
  getById(id: string): IProduct | undefined;
  delete(id: string): void;
  getAll(): IProduct[];
}
