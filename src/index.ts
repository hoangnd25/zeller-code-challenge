import { Checkout } from './checkout';

const execute = () => {
  const co = new Checkout();
  co.scan('atv');
  co.scan('atv');
  co.scan('atv');
  co.scan('vga');
  co.debug();
};

execute();
