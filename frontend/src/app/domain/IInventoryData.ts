/**
 * Interface representing inventory data.
 * @param id - Unique identifier for the inventory item.
 * @param type - Type of inventory operation (e.g., "入荷", "出荷").
 * @param date - Date of the inventory operation.
 * @param unit - Unit of measurement for the inventory item.
 * @param quantity - Quantity of the inventory item involved in the operation.
 * @param price - Price per unit of the inventory item.
 * @param inventory - Total inventory count after the operation.
 */
export interface IInventoryData {
  id: string;
  type: InventoryType;
  date: string;
  unit: number;
  quantity: number;
  price: number;
  inventory: number;
}

export type IInventoryFormData = Pick<
  IInventoryData,
  "id" | "quantity" | "inventory"
>;

export const InventoryTypeArr = ["sell", "purchase"] as const;
export type InventoryType = (typeof InventoryTypeArr)[number] | undefined;
