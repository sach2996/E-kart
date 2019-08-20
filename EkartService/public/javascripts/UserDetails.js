var dbModule=require('./DBModule');
var Users=require('./Users');

var UserDetails={}


UserDetails.signup=function(users){
    return dbModule.signup(users).then(function(){
        return data;
    }).catch(function(err){
        return err
    }) 
}

UserDetails.login=function(users){
    console.log("in userdetails",users);
    return dbModule.login(users).then(function(){
        return data;
    }).catch(function(err){
        
        return err
    }) 
}
/*
UserDetails.update=function(users){
    console.log("In USerdetails Update,",users);
    return dbModule.update(users).then(function(data){
        console.log("data ",data);
        
        return data;
    }).catch(function(err){
        return err
    }) 
}
*/
module.exports=UserDetails;