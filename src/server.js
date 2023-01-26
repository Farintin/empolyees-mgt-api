const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
require('./db')

const app = express()
// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/', require('./routes'))

// Server stater
//const PORT = process.env.PORT || 5000
//app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
module.exports = app