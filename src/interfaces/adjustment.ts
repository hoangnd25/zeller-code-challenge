export interface AdjustmentInterface {
  reference: string;
  amount: number;
}

export interface AdjustableInterface {
  getAdjustment: (reference: string) => AdjustmentInterface | undefined;
  addAdjustment: (adjustment: AdjustmentInterface) => void;
  removeAdjustment: (reference: string) => void;
}
