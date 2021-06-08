"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const store = new user_1.UserStore();
describe('User Model', () => {
    beforeAll(function () {
        spyOn(store, 'index').and.returnValue(Promise.resolve([
            {
                id: 3,
                username: 'Sehun',
                firstname: 'Yishan',
                lastname: 'Zhang',
            },
            {
                id: 4,
                username: 'Jocelyn',
                firstname: 'Xinxin',
                lastname: 'Huang',
            },
            {
                id: 20,
                username: 'Thriller',
                firstname: 'Michael',
                lastname: 'Jackson',
            },
        ]));
        spyOn(store, 'show').and.returnValue(Promise.resolve({
            id: 20,
            username: 'Thriller',
            firstname: 'Michael',
            lastname: 'Jackson',
        }));
        spyOn(store, 'create').and.returnValue(Promise.resolve({
            id: 20,
            username: 'Thriller',
            firstname: 'Michael',
            lastname: 'Jackson',
        }));
        spyOn(store, 'authenticate').and.returnValue(Promise.resolve('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfcGFzc3dvcmQiOiIkMmIkMTAkNHNYMThsN0lZQVd4M0tJSHNuNE5EdTRaZWlEdHhqeWYxTzQuVDBjVkxtRTlwSlJBVXhRL2kifSwiaWF0IjoxNjIyOTQ0MDY4fQ.TABGQ1xRsbUmCeCRBh3rXAYLFJWvYwbaM14rYfT7kRg'));
    });
    it('index method should return a list of items', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
    it('show method should return a record of the user', async () => {
        const result = await store.show('20');
        expect(result).toBeDefined;
    });
    it('create method should return an added user record', async () => {
        const result = await store.create({
            id: 20,
            username: 'Thriller',
            firstname: 'Michael',
            lastname: 'Jackson',
            user_password: '234',
        });
        expect(result).toBeDefined;
    });
    it('authenticate method should return the password when user input is valid', async () => {
        const result = await store.authenticate('Jocelyn', '234');
        expect(result).toBeDefined;
    });
});
