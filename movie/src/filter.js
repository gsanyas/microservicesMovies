exports.checkRights = (req, res, next) => {
    if (req.headers.rights === 3) {
        next();
    } else {
        res.sendStatus(401);
    }
};
