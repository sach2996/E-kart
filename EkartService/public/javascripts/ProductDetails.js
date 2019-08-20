var dbModule=require('./DBModule');

var ProductDetails={}

ProductDetails.getAllProducts=function(){
    return dbModule.getAllProducts().then(function(products){
        return products;
    }).catch(function(err){
        return err
    })
}

ProductDetails.viewProduct=function(displayName){
    return dbModule.viewProduct(displayName).then(function(products){
        if(products==null){
            throw new Error();
        }else{
            console.log("In Product details ",products.reviews);
                
            return products;
        }
    }).then(function(product){
        return product;
    })
}

ProductDetails.getDeals=function(){
    return dbModule.getDeals().then(function(products){
        return products;
    }).catch(function(err){
        return err
    })
}

ProductDetails.recommendations=function(){
    return dbModule.recommendations().then(function(products){
        return products;
    }).catch(function(err){
        return err
    })
}
ProductDetails.search=function(name){
    return dbModule.search(name).then(function(products){
        return products;
    }).catch(function(err){
        return err;
    })
}

module.exports=ProductDetails;