import dummy_data from "../../data/dummy_inventory_data.json";
import { IInventoryData, InventoryType } from "../app/domain/IInventoryData";

class DummyInventoryRepository {
  private inventoryData = new Map<string, IInventoryData>();

  public constructor() {
    this.init();
  }

  private init() {
    dummy_data.forEach((inventory) => {
      this.inventoryData.set(inventory.id, {
        id: inventory.id,
        type: inventory.type as InventoryType,
        date: inventory.date,
        unit: inventory.unit,
        quantity: inventory.quantity,
        price: inventory.price,
        inventory: inventory.inventory,
      });
    });
  }

  public create(inventory: IInventoryData): IInventoryData {
    inventory.id = this.nextId();
    this.inventoryData.set(inventory.id, inventory);
    return inventory;
  }

  public getAll(): IInventoryData[] {
    return Array.from(this.inventoryData.values());
  }

  public getById(id: string): IInventoryData | undefined {
    return this.inventoryData.get(id);
  }

  public delete(id: string): void {
    this.inventoryData.delete(id);
  }

  public get size(): number {
    return this.inventoryData.size;
  }

  private nextId(): string {
    return (this.inventoryData.size + 1).toString();
  }
}

export const dummyInventoryRepository = new DummyInventoryRepository();
