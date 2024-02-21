import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {

    const {getTotalCartAmount, productInCart, removeFromCart} = useContext(ShopContext)

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {productInCart.map((e, index) => {
            return  <>
                        <div key={index} className="cartitems-format cartitems-format-main">
                            <img src={e.image} alt='' className='carticon-product-icon'/>
                            <p>{e.name}</p>
                            <p>{e.new_price}</p>
                            <button className='cartitems-quantity'>{e.quantity}</button>
                            <p>$ {e.new_price*e.quantity}</p>
                            <img src={remove_icon} className='cartitems-remove-icon' onClick={() =>{removeFromCart(e.id)}} alt=''/>
                        </div>
                        <hr />
                    </>
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>cart Totals</h1>
            <div className="">
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>$ {getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item total-text">
                    <p>Total</p>
                    <p>$ {getTotalCartAmount()}</p>
                </div>
            </div>
            
            <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
                <input type="text" name="" id="" placeholder='promo code' />
                <button>Submit</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems
