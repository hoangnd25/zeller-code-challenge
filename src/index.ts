import { Checkout } from './checkout';
import { OrderItemQuantityRule } from './models/promotion/rule/orderItemQuatityRule';
import { OrderItemSkuRule } from './models/promotion/rule/orderItemSkuRule';

const threeForTwoAtvPromotion = {
  rules: {
    atv: new OrderItemSkuRule({ sku: 'atv' }),
    quantity: new OrderItemQuantityRule({ quantity: 3, operator: 'gte' }),
  },
  actions: {},
};

const bulkIpadPromotion = {
  rules: {
    ipd: new OrderItemSkuRule({ sku: 'ipd' }),
    quantity: new OrderItemQuantityRule({ quantity: 4, operator: 'gte' }),
  },
  actions: {},
};

const co = new Checkout({
  promotions: [threeForTwoAtvPromotion, bulkIpadPromotion],
});

const execute = () => {
  co.scan('atv');
  co.scan('atv');
  co.scan('atv');
  co.scan('vga');
  co.debug();
};

execute();
