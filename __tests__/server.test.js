import request from 'supertest';
import expect from 'expect.js';
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js"
dotenv.config();

beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
    await mongoose.connection.close();
});

describe("Probar la ruta Usuarios", () => {
    it("Debería responder al método POST 400", async () => {
        const res = await request(app).post("/api/usuarios/login")
        expect(res.statusCode).to.be(400);
    });
    it("Debería responder al método POST 200 y devolver json", async () => {
        const res = await request(app).post("/api/usuarios/login").send({
            email: "jose@hurtado.com",
            password: '123456',
        });
        expect(res.type).to.be('application/json');
        expect(res.statusCode).to.be(200);
        expect(res.body.email).to.be('jose@hurtado.com')
    });
});
