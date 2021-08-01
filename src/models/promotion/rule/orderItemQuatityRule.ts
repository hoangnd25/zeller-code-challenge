import { PromotionInterface, PromotionRuleInterface } from '../../../interfaces/promotion';

interface Config extends Record<string, unknown> {
  quantity?: number;
  operator?: 'eq' | 'gt' | 'lt' | 'gte' | 'lte';
}

export class OrderItemQuantityRule implements PromotionRuleInterface {
  type = OrderItemQuantityRule.name;
  configuration: Required<Config>;
  promotion?: PromotionInterface | undefined;

  constructor({ quantity, operator }: Config) {
    if (typeof quantity !== 'number') {
      throw new Error('Invalid quantity');
    }

    this.configuration = {
      quantity,
      operator: operator || 'eq',
    };
  }

  isApplicable = (subject: Record<string, unknown>): boolean => {
    const subjectQuantity = typeof subject === 'object' ? subject?.quantity : null;
    if (typeof subjectQuantity !== 'number') {
      return false;
    }

    switch (this.configuration.operator) {
      case 'eq':
        return subjectQuantity === this.configuration.quantity;
      case 'lt':
        return subjectQuantity < this.configuration.quantity;
      case 'gt':
        return subjectQuantity > this.configuration.quantity;
      case 'lte':
        return subjectQuantity <= this.configuration.quantity;
      case 'gte':
        return subjectQuantity >= this.configuration.quantity;
      default:
        return false;
    }
  };
}
