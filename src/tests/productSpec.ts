import { Product, ProductStore } from '../models/product';

const store = new ProductStore();

describe('Product Model', () => {
  it('index method should return a list of items', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
  it('show method should return a product record', async () => {
    const result = await store.show('1');
    expect(result).toBeDefined;
  });
  it('create method should return an add product record', async () => {
    const result = await store.create({
      id: 22,
      product_name: 'Belgian Chocolate Layer Cake 170g',
      product_price: 6,
      product_category: 'Backery',
    });
    expect(result).toBeDefined;
  });
  it('detele method should return an success message', async () => {
    const result = await store.delete('22');
    expect(result).toBe('Product 22 is deleted.');
  });
});
