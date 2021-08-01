export interface PromotionInterface {
  rules: Record<string, PromotionRuleInterface>;
  actions: Record<string, PromotionActionInterface>;
}

export type PromotionRuleInterface = PromotionElementInterface;
export type PromotionActionInterface = PromotionElementInterface;

export interface PromotionElementInterface {
  type?: string;
  configuration: Record<string, unknown>;
  promotion?: PromotionInterface;
}
