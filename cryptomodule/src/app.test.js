const request = require("supertest");
const app = require("./app");
const { createToken } = require("./tokenService");

const user = {
    id: 50,
    rights: 3,
};

describe("Test the encryption path", () => {
    test("It should response the GET method", async () => {
        const response = await request(app).put("/encryptUser").send(user);
        expect(response.statusCode).toBe(200);
    });
});

describe("Test the decryption path", () => {
    test("It should response the GET method", async () => {
        const token = await createToken(user);
        const response = await request(app).put("/decryptUser").send({token: token});
        expect(response.statusCode).toBe(200);
    });
});
