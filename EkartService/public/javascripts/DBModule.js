var Products=require('./Products');
var ProductDetails=require('./ProductDetails');
var UserDetails=require('./UserDetails');
var Users=require('./Users');
var connection =require('./connections');
var Orders=require('./Orders');

var productsArray

var dbModule={}

dbModule.getAllProducts=function(){
    return connection.getConnection().then(function (db) {
        return db.collection("Products").find().toArray().then(function(product){
            return product;
        }).catch(function(err){
            return err;
        })
    })
}

dbModule.viewProduct=function(displayName){
    return connection.getConnection().then(function(db){
        return db.collection("Products").findOne({"displayName":displayName}).then(function(saved){
            if(!saved) throw new Error("No Product found with name :"+displayName);
            else {
                
                return Products.toObject(saved);
        }})
    })
}

dbModule.signup=function(users){
    return connection.getConnection().then(function(db){
        return db.collection("Users").insertOne(users).then(function(collection){
            if(!collection) throw new Error("Registration failed");
            else {
                var data=Users.toObject(collection.ops[0]);
                
                return data;
            }
        })
    
    })
}

dbModule.login=function(users){
    console.log(users);
    return connection.getConnection().then(function(db){
        return db.collection("Users").findOne({"email":users.email, "password":users.password}).then(function(saved){
            if(!saved) throw new Error("Login failed. Try again");
            else return saved;

    })
})}

dbModule.checkmail=function(email){
    return connection.getConnection().then(function(db){
        return db.collection("Users").findOne({"email":email}).then(function(saved){
            if(!saved) 
            {
                return "not found"
            }
            else {
                return saved;
            }


    })
})}
dbModule.update=function(email,name,password){
    return connection.getConnection().then(function(db){
        return db.collection("Users").updateOne({ "email":email},{$set:{"name":name,"password":password}}).then(function(saved){
            if (saved.result.nModified < 1) throw new Error("Please pass new name or password to update.");
            
            else {
                console.log("Returning to Userdetails after updation",saved.result.nModified);
                
                return saved;
            }
        })
    })
}


dbModule.getUser=function(email){
    return connection.getConnection().then(function (db) {
        return db.collection("Users").find({"email":email}).project({_id:0,name:1}).toArray().then(function(user){
           return user[0].name;
        }).catch(function(err){
            return err;
        })
    })
}

dbModule.getDeals=function(){
    return connection.getConnection().then(function (db) {
        return db.collection("Products").find({discount:{$gt:25}}).project({_id:0,shortDesc:1,displayName:1, category:1, discount:1, price:1, deliveryCharge: 1}).toArray().then(function(product){
            console.log("Deals Products",product);
            return product;
        }).catch(function(err){
            return err;
        })
    })
}

dbModule.recommendations=function(){
    return connection.getConnection().then(function (db) {
        return db.collection("Products").find({price:{$gte:60000}}).project({_id:0,shortDesc:1,displayName:1, category:1, discount:1, price:1, deliveryCharge: 1,rating: 1}).toArray().then(function(product){
            console.log("Deals Products",product);
            return product;
        }).catch(function(err){
            return err;
        })
    })
}

dbModule.addCart=function(cart){
    console.log("Console ",cart);
    
    return connection.getConnection().then(function(db){
        return db.collection("Cart").insertOne(cart).then(function(collection){
            if(!collection) throw new Error("Product not added");
            else {
                var data=Users.toObject(collection.ops[0]);
                return data;
            }
        })
    })
}


dbModule.checkCart=function(cart){
    return connection.getConnection().then(function (db) {
        return db.collection("Cart").findOne({"name":cart.name,"prodName":cart.prodName}).then(function(record){
            if(!record) return null;
            else return record;
        })
    } )
}
dbModule.updateCart=function(cart){
    return connection.getConnection().then(function (db) {
        return db.collection("Cart").updateOne({"name":cart.name,"prodName":cart.prodName},{$set:{"amount":cart.amount,"quantity":cart.quantity}}).then(function(saved){
            if(!saved) throw new Error("Updation failed");
            else return saved;
        })
    })
}
dbModule.deleteCart=function(cart){
    return connection.getConnection().then(function (db) {
        return db.collection("Cart").deleteOne({"prodName":cart.prodName}).then(function(saved){
            if(!saved) throw new Error("Item not removed");
            else return saved;
        })
    })
}

dbModule.cart=function(name){
    console.log("Dbmodule Name",name)
    return connection.getConnection().then(function (db) {
        return db.collection("Cart").find({"name":name}).toArray().then(function(product){
            return product;
        }).catch(function(err){
            return err;
        })
    })
}
dbModule.cartItems=function(name){
    return connection.getConnection().then(function(db){
        return db.collection("Cart").find({"name":name}).count().then(function(data){
            return data;
        }).catch(function(err){
            next(err)
        })
    })
}

dbModule.checkWishlist=function(wishlist){
    return connection.getConnection().then(function (db) {
        return db.collection("Wishlist").findOne({"name":wishlist.name,"prodName":wishlist.prodName}).then(function(record){
            if(!record) return null;
            else return record;
        })
    } )
}
dbModule.addWishlist=function(wishlist){
    return connection.getConnection().then(function(db){
        return db.collection("Wishlist").insertOne(wishlist).then(function(collection){
            if(!collection) throw new Error("Product not added");
            else {
                var data=Users.toObject(collection.ops[0]);
                return data;
            }
        })
    })
}

dbModule.deleteWishlist=function(prodName,name){
    return connection.getConnection().then(function (db) {
        return db.collection("Wishlist").deleteOne({"name":name,"prodName":prodName}).then(function(saved){
            return saved;
        }).catch(function(err){
            return err;
        })
    })
}
dbModule.deleteProduct= function(prodName,name){
    return connection.getConnection().then(function(db){
        return db.collection("Cart").deleteOne({"name":name,"prodName":prodName}).then(function(response){
            
            return response
        }).catch(function(err){
            return err;
        })
    })
}


dbModule.viewWishlist=function(name){
    console.log("in dbModule",name);
    
    return connection.getConnection().then(function(db){
        return db.collection("Wishlist").find({"name":name}).toArray().then(function(product){
            console.log("product--", product)
            return product;
        }).catch(function(err){
            return err;
        })
    })
}
dbModule.search=function(name){
    return connection.getConnection().then(function(db){
        return db.collection("Products").findOne({"displayName":name}).then(function(product){
            return product;
        }).catch(function(err){
            return err;
        })
    })
}

dbModule.address=function(name){
    console.log("Dbmodule Name",name)
    return connection.getConnection().then(function (db) {
        return db.collection("Address").find({"name":name}).toArray().then(function(address){
            return address;
        }).catch(function(err){
            return err;
        })
    })
}

dbModule.addAddress=function(address){
    console.log("Console ",address);
    
    return connection.getConnection().then(function(db){
        return db.collection("Address").insertOne(address).then(function(collection){
            if(!collection) throw new Error("Address not added");
            else {
                var data=Users.toObject(collection.ops[0]);
                return data;
            }
        })
    })
}
dbModule.modifyAddress=function(address){
    console.log("DB module Address ",address)
    return connection.getConnection().then(function (db) {
        return db.collection("Address").updateOne({"name":address.name},{$set:{"state":address.state,"city":address.city,"pin":address.pin,"phone":address.phone}}).then(function(saved){
            if(saved.result.nModified < 1) throw new Error("Updation failed");
            else {
                return saved;
            }
        })
    })
}
dbModule.deleteAddress=function(city,name){
    return connection.getConnection().then(function (db) {
        return db.collection("Address").deleteOne({"name":name,"city":city}).then(function(saved){
            if(!saved) throw new Error("Address not removed");
            else return saved;
        })
    })
}
dbModule.order=function(order){
   // console.log("Dbmodule Name",name)
   return connection.getConnection().then(function(db){
    return db.collection("Orders").insertOne(order).then(function(collection){
        if(!collection) throw new Error("Order not placed");
        else {
            var data=Orders.toObject(collection.ops[0]);
            return data;
        }
    })
})
}

dbModule.orders=function(name){
    console.log("Dbmodule Name",name)
    return connection.getConnection().then(function (db) {
        return db.collection("Orders").find({"name":name}).toArray().then(function(orders){
            return orders;
        }).catch(function(err){
            return err;
        })
    })
}

dbModule.cancelOrder=function(name,prodName){
    return connection.getConnection().then(function (db) {
        return db.collection("Orders").findOne({"name":name,"prodName":prodName}).then(function(result){
            if(result.status=='open'){
                return db.collection("Orders").updateOne({"name":name,"prodName":prodName},{$set:{"status":"cancelled"}}).then(function(saved){
                    if(saved.result.nModified < 1) throw new Error("Order cancellation falied.");
                    else {
                        return saved;
                    }
                })
            }
            else{
                throw new Error ("You can not cancel this order")
            }
        })
       
    })
}
dbModule.returnOrder=function(name,prodName){
    console.log("Current date ",new Date().toISOString());
    let d=new Date();
    let dd=d.setDate(d.getDate()-10)
    console.log("10days date ",new Date(dd).toISOString());
    return connection.getConnection().then(function (db) {
        return db.collection("Orders").findOne({"name":name,"prodName":prodName,"date":{$gte:new Date(dd)}}).then(function(result){
            console.log("Result date ",result);
            
            //if(result.status=='delivered' && result.date>=new Date(dd)){
            if(result.status=='delivered'){
                return db.collection("Orders").updateOne({"name":name,"prodName":prodName},{$set:{"status":"returned","date":new Date()}}).then(function(saved){
                    if(saved.result.nModified < 1) throw new Error("Returning a product should be done within 10 days of delivery.");
                    else {
                        return saved;
                    }
                })
            }
            else{
                throw new Error ("You can not return this order")
            }
        })
       
    })
}
dbModule.rateReview=function(name,orders){
    let d=new Date();
    let dd=d.setDate(d.getDate()-30)
    console.log("Orders ",orders);
    return connection.getConnection().then(function (db) {
        return db.collection("Orders").findOne({"name":name,"prodName":orders.prodName,"status":{$in:['delivered','returned']},"date":{$gte:new Date(dd)}}).then(function(result){
            console.log("in first ",result)
            if(result.status=='delivered' || result.status=='returned'){
                return db.collection("Orders").updateOne({"name":name,"prodName":orders.prodName},{$set:{"rating":orders.rating,"review":orders.review,"date":new Date()}}).then(function(saved){
                    //console.log("in second ",saved)
                    if(saved.result.nModified < 1) throw new Error("Review and rating submitted");
                    else {
                        return saved;
                    }
                })
            }
            else{
                throw new Error ("Review can be provided within 30 days of delivery")
            }
        })
       
    })
}


module.exports=dbModule;