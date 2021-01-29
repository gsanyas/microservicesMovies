import axios from "axios";

// Define interface URI
const interface = "http://localhost:8000/";

// Obtain a service admin token

const responseAdmin = await axios.get(
    interface + "user/login/admin@email.com/adminpass"
);
const adminCookie = responseAdmin.headers["set-cookie"];
console.log("Admin cookie: " + JSON.stringify(adminCookie));

// Use it to create a new catalog admin

const catalogCreationResponse = await axios.post(
    interface + "user/add",
    {
        user: {
            address: "catalog@mail.com",
            password: "cata",
            rights: "3",
        },
    },
    { headers: { cookie: adminCookie } }
);
console.log("Created catalog admin: " + JSON.stringify(catalogCreationResponse.data));

// Login with catalog admin account

const responseCatalog = await axios.get(
    interface + "user/login/catalog@email.com/cata"
);
const catalogCookie = responseCatalog.headers["set-cookie"];
console.log("Catalog cookie: " + JSON.stringify(catalogCookie));

// Add a movie with catalog account

// Create a client account

// Login with client account

// Search for the movie title with client account