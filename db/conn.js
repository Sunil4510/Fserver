const mongoose = require('mongoose');
const db = process.env.database;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to the database");
}).catch((e) => console.log("not connected something error" + e));