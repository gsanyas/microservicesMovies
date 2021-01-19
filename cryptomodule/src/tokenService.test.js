const { expect } = require("@jest/globals");
const { createToken, readToken } = require("./tokenService");

const user = {
    id: 50,
    rights: 3,
};

describe("Test createToken", () => {
    test("It should not raise an error", async () => {
        await createToken(user);
        expect(createToken).toHaveBeenCalled;
    });
});

describe("Test readToken", () => {
    test("It should be equal", async () => {
        const token = await createToken(user);
        const userResult = await readToken(token);
        expect(userResult['id']).toEqual(50);
        expect(userResult['rights']).toEqual(3);
    });
});
