var express = require('express');
var jwt=require('jsonwebtoken');
var routing = express.Router();
var ProductsDetails = require('../public/javascripts/ProductDetails');
var dbModule=require('../public/javascripts/DBModule');
var Users=require('../public/javascripts/Users')
var UserDetails=require('../public/javascripts/UserDetails')
var Cart=require('../public/javascripts/Cart')
var CartDetails=require('../public/javascripts/CartDetails')
var Wishlist=require('../public/javascripts/Wishlist')

var sess;

routing.get('/getAllProducts', function(req,res,next){
    ProductsDetails.getAllProducts().then(function(product){
        res.json(product)
    }).catch(function (){
        next(err)
    })
})

routing.get('/viewProduct/:displayName',function(req,res,next){
    ProductsDetails.viewProduct(req.params.displayName).then(function(products){
        console.log("In Routing ",products);
        res.json(products);

    }).catch(function (err){
        next(err);
    })
})

routing.post('/signup',function(req,res,next){
    var users=Users.toObject(req.body);
    sess=req.session;
    dbModule.checkmail(users.email).then(function(data){
        //console.log("Sign up ",data.email);
        if(data.email!=users.email){
            dbModule.signup(users).then(function(data){
                sess.users=data;
                res.json({"message":"Registeration successful. You can login now."})
            }).catch(function(err){
                console.log(err);
                next(err)
            })
        }else{
            throw new Error("This email id already exists.Please use other email id")
        }
    }).catch(function(err){
        console.log(err);
        next(err)
    })
    
})
routing.post('/login',function(req,res,next){
    var users=Users.toObject(req.body);
    sess=req.session;
    dbModule.login(users).then(function(saved){
        if(saved){
        sess.users=saved;
        
        res.redirect('/dashboard');
        }
        else {
            throw new Error("Login Failed")
        }
    }).catch(function(err){
        console.log(err);
        next(err)
    })
})

routing.get('/userInfo',function(req,res,next){
    var email=sess.users.email;
    dbModule.getUser(email).then(function(data){
        if(data){
           
            res.json(data)
        }
        else{
            res.json({"message":"Error occured"});
        }

    
})})

routing.get('/dashboard',function(req,res){
    if(!sess.users){
        res.json({"message":"User not authorized"})
    }else{
        res.json({"message":"Welcome "+sess.users.name});
        
    }
})


routing.get('/logout',function(req,res){
    delete req.session.sessionId;
    res.redirect('/login');
})

routing.post('/update',function(req,res,next){
    var email=sess.users.email;
    var users=Users.toObject(req.body);
    if(users.password!=null){
    dbModule.update(email,users.name,users.password).then(function(data){
        res.json({"message":"Successfully updated"})
    }
    ).catch(function(err){
        console.log(err);
        next(err)
    })
}
    else{
        var password=sess.users.password;
        dbModule.update(email,users.name,password).then(function(data){
            res.json({"message":"Username successfully Updated"})
        }
        ).catch(function(err){
            console.log(err);
            next(err)
        })
    }
})

routing.get('/deals', function(req,res,next){
    ProductsDetails.getDeals().then(function(product){
        res.json(product)
    }).catch(function (){
        next(err)
    })
})

routing.get('/recommendations', function(req,res,next){
    ProductsDetails.recommendations().then(function(product){
        res.json(product)
    }).catch(function (){
        next(err)
    })
})

routing.post('/addCart',function(req,res){
    var name=sess.users.name;
    var cart=Cart.toObject(req.body,name);
    CartDetails.addCart(cart).then(function(err){
        if(err){
            res.json({"message":"Qauntity cannot exceed 4 per user"});
        }else{
        res.json({"message":"Product added to the car"});
        }
    }).catch(function (err){
        
        next(err);
    })
})
routing.post('/modifyCart',function(req,res){
    var name=sess.users.name;
    var cart=Cart.toObject(req.body,name);
    CartDetails.modifyCart(cart).then(function(saved){
        if(!saved){
            console.log("Error");
            res.json({"message":"No items available"});
        }else{
        res.json({"message":"Quantity updated"});
        }
    }).catch(function (err){
        
        next(err);
    })
})
routing.delete('/delete/:prodName', function (req, res, next) {
    var name=sess.users.name;
    var prodName =req.params.prodName
    dbModule.deleteProduct(prodName,name).then(function (response) {
        if (response.result.n > 0) {
            res.json({ "message": "Successfully deleted product "+prodName+" from cart " })
        }
        else {
            throw new Error("Sorry Cannot delete: " + prodName)

        }
    }).catch(function (err) {

        next(err)
    })
})
routing.delete('/deleteWishlist/:prodName', function (req, res, next) {
    var name=sess.users.name;
    var prodName =req.params.prodName
    dbModule.deleteWishlist(prodName,name).then(function (response) {
        console.log("response ,result ",response.result, response.result.n);
        if (response.result.n > 0) {
            res.json({ "message": "Successfully deleted product "+prodName+" from wishlist " })
        }
        else {
            throw new Error("Sorry Cannot delete: " + prodName)

        }
    }).catch(function (err) {

        next(err)
    })
})
routing.post('/addWishlist',function(req,res){
    var name=sess.users.name;
    var wishlist=Wishlist.toObject(req.body,name);
    console.log("In routing ",wishlist);
    CartDetails.addWishlist(wishlist).then(function(err){
        if(err){
            res.json({"message":"Already in wishlist"});
        }else{
        res.json({"message":"Product added to the Wishlist"});
        }
    }).catch(function (err){
        
        next(err);
    })
})

routing.get('/cart',function(req,res){
    var name=sess.users.name;
    dbModule.cart(name).then(function(product){
        res.json(product)
    }).catch(function (){
        next(err)
    })
})
routing.get('/viewWishlist',function(req,res){
    var name=sess.users.name;
    dbModule.viewWishlist(name).then(function(product){
        res.json(product)
    }).catch(function (){
        next(err)
    })
})

routing.get('/cartItems',function(req,res){
    var name=sess.users.name;
    dbModule.cartItems(name).then(function(product){
        res.json({"message":"Total number of distinct products",product})
    }).catch(function(){
        next(err)
    })
})

routing.get('/search/:prodName',function(req,res){
    var name=req.params.prodName;
    ProductsDetails.search(name).then(function(product){
        console.log(product)
        res.json({"message":"Product found with details: ",product})
    }).catch(function(){
        next(err)
    })
})

routing.get('/loggedIn',function(req,res){
    if(sess.users!=null)
    {
        return true;
    }
    else
    {
        return false;
    }
})
module.exports=routing;