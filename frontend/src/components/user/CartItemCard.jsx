
import React from "react";
import { useDispatch } from "react-redux";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import "./CartItemCard.css";

import { incrementCartItem, decrementCartItem,removeItem } from "../../redux/userSlice";

const CartItemCard = ({ data }) => {


    const dispatch = useDispatch()

const handleIncrease = () => {
    dispatch(incrementCartItem(data.id));
};

const handleDecrease = () => {
    if (data.quantity > 1) {
        dispatch(decrementCartItem(data.id));
    }
};

const handleDelete =()=>{
    dispatch(removeItem(data.id))
}

    return (
        <div className="cart-item-card">

            <img
                src={data.image}
                alt={data.name}
                className="cart-item-image"
            />

            <div className="cart-item-details">
                <h3>{data.name}</h3>
                <p>₹{data.price}x{data.quantity}</p>
                <p>₹{data.price*data.quantity}</p>
            </div>

            <div className="cart-item-quantity">
                <button onClick={handleDecrease}>
                    <FaMinus />
                </button>

                <span>{data.quantity}</span>

                <button onClick={handleIncrease}>
                    <FaPlus />
                </button>
            </div>

            <button className="remove-cart-item" onClick={handleDelete}>
                <FaTrash />
            </button>

        </div>
    );
};

export default CartItemCard;
