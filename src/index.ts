import { Checkout } from './checkout';
import { OrderItemQuantityRule } from './models/promotion/rule/orderItemQuatityRule';
import { OrderItemSkuRule } from './models/promotion/rule/orderItemSkuRule';

const execute = () => {
  const co = new Checkout({
    promotions: [
      {
        rules: {
          atv: new OrderItemSkuRule({ sku: 'atv' }),
          quantity: new OrderItemQuantityRule({ quantity: 3, operator: 'gte' }),
        },
        actions: {},
      },
    ],
  });
  co.scan('atv');
  co.scan('atv');
  co.scan('atv');
  co.scan('vga');
  co.debug();
};

execute();
