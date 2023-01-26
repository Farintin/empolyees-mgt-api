const passport = require('passport')
const adminPassport = new passport.Passport()

const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy

const Admin = require('./models/admin.model')
const bcrypt = require('bcryptjs')



adminPassport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
    try {
        // Validate user token
        const admin = await Admin.findById(payload.sub)
        // If invalid user
        if (!admin) {
            return done(null, false)
        }
        // But If a valid user
        done(null, admin)
    } catch (err) {
        done(err, false)
    }
}))

// Local strategy
adminPassport.use(new LocalStrategy(async (username, password, done) => {
    try {
        // Validate user phone number
        const admin = await Admin.findOne({ username: username })
        // If doesn't exist user's phone number
        if (!admin) {
            return done(null, false)
        }
        // Pin Matches
        let isMatch
        try {
            isMatch = await bcrypt.compare(password, admin.password)
        } catch (err) {
            throw new Error(err)
        }
        if (!isMatch) {
            return done(null, false)
        }
        done(null, admin)
    } catch (err) {
        done(err, false)
    }
}))


module.exports = adminPassport

