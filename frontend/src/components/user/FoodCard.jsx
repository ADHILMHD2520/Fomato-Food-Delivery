
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./FoodCard.css";
import { FaLeaf } from "react-icons/fa";
import { GiChickenLeg } from "react-icons/gi";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../../redux/userSlice";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";


const FoodCard = ({ data }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const cartItems = useSelector(
    (state) => state.user.cartItems
  );

  console.log("Cart items:", cartItems);

  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  const handleCart = () => {
    if (quantity <= 0) return;

    dispatch(addToCart({
      id: data._id,
      name: data.name,
      price: data.price,
      image: data.image,
      shop: data.shop,
      quantity,
      foodType: data.foodType
    }))
  }





  return (
    <div className="food-card">
      <div className="food-card-image">
        <img src={data.image} alt={data.name} />


        {data.foodType && (
          <span
            className={`food-type-tag ${data.foodType === "veg" ? "veg-tag" : "non-veg-tag"
              }`}
          >
            {data.foodType === "veg" ? <FaLeaf /> : <GiChickenLeg />}

            {data.foodType === "veg" ? "Veg" : "Non-Veg"}
          </span>
        )}



        <span className="food-category">
          {data.category}
        </span>
      </div>

      <div className="food-card-content">
        <h3>{data.name}</h3>

        <p className="food-description">
          {data.description}
        </p>

        <div className="food-card-bottom">
          <span className="food-price">
            ₹{data.price}
          </span>

          <div className="add-cart-btn">
            <div className="quantity-control">
              <button onClick={handleDecrease}>
                <FaMinus />
              </button>

              <span>{quantity}</span>

              <button onClick={handleIncrease}>
                <FaPlus />
              </button>
            </div>

            <button className="cart-icon" onClick={handleCart}>
              <FaShoppingCart />
              {/* this icon is here adding quantity of food to cart */}
            </button>
          </div>




        </div>
      </div>
    </div>
  );
};

export default FoodCard;
