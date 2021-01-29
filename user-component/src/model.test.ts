import {
    toUserAttributes,
    createUser,
    deleteUser,
    equalUser,
    findById,
    findByAddress,
    hasUserAttributes,
    isUser,
    User,
    UserAttributes,
} from "./model"
import users from "./data/users.json"
import { copyObject } from "./utils"

const defaultUserList: User[] = copyObject(users.userList)
const defaultId: number = users.current_id
const defaultArchive: User[] = copyObject(users.archive)

let userAttributes: UserAttributes = {
    address: "TestAddress",
    password: "TestPassword",
    rights: "1",
}

const userFake: User = {
    address: "fakeAddress",
    password: "fakePassword",
    rights: "0",
    id: -1,
}

const userFake2: User = {
    address: "fakeAddress",
    password: "fakePassword",
    rights: "0",
    id: -2,
}

const userFake3: User = {
    address: "fakeAddress2",
    password: "fakePassword",
    rights: "0",
    id: -1,
}

const userFake4: User = {
    address: "fakeAddress",
    password: "fakePassword2",
    rights: "0",
    id: -1,
}

const userFake5: User = {
    address: "fakeAddress",
    password: "fakePassword",
    rights: "1",
    id: -1,
}

const resetData = () => {
    users.userList = copyObject(defaultUserList)
    users.current_id = defaultId
    users.archive = copyObject(defaultArchive)
}

const resetUserAttributes = () => {
    userAttributes = {
        address: "TestAddress",
        password: "TestPassword",
        rights: "1",
    }
}

const fullReset = () => {
    resetData()
    resetUserAttributes()
}

describe("CreateUser", () => {
    beforeEach(fullReset)
    afterEach(fullReset)
    test("It creates a user", () => {
        const length = users.userList.length
        const result = createUser(userAttributes)
        expect(result).toBeDefined()
        expect(result.address).toEqual(userAttributes.address)
        expect(result.password).toEqual(userAttributes.password)
        expect(result.rights).toEqual(userAttributes.rights)
        expect(result.id).toBeDefined()
        expect(users.userList.length).toBe(length + 1)
    })
    test("It returns undefined", () => {
        createUser(userAttributes)
        const length = users.userList.length
        const result = createUser(userAttributes)
        expect(result).toBeUndefined()
        expect(length).toBe(users.userList.length)
    })
})

describe("findByAddress", () => {
    beforeEach(fullReset)
    afterEach(fullReset)
    test("It returns undefined when a user does not exists", () => {
        const result = findByAddress(userAttributes.address)
        expect(result).toBeUndefined()
    })
    test("It returns a user when it exists", () => {
        createUser(userAttributes)
        const result = findByAddress(userAttributes.address)
        expect(result).toBeDefined()
        expect(result.address).toBe(userAttributes.address)
    })
})

describe("equalUser", () => {
    beforeEach(resetUserAttributes)
    afterEach(resetUserAttributes)
    test("It returns true when users are the same", () => {
        const result = equalUser(userFake, userFake)
        expect(result).toBe(true)
    })
    test("It returns false when users are different", () => {
        const result1 = equalUser(userFake, userFake2)
        expect(result1).toBe(false)
        const result2 = equalUser(userFake, userFake3)
        expect(result2).toBe(false)
        const result3 = equalUser(userFake, userFake4)
        expect(result3).toBe(false)
        const result4 = equalUser(userFake, userFake5)
        expect(result4).toBe(false)
    })
})

describe("findById", () => {
    beforeEach(fullReset)
    afterEach(fullReset)
    test("It finds a user", () => {
        const user = createUser(userAttributes)
        const result = findById(user.id)
        expect(user).toEqual(result)
    })
    test("It returns undefined when there is no user", () => {
        const result = findById(userFake.id)
        expect(result).toBeUndefined()
    })
})

describe("deleteUser", () => {
    beforeEach(fullReset)
    afterEach(fullReset)
    test("It deletes a user that exists", () => {
        const user = createUser(userAttributes)
        const lengthList = users.userList.length
        const lengthArchive = users.archive.length
        deleteUser(user.id)
        const inUserList = findById(user.id)
        expect(inUserList).toBeUndefined()
        const inArchive = users.archive.find((archivedUser: User) =>
            equalUser(archivedUser, user)
        )
        expect(inArchive).toBeDefined()
        expect(users.userList.length).toBe(lengthList - 1)
        expect(users.archive.length).toBe(lengthArchive + 1)
    })
    test("It does nothing when the user don't exist", () => {
        const lengthList = users.userList.length
        const lengthArchive = users.archive.length
        deleteUser(userFake.id)
        expect(users.userList.length).toBe(lengthList)
        expect(users.archive.length).toBe(lengthArchive)
    })
})

describe("isUser", () => {
    beforeAll(resetUserAttributes)
    test("It returns true if it is a user", () => {
        const result = isUser(userFake)
        expect(result).toBe(true)
    })
    test("It returns false if it is not a user", () => {
        const result = isUser(userAttributes)
        expect(result).toBe(false)
    })
})

describe("hasUserAttributes", () => {
    beforeAll(resetUserAttributes)
    test("It returns true if it is a userAttributes", () => {
        const result = hasUserAttributes(userAttributes)
        expect(result).toBe(true)
    })
    test("It returns false if it has not userAttributes", () => {
        const result1 = hasUserAttributes({
            address: "fakeAttributesAddress",
            password: "fakeAttributesPassword",
        })
        expect(result1).toBe(false)
        const result2 = hasUserAttributes({
            rights: "0",
            password: "fakeAttributesPassword",
        })
        expect(result2).toBe(false)
        const result3 = hasUserAttributes({
            address: "fakeAttributesAddress",
            rights: "0",
        })
        expect(result3).toBe(false)
    })
})

describe("toUserAttributes", () => {
    test("It returns a userAttributes if the correct attributes are given", () => {
        const result = toUserAttributes({
            address: "convertAddress",
            password: "convertPassword",
            rights: "1",
        })
        expect(hasUserAttributes(result)).toBe(true)
    })
    test("It returns undefined if the attributes are incorrect", () => {
        const result1 = toUserAttributes({
            address: "fakeAttributesAddress",
            password: "fakeAttributesPassword",
        })
        expect(result1).toBeUndefined()
        const result2 = toUserAttributes({
            rights: "0",
            password: "fakeAttributesPassword",
        })
        expect(result2).toBeUndefined()
        const result3 = toUserAttributes({
            address: "fakeAttributesAddress",
            rights: "0",
        })
        expect(result3).toBeUndefined()
    })
})
