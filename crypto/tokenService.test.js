const { expect } = require("@jest/globals");
const { createToken, readToken } = require("./tokenService");

const user = {
    id: 50,
    rights: 3,
};

describe("Test createToken", () => {
    test("It should not raise an error", async () => {
        const token = createToken(user);
        expect(token).not.toBeNull();
    });
});

describe("Test readToken", () => {
    test("It should not raise an error", async () => {
        const token = createToken(user);
        const result = readToken(token);
        expect(result).toBe(user);
    });
});
