//bean class of Products

var Products=function(displayName,shortDesc,description,category,price,discount,deliveryCharge,offerPrice,rating,amount,reviews){
    this.displayName=displayName;
    this.shortDesc=shortDesc;
    this.description=description;
    this.category=category;
    this.price=price;
    this.discount=discount;
    this.deliveryCharge=deliveryCharge;
    this.offerPrice=offerPrice;
    this.rating=rating;
    this.amount=amount;
    this.reviews=reviews;
}

Products.toObject=function(result){
    return new Products(result.displayName,result.shortDesc,result.description,result.category,result.price,result.discount,result.deliveryCharge,result.offerPrice,result.rating,result.amount,result.reviews)

}

module.exports=Products;