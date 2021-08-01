import { Checkout } from './checkout';
import { Promotion } from './models/promotion';
import { OrderItemDiscountAction } from './models/promotion/action/orderItemDiscountAction';
import { OrderItemQuantityRule } from './models/promotion/rule/orderItemQuatityRule';
import { OrderItemSkuRule } from './models/promotion/rule/orderItemSkuRule';
import { getProductBySku } from './repositories/productRepository';

describe('checkout', () => {
  let co: Checkout;

  beforeEach(() => {
    const threeForTwoAtvPromotion = new Promotion({
      id: '3for2Atv',
      rules: [
        new OrderItemSkuRule({ sku: 'atv' }),
        new OrderItemQuantityRule({ quantity: 3, operator: 'gte' }),
      ],
      actions: [
        // apply 1/3 discount for every 3 items
        new OrderItemDiscountAction({
          percentage: 1 / 3,
          everyNthItem: 3,
        }),
      ],
    });

    const bulkIpadPromotion = new Promotion({
      id: 'bulkIpad',
      rules: [
        new OrderItemSkuRule({ sku: 'ipd' }),
        new OrderItemQuantityRule({ quantity: 4, operator: 'gte' }),
      ],
      actions: [
        // discount $50.00 per item
        new OrderItemDiscountAction({
          amount: 5000,
          perItem: true,
        }),
      ],
    });

    co = new Checkout({
      promotions: [threeForTwoAtvPromotion, bulkIpadPromotion],
    });
  });

  it('should handle first test case', () => {
    co.scan('atv');
    co.scan('atv');
    co.scan('atv');
    co.scan('vga');
    expect(co.total()).toEqual(24900);
  });

  it('should handle second test case', () => {
    co.scan('atv');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('atv');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('ipd');
    expect(co.total()).toEqual(271895);
  });

  it('should handle 3 for 2 promotion with 5 items', () => {
    co.scan('atv');
    co.scan('atv');
    co.scan('atv');
    co.scan('atv');
    co.scan('atv');

    const atvPrice = getProductBySku('atv')?.price || 0;
    // should charge 4 items
    expect(co.total()).toEqual(atvPrice * 4);
  });
});
