import request from "supertest"
import { app } from "./app"
import users from "./data/users.json"
import { createUser, isUser, User } from "./model"
import { copyObject } from "./utils"

let savedUsers: User[]
let savedId: number
let savedArchive: User[]
const saveUsers = () => {
    savedUsers = copyObject(users.userList)
}
const restoreUsers = () => {
    users.userList = copyObject(savedUsers)
}
const saveId = () => {
    savedId = users.current_id
}
const restoreId = () => {
    users.current_id = savedId
}
const saveArchive = () => {
    savedArchive = copyObject(users.archive)
}
const restoreArchive = () => {
    users.archive = copyObject(savedArchive)
}
const save = () => {
    saveUsers()
    saveId()
    saveArchive()
}
const restore = () => {
    restoreUsers()
    restoreId()
    restoreArchive()
}

const validConfig = { Accept: "application/json", rights: "2" }

describe("POST /add", () => {
    beforeEach(save)
    afterEach(restore)
    test("It should return a 401 error without the right authorizations", async () => {
        await request(app)
            .post("/add")
            .set({ Accept: "application/json" })
            .send({ uselessField: "uselessValue" })
            .expect(401)
    })
    test("It should return a 404 status when no user field in body", async () => {
        await request(app)
            .post("/add")
            .set(validConfig)
            .send({ uselessField: "uselessValue" })
            .expect(404)
    })
    test("It should return a 415 error status when not good user type", async () => {
        await request(app)
            .post("/add")
            .set(validConfig)
            .send({ user: { address: "testAdd", password: "testAddPassword" } })
            .expect(415)
    })
    test("It should return a 201 created status with a user when everything is correct", async () => {
        await request(app)
            .post("/add")
            .set(validConfig)
            .send({
                user: {
                    address: "testAdd",
                    password: "testAddPass",
                    rights: "1",
                },
            })
            .expect(201)
    })
})

describe("GET /find/:title", () => {
    beforeEach(() => {
        save()
        createUser({
            title: "testFindTitle",
            director: "testFindDirector",
            genre: "testFindGenre",
        })
    })
    afterEach(restore)
    test("It should return a 401 error without the right authorization", async () => {
        await request(app)
            .get("/find/testFindTitle")
            .set({ Accept: "application/json" })
            .expect(401)
    })
    test("It should return a movie", async () => {
        await request(app)
            .get("/find/testFindTitle")
            .set(validConfig)
            .expect(200)
            .then((result) => expect(isUser(result.body)).toBe(true))
    })
    test("It should return a 404 error when it cannot find the movie", async () => {
        await request(app)
            .get("/find/testWrongTitle")
            .set(validConfig)
            .expect(404)
    })
})

let tempUser: User

describe("POST /archive/:id", () => {
    beforeEach(() => {
        save()
        tempUser = createUser({
            address: "testArchiveAddress",
            password: "testArchivePassword",
            rights: "1",
        })
    })
    afterEach(restore)
    test("It should return a 401 error without the right authorization", async () => {
        await request(app)
            .post("/archive/" + tempUser.id)
            .set({ Accept: "application/json" })
            .expect(401)
    })
    test("It should return a 415 error with the wrong parameter", async () => {
        await request(app)
            .post("/archive/badParam")
            .set(validConfig)
            .expect(415)
    })
    test("It should return a 304 error if the user does not exist", async () => {
        await request(app).post("/archive/1000").set(validConfig).expect(304)
    })
    test("It should archive the user and return a 204 success if everything is correct", async () => {
        await request(app)
            .post("/archive/" + tempUser.id)
            .set(validConfig)
            .expect(204)
    })
})

describe("GET /get_user/:id", () => {
    beforeEach(() => {
        save()
        tempUser = createUser({
            address: "testGetAddress",
            password: "testGetPassword",
            rights: "1",
        })
    })
    afterEach(restore)
    test("It should return a 415 error with the wrong parameter", async () => {
        await request(app)
            .get("/get_user/badParam")
            .set(validConfig)
            .expect(415)
    })
    test("It should return a 404 error if the user does not exist", async () => {
        await request(app).get("/get_user/1000").set(validConfig).expect(404)
    })
    test("It should return the user if everything is correct", async () => {
        await request(app)
            .get("/get_user/" + tempUser.id)
            .set(validConfig)
            .expect(200)
            .then((result) => expect(result.body).toEqual(tempUser))
    })
})
