var Users=function(userId,name, email, password,phone){
    this.userId=userId,
    this.name=name;
    this.email=email;
    this.password=password;
    this.phone=phone;
    
}

Users.toObject=function(result){
    return new Users(result.userId,result.name,result.email,result.password, result.phone)

}

module.exports=Users;