const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const User=require('../public/javascripts/Users');
const config=require('../public/javascripts/connections');

module.exports=function(passport){
    let opts={};
    opts.jwtFromRequest=ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretKey=config.secret;
    passport.use(new JwtStrategy(opts,function(jwt_payload,done){
        User.getUserById(jwt_payload,function(err,user){
            if(err){
                return done(err,false);
            }
            if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        })
    }));
}