import { Product } from '../models/product';

const products = [
  new Product({
    sku: 'ipd',
    name: 'Super iPad',
    price: 54999,
  }),
  new Product({
    sku: 'mbp',
    name: 'MacBook Pro',
    price: 139999,
  }),
  new Product({
    sku: 'atv',
    name: 'Apple TV',
    price: 10950,
  }),
  new Product({
    sku: 'vga',
    name: 'VGA adapter',
    price: 3000,
  }),
];

export const getProductBySku = (sku: string): Product | undefined =>
  products.find(product => product.sku === sku);
