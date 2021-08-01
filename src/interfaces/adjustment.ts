export interface AdjustmentInterface {
  type: string;
  amount: number;
  adjustableEntity: AdjustableInterface;
}

export interface AdjustableInterface {
  getAdjustments: (type: string) => Record<string, AdjustableInterface>;
  addAdjustment: (adjustment: AdjustmentInterface) => void;
  removeAdjustment: (adjustment: AdjustmentInterface) => void;
}
