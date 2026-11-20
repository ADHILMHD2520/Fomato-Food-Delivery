
import React, { useMemo, useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";

import UserNavbar from "../../components/user/UserNavbar";
import useGetAllShops from "../../hooks/useGetAllShops";

import "./Restaurant.css";

function Restaurant() {
    const { shops, loading, error } = useGetAllShops();
    const [search, setSearch] = useState("");

    const filteredShops = useMemo(() => {
        const value = search.toLowerCase().trim();

        if (!value) return shops;

        return shops.filter((shop) =>
            [shop.name, shop.city, shop.state, shop.address]
                .filter(Boolean)
                .some((item) => item.toLowerCase().includes(value))
        );
    }, [shops, search]);

    return (
        <div className="restaurants-page">

            <UserNavbar />

            <main className="restaurants-main">

                <section className="restaurants-heading">
                    <div>
                        <span>DISCOVER YOUR NEXT FAVOURITE</span>
                        <h1>Explore Restaurants</h1>
                        <p>
                            Discover amazing restaurants from different cities.
                        </p>
                    </div>

                    <div className="restaurant-total">
                        <strong>{shops.length}</strong>
                        <span>Restaurants</span>
                    </div>
                </section>

                <section className="restaurants-toolbar">

                    <div className="restaurants-search">
                        <FiSearch />

                        <input
                            type="text"
                            placeholder="Search restaurants or cities..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <p>{filteredShops.length} restaurants found</p>

                </section>

                {loading && (
                    <div className="restaurant-message">
                        Loading restaurants...
                    </div>
                )}

                {!loading && error && (
                    <div className="restaurant-message">
                        {error}
                    </div>
                )}

                {!loading && !error && filteredShops.length === 0 && (
                    <div className="restaurant-message">
                        No restaurants found.
                    </div>
                )}

                {!loading && !error && (
                    <section className="restaurants-grid">
                        {filteredShops.map((shop) => (
                            <article
                                className="restaurant-card"
                                key={shop._id}
                            >
                                <div className="restaurant-image">
                                    <img
                                        src={shop.image}
                                        alt={shop.name}
                                    />
                                </div>

                                <div className="restaurant-details">

                                    <h2>{shop.name}</h2>

                                    <p>
                                        <FiMapPin />
                                        {[shop.city, shop.state]
                                            .filter(Boolean)
                                            .join(", ") || shop.address}
                                    </p>
                                </div>

                            </article>
                        ))}

                    </section>
                )}

            </main>
        </div>
    );
}

export default Restaurant;
