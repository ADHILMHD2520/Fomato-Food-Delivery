
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import "./HeroBanner.css";

function HeroBanner({ onOrderClick }) {
    return (
        <section className="hero-banner">

            <div className="hero-content">

                <span className="hero-subtitle">
                    Order Your Favourite Food ✨
                </span>

                <h1>
                    Delicious Food
                    <br />
                    Delivered <span>to You</span>
                </h1>

                <p>
                    Explore top restaurants, discover new dishes,
                    <br />
                    and get it delivered fast.
                </p>

                <button
                    className="hero-order-btn"
                    onClick={onOrderClick}
                >
                    Order Now
                    <FaArrowRight />
                </button>

                <div className="hero-dots">
                    <span className="active"></span>
                    <span></span>
                    <span></span>
                </div>

            </div>

            <div className="hero-image">
                <img
                    src="/images/hero-biryani.png"
                    alt="Delicious chicken biryani"
                />
            </div>

        </section>
    );
}

export default HeroBanner;
