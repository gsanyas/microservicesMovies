import users from "./data/users.json"

interface UserAttributes {
    address: string
    password: string
    rights: string
}

interface User extends UserAttributes {
    id: number
}

function hasUserAttributes(object: object): boolean {
    if ("address" in object && "password" in object && "rights" in object) {
        const user = object as UserAttributes
        return (
            typeof user.address === "string" &&
            typeof user.password === "string" &&
            typeof user.rights === "string"
        )
    } else {
        return false
    }
}

function isUser(object: object): boolean {
    if (hasUserAttributes(object) && "id" in object) {
        const user = object as User
        return typeof user.id === "number"
    } else {
        return false
    }
}

function equalAttributes(u1: UserAttributes, u2: UserAttributes): boolean {
    return (
        hasUserAttributes(u1) &&
        hasUserAttributes(u2) &&
        u1.address === u2.address &&
        u1.password === u2.password &&
        u1.rights === u2.rights
    )
}

function equalUser(u1: User, u2: User): boolean {
    return (
        equalAttributes(u1, u2) && isUser(u1) && isUser(u2) && u1.id === u2.id
    )
}

function createUser(userAttributes: UserAttributes): User {
    if (users.userList.some((u: User) => equalAttributes(userAttributes, u))) {
        return undefined
    }
    const user: User = userAttributes as User
    user.id = users.current_id
    users.current_id = user.id + 1
    users.userList.push(user)
    return user
}

function findByAddress(address: string): User {
    return users.userList.find((u: User) => u.address === address)
}

function toUserAttributes(user: object): UserAttributes {
    if (hasUserAttributes(user)) {
        return user as UserAttributes
    } else {
        return undefined
    }
}

function findById(id: number): User {
    return users.userList.find((u: User) => u.id === id)
}

function deleteUser(userId: number): boolean {
    const user: User = findById(userId)
    if (user) {
        users.userList = users.userList.filter((u: User) => u.id !== user.id)
        users.archive.push(user)
        return true
    } else {
        return false
    }
}

export {
    User,
    UserAttributes,
    isUser,
    toUserAttributes,
    createUser,
    deleteUser,
    equalUser,
    findById,
    findByAddress,
    hasUserAttributes,
}
