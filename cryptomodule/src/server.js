const app = require("./app");

app.listen(process.env.EXPRESS_PORT, () => {
    console.log("Server started !");
});
