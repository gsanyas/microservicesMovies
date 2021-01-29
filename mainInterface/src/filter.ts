import axios from "axios"
import express from "express"

const checkToken = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (req.cookies.auth) {
        const auth = req.cookies.auth
        const cryptoURI =
            process.env.CRYPTO_COMPONENT_URI + "/decryptUser/" + auth
        const response = await axios.get(cryptoURI)
        if (response.status === 200) {
            const userString = response.data
            try {
                const user = JSON.parse(userString)
                req.headers.id = user.id
                req.headers.rights = user.rights
                next()
            } catch (error) {
                res.status(401).send("Incorrect token value")
            }
        } else {
            res.status(502).send("Error while decrypting the token")
        }
    } else {
        res.status(401).send(
            "An authentication token must be present in the request cookie named 'auth'"
        )
    }
}

export { checkToken }
