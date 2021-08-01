import { PromotionInterface, PromotionActionInterface } from '../../../interfaces/promotion';
import { OrderItem } from '../../order';

interface Config extends Record<string, unknown> {
  amount?: number;
  perItem?: boolean;
  percentage?: number;
}

export class OrderItemDiscountAction implements PromotionActionInterface {
  type = OrderItemDiscountAction.name;
  configuration: Config;
  promotion?: PromotionInterface | undefined;

  constructor(config: Config) {
    if (!config.amount && !config.percentage) {
      throw new Error('Invalid config');
    }

    this.configuration = config;
  }

  apply = (subject: unknown): void => {
    if (!(subject instanceof OrderItem)) {
      return;
    }

    const reference = `${this.promotion?.id}#${this.type}`;
    const adjustment = subject.getAdjustment(reference);
    if (adjustment) {
      subject.removeAdjustment(reference);
    }

    if (this.configuration.amount) {
      if (this.configuration.perItem) {
        subject.addAdjustment({
          reference,
          amount: -this.configuration.amount * subject.quantity,
        });
      } else {
        subject.addAdjustment({
          reference,
          amount: -this.configuration.amount,
        });
      }
    } else if (this.configuration.percentage) {
      subject.addAdjustment({
        reference,
        amount: -(subject.total * this.configuration.percentage),
      });
    }
  };
}
