var dbModule=require('./DBModule');

var CartDetails={}

CartDetails.addCart=function(cart){
    //console.log("In cartdetails ", cart);
    return dbModule.checkCart(cart).then(function(products){
        if(products==null){
            cart.quantity=1
            cart.amount=cart.price-((cart.discount*cart.price)/100)+cart.deliveryCharge;
            return dbModule.addCart(cart).then(function(cart){
           }).catch(function(err){
               return err
           })
          
        }
        else{
            if((products.quantity+1)<4){
                cart.amount=products.amount+(cart.price-((cart.discount*cart.price)/100));
                cart.quantity=products.quantity+1;
                return dbModule.updateCart(cart).then(function(cart){
                }).catch(function(err){
                    return err
                })
            }
            else {
                throw new Error("Qauntity cannot exceed 4  per user");
            }
        }
    }).catch(function(err){
        return err
    })
}

CartDetails.modifyCart=function(cart){
    return dbModule.checkCart(cart).then(function(products){
        if(products.quantity==null){
            throw new Error("No Items available");
          
        }
        else{
            if(products.quantity>1){
                cart.amount=products.amount-(cart.price-((cart.discount*cart.price)/100));
                cart.quantity=products.quantity-1;
                return dbModule.updateCart(cart).then(function(cart){
                    res.json({"message":"Cart Updated"})
                }).catch(function(err){
                    return err
                })
            }
            else {
                return dbModule.deleteCart(cart).then(function(cart){
                    res.json({"message":"Item removed from cart"})
                }).catch(function(err){
                    return err
                })
            }
        }
    }).catch(function(err){
        return err
    })
}

CartDetails.addWishlist=function(wishlist){
    console.log("In Cartdetails ---wishlist ", wishlist);
    return dbModule.checkWishlist(wishlist).then(function(products){
        if(products==null){
            return dbModule.addWishlist(wishlist).then(function(wishlist){
           }).catch(function(err){
               return err
           })
        }
        else{
            throw new Error("Qauntity already added");
        }
    }).catch(function(err){
        return err
    })
}

/*CartDetails.deleteWishlist=function(wishlist){
    console.log("In wishlist ", wishlist);
    return dbModule.deleteWishlist(wishlist).then(function(products){
        res.json({"message":"Product removed"});
    }).catch(function(err){
        return err
    })
}

CartDetails.viewWishlist=function(wishlist){
    console.log("In wishlist ", wishlist);
    return dbModule.viewWishlist(wishlist).then(function(products){
        res.json({"message":"Products are ",products});
    }).catch(function(err){
        return err
    })
}
*/

module.exports=CartDetails;
