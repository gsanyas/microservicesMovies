import express from "express"

const checkRights = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (req.headers.rights === "2") { // service admin rights
        next()
    } else {
        res.sendStatus(401)
    }
}

export { checkRights }
