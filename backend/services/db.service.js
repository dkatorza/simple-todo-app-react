const mongoose = require('mongoose')
const config = require('../config')

mongoose.connect(config.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => console.log("connected to DB"))
    .catch(console.error)
