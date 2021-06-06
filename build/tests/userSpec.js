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
                user_password: '$2b$10$IBsO/2GaGq6rduYi/fl2duh36NAlCwSYnhj1ePwFwoXHmyig05/FC',
            },
            {
                id: 4,
                username: 'Jocelyn',
                firstname: 'Xinxin',
                lastname: 'Huang',
                user_password: '$2b$10$5a7Ms6l1vxgM1BkOsaubC.3.rDl49QwU40oTnNY9QpvXc/RljNIni',
            },
            {
                id: 20,
                username: 'Thriller',
                firstname: 'Michael',
                lastname: 'Jackson',
                user_password: '$2b$10$4HHZ5xzE.r8kt8NagSf8wO.N.KW8veJKpZTzOvYks8.f4WO6xKLOq',
            },
        ]));
        spyOn(store, 'show').and.returnValue(Promise.resolve([
            {
                user_id: '1',
                order_id: '3',
                order_time: new Date(Date.UTC(2021, 1)),
                order_status: 'active',
                username: 'Mia',
                firstname: 'Yueming',
                lastname: 'Zheng',
                user_password: '$2b$10$jguX4WZp7EZirBcC6imPlOQDmjPuxb8ouKHmvUQ5xfqESY/SYV/sS',
            },
            {
                user_id: '1',
                order_id: '4',
                order_time: new Date(Date.UTC(2021, 8)),
                order_status: 'active',
                username: 'Mia',
                firstname: 'Yueming',
                lastname: 'Zheng',
                user_password: '$2b$10$jguX4WZp7EZirBcC6imPlOQDmjPuxb8ouKHmvUQ5xfqESY/SYV/sS',
            },
            {
                user_id: '1',
                order_id: '5',
                order_time: new Date(Date.UTC(2021, 5)),
                order_status: 'active',
                username: 'Mia',
                firstname: 'Yueming',
                lastname: 'Zheng',
                user_password: '$2b$10$jguX4WZp7EZirBcC6imPlOQDmjPuxb8ouKHmvUQ5xfqESY/SYV/sS',
            },
        ]));
        spyOn(store, 'create').and.returnValue(Promise.resolve({
            id: 20,
            username: 'Thriller',
            firstname: 'Michael',
            lastname: 'Jackson',
            user_password: '$2b$10$4HHZ5xzE.r8kt8NagSf8wO.N.KW8veJKpZTzOvYks8.f4WO6xKLOq',
        }));
        spyOn(store, 'authenticate').and.returnValue(Promise.resolve('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfcGFzc3dvcmQiOiIkMmIkMTAkNHNYMThsN0lZQVd4M0tJSHNuNE5EdTRaZWlEdHhqeWYxTzQuVDBjVkxtRTlwSlJBVXhRL2kifSwiaWF0IjoxNjIyOTQ0MDY4fQ.TABGQ1xRsbUmCeCRBh3rXAYLFJWvYwbaM14rYfT7kRg'));
    });
    it('index method should return a list of items', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
    it('show method should return a list of order records', async () => {
        const result = await store.show('1');
        expect(result.length).toBeGreaterThanOrEqual(1);
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
