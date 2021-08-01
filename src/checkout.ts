import { Order, OrderItem } from './models/order';
import { getProductBySku } from './repositories/productRepository';

export class Checkout {
  private order: Order;

  constructor() {
    this.order = new Order();
  }

  scan = (sku: string): void => {
    const product = getProductBySku(sku);
    if (!product) {
      return;
    }

    const existingItem = this.order
      .getItems()
      .find(existingItem => existingItem.sku === product.sku);

    if (!existingItem) {
      this.order.addItem(
        new OrderItem({
          product,
          sku: product.sku,
          price: product.price,
          quantity: 1,
        }),
      );

      return;
    }

    existingItem.quantity++;
  };

  debug = (): void => {
    console.log(this.order.items); // eslint-disable-line no-console
  };
}
