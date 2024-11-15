const express = require("express"); //runs our http server
const cors = require("cors"); // cors allows calls to the server from any origin

// and below
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req,rest) => {
    const { username } = req.body; // takes username from the request body
    return rest.json({ username: username, secret: "sha256..."}); //returns a fake user
});

app.listen(3001);