const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

require("./db/conn");
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello EveryOne");
})
app.use(require('./router/auth'));


app.listen(port,()=>{
    console.log(`listing from ${port}`);
})