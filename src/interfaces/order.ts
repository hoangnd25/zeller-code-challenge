export interface OrderInterface {
  addItem: (item: OrderItemInterface) => void;
  getItems: () => OrderItemInterface[];
}

export interface OrderItemInterface {
  sku: string;
  price: number;
  quantity: number;
  readonly total: number;
  readonly adjustedTotal: number;
}
