import { PromotionInterface, PromotionRuleInterface } from '../../../interfaces/promotion';

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

  isApplicable = (subject: Record<string, unknown>): boolean => {
    const subjectSku = typeof subject === 'object' ? subject?.sku : null;
    if (typeof subjectSku !== 'string') {
      return false;
    }

    return subjectSku === this.configuration.sku;
  };
}
