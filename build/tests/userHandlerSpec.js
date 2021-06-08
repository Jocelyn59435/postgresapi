"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const users_1 = require("../handlers/users");
const request = supertest_1.default(server_1.default);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo3LCJmaXJzdG5hbWUiOiJaaXlpbiIsImxhc3RuYW1lIjoiWWFuZyIsInVzZXJfcGFzc3dvcmQiOiIkMmIkMTAkQXpUaU5ZYWR5U1dTOW5vOEVucGhULjJpSHJSNTQxWVNuQkhvakhVYTZvWUl0UmRjVnJrLy4ifSwiaWF0IjoxNjIyNzY5OTc5fQ.ewt1WaANXP2lhg3FCRr3XS3jeFDz3i4HaCK4eG3-zQ4';
const userSample = {
    id: 3,
    username: 'Sehun',
    firstname: 'Yishan',
    lastname: 'Zhang',
    user_password: '$2b$10$IBsO/2GaGq6rduYi/fl2duh36NAlCwSYnhj1ePwFwoXHmyig05/FC',
};
const timeSample = new Date();
describe('User Handler', () => {
    beforeAll(function () {
        spyOn(users_1.store, 'index').and.returnValue(Promise.resolve([
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
        spyOn(users_1.store, 'show').and.returnValue(Promise.resolve([
            {
                user_id: '1',
                order_id: '3',
                order_time: timeSample,
                order_status: 'active',
                username: 'Mia',
                firstname: 'Yueming',
                lastname: 'Zheng',
                user_password: '$2b$10$jguX4WZp7EZirBcC6imPlOQDmjPuxb8ouKHmvUQ5xfqESY/SYV/sS',
            },
            {
                user_id: '1',
                order_id: '4',
                order_time: timeSample,
                order_status: 'active',
                username: 'Mia',
                firstname: 'Yueming',
                lastname: 'Zheng',
                user_password: '$2b$10$jguX4WZp7EZirBcC6imPlOQDmjPuxb8ouKHmvUQ5xfqESY/SYV/sS',
            },
            {
                user_id: '1',
                order_id: '5',
                order_time: timeSample,
                order_status: 'active',
                username: 'Mia',
                firstname: 'Yueming',
                lastname: 'Zheng',
                user_password: '$2b$10$jguX4WZp7EZirBcC6imPlOQDmjPuxb8ouKHmvUQ5xfqESY/SYV/sS',
            },
        ]));
        spyOn(users_1.store, 'create').and.returnValue(Promise.resolve(userSample));
        spyOn(users_1.store, 'authenticate').and.returnValue(Promise.resolve(token));
    });
    it('index route should return a list of users', async () => {
        const response = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`);
        const expectedResponse = [
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
        ];
        expect(users_1.store.index).toHaveBeenCalled;
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResponse);
    });
    it('show route should return records of userInfo and orderInfo by userId', async () => {
        const response = await request
            .get('/users/1')
            .set('Authorization', `Bearer ${token}`);
        const expectedResponse = [
            {
                user_id: '1',
                order_id: '3',
                order_time: timeSample,
                order_status: 'active',
                username: 'Mia',
                firstname: 'Yueming',
                lastname: 'Zheng',
                user_password: '$2b$10$jguX4WZp7EZirBcC6imPlOQDmjPuxb8ouKHmvUQ5xfqESY/SYV/sS',
            },
            {
                user_id: '1',
                order_id: '4',
                order_time: timeSample,
                order_status: 'active',
                username: 'Mia',
                firstname: 'Yueming',
                lastname: 'Zheng',
                user_password: '$2b$10$jguX4WZp7EZirBcC6imPlOQDmjPuxb8ouKHmvUQ5xfqESY/SYV/sS',
            },
            {
                user_id: '1',
                order_id: '5',
                order_time: timeSample,
                order_status: 'active',
                username: 'Mia',
                firstname: 'Yueming',
                lastname: 'Zheng',
                user_password: '$2b$10$jguX4WZp7EZirBcC6imPlOQDmjPuxb8ouKHmvUQ5xfqESY/SYV/sS',
            },
        ];
        expect(users_1.store.show).toHaveBeenCalledWith('1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResponse);
    });
    it('create route should return a token', async () => {
        const response = await request.post('/createuser').send(userSample);
        expect(users_1.store.create).toHaveBeenCalledWith(userSample);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(token);
    });
    it('authenticate route should return a successful reponse', async () => {
        const response = await request.post('/authenticate').send({
            username: 'Thriller',
            user_password: '234',
        });
        expect(users_1.store.authenticate).toHaveBeenCalledWith('Thriller', '234');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(token);
    });
});
