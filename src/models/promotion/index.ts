import { PromotionElementInterface, PromotionInterface } from '../../interfaces/promotion';

export class Promotion implements PromotionInterface {
  rules: Record<string, PromotionElementInterface>;
  actions: Record<string, PromotionElementInterface>;

  constructor() {
    this.rules = {};
    this.actions = {};
  }
}
