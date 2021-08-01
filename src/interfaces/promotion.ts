export interface PromotionInterface {
  id: string;
  rules: PromotionRuleInterface[];
  actions: PromotionActionInterface[];
}

export type PromotionRuleInterface = PromotionElementInterface & {
  isApplicable: (subject: unknown) => boolean;
};

export type PromotionActionInterface = PromotionElementInterface & {
  apply: (subject: unknown) => void;
};

export interface PromotionElementInterface {
  type: string;
  configuration: Record<string, unknown>;
  promotion?: PromotionInterface;
}

export type PromotionSubjectInterface = Record<string, unknown>;
