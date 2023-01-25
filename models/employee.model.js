const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstName: {
        type: String,
        trim: true
    },
    middleName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    gender: {
        type: String,
        lowercase: true,
        trim: true
    },
    birthDate: {
        type: Date
    },
    address: {
        type: String,
        trim: true
    },
    bvn: {
        type: String,
        trim: true
    },
    employmentStatus: {
        type: String
    }
});

const Employee = mongoose.model('Employee', employeeSchema);



module.exports = Employee