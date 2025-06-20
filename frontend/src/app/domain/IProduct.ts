/**
 * This file is part of the Product Management System.
 * @param id - Unique identifier for the product.
 * @param name - Name of the product.
 * @param description - Description of the product.
 * @param price - Price of the product.
 */
export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
}
