const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../models/user.model');
const config = require('../config/app');

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken()
};

module.exports = () => {
    const strategy = new Strategy(params,async (payload,done)=>{
        const user = await User.findById(payload.id);
        if (!user) return done(new Error("User Not Found"), null);
        return done(null, user);
    });

    passport.use(strategy);

    return{
        initialize: function(){
            return passport.initialize();
        },
        authenticate: function(){
            return passport.authenticate("jwt",{session: false});
        }
    };
};