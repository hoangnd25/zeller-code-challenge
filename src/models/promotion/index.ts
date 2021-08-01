import {
  PromotionRuleInterface,
  PromotionActionInterface,
  PromotionInterface,
} from '../../interfaces/promotion';

export class Promotion implements PromotionInterface {
  rules: Record<string, PromotionRuleInterface>;
  actions: Record<string, PromotionActionInterface>;

  constructor() {
    this.rules = {};
    this.actions = {};
  }
}
