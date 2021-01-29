const app = require("./app")
const config = require("../config.json")

app.listen(config.port, () => {
    console.log("Server started !")
})
