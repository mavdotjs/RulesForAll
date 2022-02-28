require('dotenv').config()
console.log(client)
const express = require("express")
const app = express();
const server = require('http').createServer(app)
const io = require("./realtime")(server);

// TODO: APP ROUTES
app.get('/', (req, res) => {
    res.send("OK")
})


server.listen(process.env.PORT || 8080, '0.0.0.0', 511, _=>console.log("API Online!"))