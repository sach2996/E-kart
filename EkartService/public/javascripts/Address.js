var Address=function(name,city, state, pin, phone){
    this.name=name;
    this.city=city;
    this.state=state;
    this.pin=pin;
    this.phone=phone
    
    
}

Address.toObject=function(result,name){
    return new Address(name,result.city,result.state,result.pin, result.phone)

}

module.exports=Address;