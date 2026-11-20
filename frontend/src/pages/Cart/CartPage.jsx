import React from 'react'
import "./CartPage.css"
import UserNavbar from '../../components/user/UserNavbar'
import { useSelector } from 'react-redux'
import CartItemCard from '../../components/user/CartItemCard'
import { Navigate } from 'react-router-dom'
const CartPage = () => {
    const { cartItems } = useSelector(state => state.user)

    // for showing total amount at the end of cart
    const totalAmount = useSelector(state =>
        state.user.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    )

    
    return (
        <div className='cart-main-container'>
            <UserNavbar />

            <div className="cart-container">
                <h1 className="cart-page-title">
                    Your Cart
                </h1>
                {cartItems.length == 0 ? (
                    <p className="empty-cart-message">Your Cart is empty</p>
                ) :
                    <>
                        <div>
                            {cartItems.map((item, index) =>
                                <CartItemCard data={item} key={index} />
                            )}

                        </div>
                        <div className="cart-total">
                            <span>Total Amount</span>
                            <span className="cart-total-price">₹{totalAmount}</span>
                        </div>
                        <button
                            className="checkout-btn"
                            onClick={() => Navigate("/checkout")}
                        >
                            Proceed to Checkout
                        </button>
                    </>
                }
            </div>

        </div>
    )
}

export default CartPage