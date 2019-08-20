var Cart=function(name,prodName, price,quantity,category,amount, discount,deliveryCharge){
    this.name=name;
    this.prodName=prodName;
    this.price=price;
    this.quantity=quantity;
    this.category=category,
    this.amount=amount,
    this.discount=discount,
    this.deliveryCharge=deliveryCharge
    
    
}

Cart.toObject=function(result,name){
    return new Cart(name,result.prodName,result.price,result.quantity, result.category,result.amount, result.discount,result.deliveryCharge)

}

module.exports=Cart;