const JWT = require('jsonwebtoken')
const Employee = require('../models/employee.model')
const Admin = require('../models/admin.model')

signToken = user => {
    const exp = new Date().setDate( new Date().getDate() + 1 ) / 1000
    console.log('exp: ', Date(exp))
    return token = JWT.sign({
        iss: 'employees',
        sub: user.id,
        iat: new Date().getTime(),
        exp: exp
    }, process.env.JWT_SECRET)
}

module.exports = {
    signup: async (req, res, next) => {
        const { username } = req.value.body

        const admin = await Admin.findOne({ username: username })
        if (admin) {
            return res.status(403).json({
                error: 'username already exist'
            })
        }
        // Create admin
        const newAdmin = new Admin(req.value.body)
        await newAdmin.save()
        // Generate token
        const token = signToken(newAdmin.password)
        // Send token
        res.json({ data: {token} })
    },

    signin: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user)
        // Send token
        res.json({ data: {token} })
    },
    
    admin: async (req, res, next) => {
        res.json({ data: req.user })
    },
    
    createEmployee: async (req, res, next) => {
        const newEmployee = new Employee(req.value.body)
        await newEmployee.save(async (err, doc) => {
            if (err) {
                return res.status(403).json(err)
            }
            res.json({ data: 'successful' })
        })
    },

    employees: async (req, res, next) => {
        const employees = await Employee.find(req.body)
        res.json({ data: employees })
    },
    employee: async (req, res, next) => {
        const employee = await Employee.findById(req.params.id)
        if (!employee) {
            return res.status(403).json('id not found')
        }
        res.json({ data: employee })
    },

    deleteEmployee: async (req, res, next) => {
        Employee.findByIdAndDelete(req.params.id, async (err) => {
            if (err) {
                return res.status(403).json({error: err})
            }
        })
        res.json({ data: 'successful' })
    },
    deleteEmployees: async (req, res, next) => {
        await Employee.deleteMany(req.body, async (err, count) => {
            if (err) {
                return res.status(403).json({error: err})
            }
            res.json({ data: 'successful' })
        })
    },
    
    updateEmployee: async (req, res, next) => {
        Employee.findByIdAndUpdate(req.params.id, req.value.body, async (err, doc) => {
            if (err) {
                return res.status(403).json(err)
            }
            res.json({ data: 'successful' })
        })
    }
}