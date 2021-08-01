import { ProductInterface } from '../interfaces/product';

export class Product implements ProductInterface {
  sku: string;
  name: string;
  price: number;

  constructor(initialValues: Required<ProductInterface>) {
    this.sku = initialValues.sku;
    this.name = initialValues.name;
    this.price = initialValues.price;
  }
}
