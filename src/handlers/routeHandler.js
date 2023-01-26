const joi = require('joi');

module.exports = {
    validateEmployeeBody: (schema) => {
        return (req, res, next) => {
            const result = schema.validate(req.body);
            if (result.error) {
                return res.status(400).json(result.error)
            };
            
            if (!req.value) { req.value = {} };
            req.value['body'] = result.value;
            // console.log('req.body:', req.body)
            next()
        }
    },
    validateAdminBody: (schema) => {
        return (req, res, next) => {
            const result = schema.validate(req.body);
            if (result.error) {
                return res.status(400).json(result.error)
            };
            
            if (!req.value) { req.value = {} };
            req.value['body'] = result.value;
            next()
        }
    },

    schemas: {
        adminAuth: joi.object().keys({
            username: joi.string()
                .required(),
            password: joi.string()
                .required()
        }),
        employeeBody: joi.object().keys({
            firstName: joi.string(),
            lastName: joi.string(),
            middleName: joi.string(),
            email: joi.string().email(),
            gender: joi.string(),
            birthDate: joi.date(),
            address: joi.string(),
            bvn: joi.string(),
            employmentStatus: joi.string()
        })
    }
}