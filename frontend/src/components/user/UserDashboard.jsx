import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import './UserDashboard.css'

import UserNavbar from './UserNavbar';

import categories from "../../data/categories"
import CategoryCard from './CategoryCard';
import ShopCard from "./ShopCard";
import FoodCard from "./FoodCard";

function UserDashboard() {
  const { userData, city, shopsInMyCity, itemsInCity } = useSelector(state => state.user);
  const [showInfo, setShowInfo] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();


  const categoriesRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const shopsRef = useRef(null);

  const [canShopScrollLeft, setCanShopScrollLeft] = useState(false);
  const [canShopScrollRight, setCanShopScrollRight] = useState(false);

  const scrollCategories = () => {
    categoriesRef.current.scrollBy({ left: 564, behavior: "smooth" });
  };

  const scrollCategoriesLeft = () => {
    categoriesRef.current.scrollBy({ left: -564, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const element = categoriesRef.current;
    if (!element) return;

    const maxScroll = element.scrollWidth - element.clientWidth;
    console.log({ scrollLeft: element.scrollLeft, clientWidth: element.clientWidth, scrollWidth: element.scrollWidth });

    setCanScrollLeft(element.scrollLeft > 5);
    setCanScrollRight(element.scrollLeft < maxScroll - 5);
  };

  const scrollShops = () => {
    shopsRef.current.scrollBy({ left: 564, behavior: "smooth" });
  };

  const scrollShopsLeft = () => {
    shopsRef.current.scrollBy({ left: -564, behavior: "smooth" });
  };

  const updateShopScrollButtons = () => {
    const element = shopsRef.current;
    if (!element) return;

    const maxScroll = element.scrollWidth - element.clientWidth;

    setCanShopScrollLeft(element.scrollLeft > 5);
    setCanShopScrollRight(element.scrollLeft < maxScroll - 5);
  };

  useEffect(() => {
    updateScrollButtons();
    updateShopScrollButtons();

    window.addEventListener("resize", updateScrollButtons);
    window.addEventListener("resize", updateShopScrollButtons);

    return () => {
      window.removeEventListener("resize", updateScrollButtons);
      window.removeEventListener("resize", updateShopScrollButtons);
    };
  }, [shopsInMyCity]);

  return (
    <div className='container'>
      <UserNavbar />
      <div className='inspiration-container'>
        <h1>Inspiration for Your First Order</h1>

        <div className="categories-wrapper">
          {canScrollLeft && (
            <button className="category-prev-button" onClick={scrollCategoriesLeft}>
              ‹
            </button>
          )}

          <div
            className="categories-container"
            ref={categoriesRef}
            onScroll={updateScrollButtons}
          >
            {categories.map((cate, index) => (
              <CategoryCard data={cate} key={index} />
            ))}
          </div>

          {canScrollRight && (
            <button className="category-next-button" onClick={scrollCategories}>
              ›
            </button>
          )}
        </div>
      </div>

      <div className="shops">
        <h1>Best Shops in {city}</h1>
        <div className="categories-wrapper">
          {canShopScrollLeft && (
            <button
              className="category-prev-button"
              onClick={scrollShopsLeft}
            >
              ‹
            </button>
          )}

          <div
            className="categories-container"
            ref={shopsRef}
            onScroll={updateShopScrollButtons}
          >
            {shopsInMyCity?.map((shop) => (
              <ShopCard data={shop} key={shop._id} />
            ))}
          </div>

          {canShopScrollRight && (
            <button
              className="category-next-button"
              onClick={scrollShops}
            >
              ›
            </button>
          )}

        </div>
      </div>

      <div className="food">
        <h1>
          Suggested Food Items
        </h1>
        <div className="food-items">
          {itemsInCity?.map((item,index)=>(
            <FoodCard key={index} data={item}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard