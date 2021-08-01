import { PromotionInterface, PromotionRuleInterface } from '../../../interfaces/promotion';
import { OrderItem } from '../../order';

interface Config extends Record<string, unknown> {
  sku?: string;
}

export class OrderItemSkuRule implements PromotionRuleInterface {
  type = OrderItemSkuRule.name;
  configuration: Required<Config>;
  promotion?: PromotionInterface | undefined;

  constructor(config: Config) {
    if (!config.sku) {
      throw new Error('Invalid SKU');
    }

    this.configuration = {
      sku: config.sku,
    };
  }

  isApplicable = (subject: unknown): boolean => {
    const subjectSku = subject instanceof OrderItem ? subject?.sku : null;
    if (typeof subjectSku !== 'string') {
      return false;
    }

    return subjectSku === this.configuration.sku;
  };
}
