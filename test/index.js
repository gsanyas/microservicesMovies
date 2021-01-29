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
            address: "catalog@email.com",
            password: "cata",
            rights: "3",
        },
    },
    { headers: { cookie: adminCookie } }
);
console.log(
    "Created catalog admin: " + JSON.stringify(catalogCreationResponse.data)
);

// Login with catalog admin account

const responseCatalog = await axios.get(
    interface + "user/login/catalog@email.com/cata"
);
const catalogCookie = responseCatalog.headers["set-cookie"];
console.log("Catalog cookie: " + JSON.stringify(catalogCookie));

// Add a movie with catalog account

const movieCreationResponse = await axios.post(
    interface + "movie/add",
    {
        movie: {
            title: "Tenet",
            director: "Nolan",
            genre: "sci-fi",
        },
    },
    { headers: { cookie: catalogCookie } }
);
console.log("Created movie: " + JSON.stringify(movieCreationResponse.data));

// Create a client account with service admin

const clientCreationResponse = await axios.post(
    interface + "user/add",
    {
        user: {
            address: "client@email.com",
            password: "client",
            rights: "1",
        },
    },
    { headers: { cookie: adminCookie } }
);
console.log("Created client: " + JSON.stringify(clientCreationResponse.data));

// Login with client account

const responseClient = await axios.get(
    interface + "user/login/client@email.com/client"
);
const clientCookie = responseClient.headers["set-cookie"];
console.log("Client cookie: " + JSON.stringify(clientCookie));

// Search for the movie title with client account

const searchResponse = await axios.get(
    interface + "movie/find/" + movieCreationResponse.data.id,
    { headers: { cookie: clientCookie } }
);
console.log("Obtained movie: " + searchResponse.data);
