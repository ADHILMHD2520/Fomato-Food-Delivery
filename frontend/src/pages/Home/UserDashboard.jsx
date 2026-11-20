import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import './UserDashboard.css'

import UserNavbar from '../../components/user/UserNavbar';

import HeroBanner from "../../components/user/HeroBanner";
import categories from "../../data/categories"
import CategoryCard from '../../components/user/CategoryCard';
import ShopCard from "../../components/user/ShopCard";
import FoodCard from "../../components/user/FoodCard";
import NearbyRestaurantsMap from "../../components/user/NearbyRestaurantsMap";

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


  const hasShops = shopsInMyCity?.length > 0;

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
    <div className="container">
      <UserNavbar />

      <HeroBanner
        onOrderClick={() => {
          categoriesRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }}
      />
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




      {hasShops ? (
        <div className="shops">
          <h1>Best Shops in {city}</h1>

          <div className="shops-wrapper">

            {canShopScrollLeft && (
              <button
                className="category-prev-button"
                onClick={scrollShopsLeft}
              >
                ‹
              </button>
            )}

            <div
              className="shop-container"
              ref={shopsRef}
              onScroll={updateShopScrollButtons}
            >
              {shopsInMyCity?.map((shop) => (
                <ShopCard
                  data={shop}
                  key={shop._id}
                />
              ))}
            </div>

            {canShopScrollRight && (
              <button
                className="category-next-button"
                onClick={scrollShopsRight}
              >
                ›
              </button>
            )}

          </div>
        </div>
      ) : (
        <div className="no-shops">
          <h2>No shops available in {city}</h2>
          <p>
            We're sorry! There are currently no restaurants
            available in your selected location.
          </p>
        </div>
      )}

      {hasShops ? (
        <div className="food">
          <h1>Suggested Food Items</h1>

          <div className="food-items">
            {itemsInCity?.map((item, index) => (
              <FoodCard
                key={item._id || index}
                data={item}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="food">
          <NearbyRestaurantsMap />
        </div>
      )}
    </div>
  );
}

export default UserDashboard;