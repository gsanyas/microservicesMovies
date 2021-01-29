import {app}  from "./app"
import config from "../config.json"

app.listen(config.port, () => {
    console.log("Server started !")
})
