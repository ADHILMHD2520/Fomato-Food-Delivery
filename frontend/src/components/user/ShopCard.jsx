import React, { useRef, useState } from 'react';
import "./CategoryCard.css"


function ShopCard({ data }) {
    return (
        <div className="category-card">
            <img
                src={`${data.image}?w=400&q=70`}
                alt={data.name}
                className="category-image"
                loading="lazy"
                decoding="async"
            />
            <div className="category-info">
                {data.name}
            </div>
        </div>
    )
}

export default ShopCard