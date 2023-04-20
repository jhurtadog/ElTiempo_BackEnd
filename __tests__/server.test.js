import request from 'supertest';
import express from 'express';

const app = express();

app.post('/api/usuarios/login', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.json({
        email: "jose@hurtado.com",
        password: "123456"
    });
});

describe('POST /usuarios/login', function () {
    it('responde con 200', function () {
        return request(app)
            .post('/api/usuarios/login')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(function(res) {
                res.body.email = 'jose@hurtado.com';
                res.body.password = '123456';
              })
    });
});
