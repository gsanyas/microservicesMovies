const app = require("./app");
const config = require("../config.json");

app.listen(process.env.EXPRESS_PORT, () => {
    console.log("Server started !");
});
