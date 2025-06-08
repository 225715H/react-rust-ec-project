import { IProduct } from "../domain/IProduct";

export interface IProductRepository {
  add(product: IProduct): void;
  getById(id: string): IProduct | undefined;
  delete(id: string): void;
  getAll(): IProduct[];
}
