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

  get total(): number {
    return this.items.reduce((carry, item) => {
      return carry + item.adjustedTotal;
    }, 0);
  }
}

interface OrderItemConstructorArgs
  extends Required<Omit<OrderItemInterface, 'total' | 'adjustedTotal'>> {
  product: ProductInterface;
}

export class OrderItem
  implements OrderItemInterface, AdjustableInterface, PromotionSubjectInterface
{
  adjustments: Record<string, AdjustmentInterface>;
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

  get total(): number {
    return this.price * this.quantity;
  }

  get adjustedTotal(): number {
    const adjustedAmount = Object.values(this.adjustments).reduce((carry, adjustment) => {
      return carry + adjustment.amount;
    }, 0);
    return this.total + adjustedAmount;
  }

  getAdjustment = (reference: string): AdjustmentInterface | undefined => {
    return this.adjustments[reference] || undefined;
  };

  addAdjustment = (adjustment: AdjustmentInterface): void => {
    this.adjustments[adjustment.reference] = adjustment;
  };

  removeAdjustment = (reference: string): void => {
    delete this.adjustments[reference];
  };
}
