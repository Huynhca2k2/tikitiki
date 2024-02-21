import React, { createContext, useEffect, useState } from "react";


export const ShopContext = createContext(null);

const getDefaultCart = () =>{
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
        
    }
    return cart;
}

const ShopContextProvider = (props) => {
    
    const [all_product, setAll_Product] =useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [productInCart, setProductInCart] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response) => response.json())
        .then((data) => setAll_Product(data))
    },[]);

    useEffect(() =>{
        fetchProductInCart();
    },[])

    const addToCart = (itemId) =>{
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                fetchProductInCart();
            });
        }
    }
    
    const fetchProductInCart = () => {
        fetch('http://localhost:4000/productincart',{
            method:'GET',
            headers:{
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => setProductInCart(data));
    }
    
    const removeFromCart = (itemId) =>{
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removeformcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                fetchProductInCart();
            });
        }
    }

    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        for(const item of productInCart){
            totalAmount += item.new_price*item.quantity;
        }return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item of productInCart) {
            totalItem += item.quantity;
        }
        return totalItem;
    }
    

    const contextValue = {getTotalCartItems, getTotalCartAmount, all_product, productInCart, cartItems, addToCart, removeFromCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;