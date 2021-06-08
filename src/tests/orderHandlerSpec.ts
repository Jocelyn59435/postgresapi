import supertest from 'supertest';
import app from '../server';
import { store } from '../handlers/orders';
import { Order } from '../models/order';

const request = supertest(app);
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3LCJmaXJzdG5hbWUiOiJaaXlpbiIsImxhc3RuYW1lIjoiWWFuZyIsInVzZXJfcGFzc3dvcmQiOiIkMmIkMTAkQXpUaU5ZYWR5U1dTOW5vOEVucGhULjJpSHJSNTQxWVNuQkhvakhVYTZvWUl0UmRjVnJrLy4ifSwiaWF0IjoxNjIyNzY5OTc5fQ.ewt1WaANXP2lhg3FCRr3XS3jeFDz3i4HaCK4eG3-zQ4';
const timeSample: Date = new Date();
const orderSample: Order = {
  id: 1,
  order_status: 'complete',
  user_id: '2',
};

describe('Order Handler', () => {
  beforeAll(function () {
    spyOn(store, 'create').and.returnValue(
      Promise.resolve({
        id: 1,
        order_status: 'complete',
        order_time: timeSample,
        user_id: '2',
      })
    );

    spyOn(store, 'completedOrdersByUser').and.returnValue(
      Promise.resolve([
        {
          id: 1,
          order_status: 'complete',
          order_time: timeSample,
          user_id: '2',
        },
        {
          id: 2,
          order_status: 'complete',
          order_time: timeSample,
          user_id: '2',
        },
      ])
    );

    spyOn(store, 'showByUser').and.returnValue(
      Promise.resolve([
        {
          id: 1,
          order_status: 'complete',
          order_time: timeSample,
          user_id: '2',
        },
        {
          id: 2,
          order_status: 'complete',
          order_time: timeSample,
          user_id: '2',
        },
      ])
    );

    spyOn(store, 'addProduct').and.returnValue(
      Promise.resolve({
        id: 15,
        quantity: 2,
        order_id: 7,
        product_id: 3,
      })
    );
  });

  it('create route should return an added order record', async () => {
    const response = await request
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(orderSample);
    expect(store.create).toHaveBeenCalledWith(orderSample);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(orderSample);
  });

  it('completedOrdersByUser route should return a list of completed order according to the input user id', async () => {
    const response = await request
      .get('/completedorders/2')
      .set('Authorization', `Bearer ${token}`);
    const expectedResponse = [
      {
        id: 1,
        order_status: 'complete',
        order_time: timeSample,
        user_id: '2',
      },
      {
        id: 2,
        order_status: 'complete',
        order_time: timeSample,
        user_id: '2',
      },
    ];
    expect(store.completedOrdersByUser).toHaveBeenCalledWith('2');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });

  it('showByUser route should show a list of order records according to input user id', async () => {
    const response = await request
      .get('/orders/users/2')
      .set('Authorization', `Bearer ${token}`);
    const expectedResponse = [
      {
        id: 1,
        order_status: 'complete',
        order_time: timeSample,
        user_id: '2',
      },
      {
        id: 2,
        order_status: 'complete',
        order_time: timeSample,
        user_id: '2',
      },
    ];
    expect(store.completedOrdersByUser).toHaveBeenCalledWith('2');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });

  it('add product method should return an added record', async () => {
    const response = await request
      .post('/orders/7/products')
      .send({
        product_id: '3',
        quantity: 2,
      })
      .set('Authorization', `Bearer ${token}`);
    const expectedResponse = {
      id: 15,
      quantity: 2,
      order_id: 7,
      product_id: 3,
    };
    expect(store.addProduct).toHaveBeenCalledWith(2, '7', '3');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });
});
