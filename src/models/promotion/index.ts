import {
  PromotionRuleInterface,
  PromotionActionInterface,
  PromotionInterface,
} from '../../interfaces/promotion';

interface ConstructorArgs {
  id: string;
  rules?: PromotionRuleInterface[];
  actions?: PromotionActionInterface[];
}
export class Promotion implements PromotionInterface {
  id: string;
  rules: PromotionRuleInterface[];
  actions: PromotionActionInterface[];

  constructor(args: ConstructorArgs) {
    this.id = args.id;

    this.rules =
      args.rules?.map(rule => {
        rule.promotion = this;
        return rule;
      }) || [];

    this.actions =
      args.actions?.map(rule => {
        rule.promotion = this;
        return rule;
      }) || [];
  }
}
