import { AdjustableInterface, AdjustmentInterface } from '../interfaces/adjustment';
import { OrderInterface, OrderItemInterface } from '../interfaces/order';
import { ProductInterface } from '../interfaces/product';
import { PromotionSubjectInterface } from '../interfaces/promotion';

export class Order implements OrderInterface {
  items: OrderItemInterface[];

  constructor() {
    this.items = [];
  }

  getItems = (): OrderItemInterface[] => {
    return this.items;
  };

  addItem = (item: OrderItemInterface): void => {
    this.items.push(item);
  };
}

interface OrderItemConstructorArgs extends Required<OrderItemInterface> {
  product: ProductInterface;
}

export class OrderItem
  implements OrderItemInterface, AdjustableInterface, PromotionSubjectInterface
{
  adjustments: Record<string, AdjustmentInterface[]>;
  price: number;
  sku: string;
  quantity: number;
  [x: string]: unknown;

  constructor(initialValues: OrderItemConstructorArgs) {
    this.adjustments = {};
    this.price = initialValues.price;
    this.sku = initialValues.sku;
    this.quantity = initialValues.quantity;
  }

  getAdjustments = (_: string) => {
    return {};
  };

  addAdjustment = (adjustment: AdjustmentInterface): void => {
    console.log(adjustment); // eslint-disable-line
  };

  removeAdjustment = (adjustment: AdjustmentInterface): void => {
    console.log(adjustment); // eslint-disable-line
  };
}
