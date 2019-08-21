var Products=require('./Products');
var ProductDetails=require('./ProductDetails');
var UserDetails=require('./UserDetails');
var Users=require('./Users');
var connection =require('./connections');

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
        return db.collection("Users").findOne({"userId":users.userId, "password":users.password}).then(function(saved){
            console.log("details :",saved);
            if(!saved) throw new Error("Login failed. Try again");
            else return saved;

    })
})}

dbModule.checkmail=function(email){
    //console.log(users);
    return connection.getConnection().then(function(db){
        return db.collection("Users").findOne({"email":email}).then(function(saved){
           // console.log("details :",saved);
            if(!saved) 
            {
                return "not found"
            }
            else {
                return saved;
            }


    })
})}
dbModule.update=function(userId,name,password){
    console.log("In dbModule ::",userId,name,password);
    return connection.getConnection().then(function(db){
        return db.collection("Users").updateOne({ "userId":userId},{$set:{"name":name,"password":password}}).then(function(saved){
            if (saved.result.nModified < 1) throw new Error("Updation failed");
            
            else {
                console.log("Returning to Userdetails after updation",saved.result.nModified);
                
                return saved;
            }
        })
    })
}


dbModule.getUser=function(userId){
    console.log("dbMODULE ",userId);
    
    return connection.getConnection().then(function (db) {
        return db.collection("Users").find({"userId":userId}).toArray().then(function(user){
            console.log("Users info--",user);
            return user;
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
module.exports=dbModule;