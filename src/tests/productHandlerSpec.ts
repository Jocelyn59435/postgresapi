import supertest from 'supertest';
import app from '../server';
import { ProductStore } from '../models/product';

const request = supertest(app);

const store = new ProductStore();
describe('Product Handler', () => {
  beforeAll(function () {
    spyOn(store, 'index').and.returnValue(
      Promise.resolve([
        {
          id: 5,
          product_name: 'Nudie Nothing But Aloha Blend 400ml',
          product_price: 3,
          product_category: 'Drink',
        },
        {
          id: 10,
          product_name: 'Perfection Chinese Wombok Baby whole each',
          product_price: 3,
          product_category: 'Veggie',
        },
        {
          id: 15,
          product_name: 'Nestle Milo Cereal 700g',
          product_price: 7,
          product_category: 'Food',
        },
        {
          id: 16,
          product_name: 'Lindt Les Grandes Dark Hazelnut 150g',
          product_price: 5,
          product_category: 'Snack',
        },
      ])
    );

    spyOn(store, 'show').and.returnValue(
      Promise.resolve({
        id: 22,
        product_name: 'Belgian Chocolate Layer Cake 170g',
        product_price: 6,
        product_category: 'Backery',
      })
    );

    spyOn(store, 'create').and.returnValue(
      Promise.resolve({
        id: 22,
        product_name: 'Belgian Chocolate Layer Cake 170g',
        product_price: 6,
        product_category: 'Backery',
      })
    );

    spyOn(store, 'delete').and.returnValue(
      Promise.resolve('Product 22 is deleted.')
    );
  });

  it('index route should return a list of items', async (done) => {
    const response = await request.get('/products');
    const expectedResponse = [
      {
        id: 5,
        product_name: 'Nudie Nothing But Aloha Blend 400ml',
        product_price: 3,
        product_category: 'Drink',
      },
      {
        id: 10,
        product_name: 'Perfection Chinese Wombok Baby whole each',
        product_price: 3,
        product_category: 'Veggie',
      },
      {
        id: 15,
        product_name: 'Nestle Milo Cereal 700g',
        product_price: 7,
        product_category: 'Food',
      },
      {
        id: 16,
        product_name: 'Lindt Les Grandes Dark Hazelnut 150g',
        product_price: 5,
        product_category: 'Snack',
      },
    ];
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
    done();
  });
  //   it('show method should return a product record', async () => {
  //     const result = await store.show('22');
  //     expect(store.show).toHaveBeenCalledWith('22');
  //     expect(result).toBeDefined;
  //   });
  //   it('create method should return an add product record', async () => {
  //     const result = await store.create({
  //       id: 22,
  //       product_name: 'Belgian Chocolate Layer Cake 170g',
  //       product_price: 6,
  //       product_category: 'Backery',
  //     });
  //     expect(result).toBeDefined;
  //   });
  //   it('detele method should return an success message', async () => {
  //     const result = await store.delete('22');
  //     expect(result).toBe('Product 22 is deleted.');
  //   });
});
