const axios = require("axios").default;

// Define interface URI
const interface = "http://localhost:8000/";

// Obtain a service admin token

const test = async () => {
    const responseAdmin = await axios.post(interface + "user/login", {
        address: "admin@email.com",
        password: "adminpass",
    });
    const adminToken = responseAdmin.data;
    console.log("Admin token: " + adminToken);

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
        { headers: { token: adminToken } }
    );
    console.log(
        "Created catalog admin: " + JSON.stringify(catalogCreationResponse.data)
    );

    // Login with catalog admin account

    const responseCatalog = await axios.post(interface + "user/login", {
        address: "catalog@email.com",
        password: "cata",
    });
    const catalogToken = responseCatalog.data;
    console.log("Catalog token: " + JSON.stringify(catalogToken));

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
        { headers: { token: catalogToken } }
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
        { headers: { token: adminToken } }
    );
    console.log(
        "Created client: " + JSON.stringify(clientCreationResponse.data)
    );

    // Login with client account

    const responseClient = await axios.post(interface + "user/login", {
        address: "client@email.com",
        password: "client",
    });
    const clientToken = responseClient.data;
    console.log("Client token: " + JSON.stringify(clientToken));

    // Search for the movie title with client account

    const searchResponse = await axios.get(
        interface + "movie/find/" + movieCreationResponse.data.title,
        { headers: { token: clientToken } }
    );
    console.log("Obtained movie: " + searchResponse.data);
};

test().catch((error) => console.log(error));
