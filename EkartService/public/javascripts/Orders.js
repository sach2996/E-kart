var Orders=function(name,prodName, price,quantity,category,amount,discount, status,deliveryCharge,date,rating,review){
    this.name=name;
    this.prodName=prodName;
    this.price=price;
    this.quantity=quantity;
    this.category=category,
    this.amount=amount,
    this.discount=discount,
    this.status=status,
    this.deliveryCharge=deliveryCharge;
    if(date==null){
        this.date=new Date()
    }else  this.date=date;
    this.rating=rating,
    this.review=review
    
    
}

Orders.toObject=function(result,name){
    return new Orders(name,result.prodName,result.price,result.quantity, result.category,result.amount,result.discount, result.status,result.deliveryCharge,result.date,result.rating,result.review)

}

module.exports=Orders;