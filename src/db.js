const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/notes-app', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(db => console.log("Database is ON")).catch((err) => console.log(err));