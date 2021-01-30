import axios from "axios"
import express from "express"

const checkToken = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if ("token" in req.headers) {
        const auth = req.headers.token
        const cryptoURI = process.env.CRYPTO_COMPONENT_URI + "/decryptUser"
        try {
            const response = await axios.put(cryptoURI, { token: auth })
            if (response.status === 200) {
                const user = response.data
                try {
                    req.headers.id = user.id
                    req.headers.rights = user.rights
                    next()
                } catch (error) {
                    res.status(401).send("Incorrect token value")
                }
            } else {
                res.status(502).send("Error while decrypting the token")
            }
        } catch (error) {
            res.status(502).send("Error in cryptomodule: " + error.message)
        }
    } else {
        res.status(401).send(
            "An authentication token must be present in the request cookie named 'auth'"
        )
    }
}

export { checkToken }
