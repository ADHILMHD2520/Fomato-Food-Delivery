
import React from "react";
import { useNavigate } from "react-router-dom";

import "./FoodCard.css";
import { FaLeaf } from "react-icons/fa";
import { GiChickenLeg } from "react-icons/gi";

const FoodCard = ({ data }) => {

  const navigate = useNavigate();


  const handleCart = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please login to add products to cart");
      navigate("/signin");
      return;
    }
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

          <button className="add-cart-btn" onClick={handleCart}>
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
