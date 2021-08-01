import { Order, OrderItem } from './models/order';
import { Promotion } from './models/promotion';
import { getProductBySku } from './repositories/productRepository';

interface CheckoutConstructorArgs {
  promotions?: Promotion[];
}
export class Checkout {
  private order: Order;
  private promotions: Promotion[];

  constructor(args?: CheckoutConstructorArgs) {
    this.order = new Order();
    this.promotions = args?.promotions || [];
  }

  scan = (sku: string): void => {
    const product = getProductBySku(sku);
    if (!product) {
      return;
    }

    let existingItem = this.order.getItems().find(existingItem => existingItem.sku === product.sku);

    if (!existingItem) {
      const newItem = new OrderItem({
        product,
        sku: product.sku,
        price: product.price,
        quantity: 1,
      });
      this.order.addItem(newItem);

      existingItem = newItem;
    } else {
      existingItem.quantity++;
    }

    const applicablePromotion = this.promotions.filter(promotion =>
      Object.values(promotion.rules).every(rule => rule.isApplicable(existingItem as OrderItem)),
    );

    console.error(applicablePromotion);
  };

  debug = (): void => {
    console.log(this.order.items); // eslint-disable-line no-console
  };
}
