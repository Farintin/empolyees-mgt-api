const mongoose = require('mongoose')

let mongoDB
if (process.env.NODE_ENV !== 'production') {
    mongoDB = 'mongodb://localhost:27017/employee'
} else {
    mongoDB = process.env.DB_URL
}
mongoose.connect(mongoDB, {
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useFindAndModify: false
})

let db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
    console.log('Database connected sucessfully')
})

module.exports = db