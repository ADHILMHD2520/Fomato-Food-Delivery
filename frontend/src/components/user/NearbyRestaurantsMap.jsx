
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import L from "leaflet";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./NearbyRestaurantsMap.css";

import useGetAllShops from "../../hooks/useGetAllShops";

const restaurantIcon = L.divIcon({
    className: "restaurant-map-icon",
    html: "<div>🍴</div>",
    iconSize: [36, 36],
    iconAnchor: [18, 18]
});

const userIcon = L.divIcon({
    className: "user-map-icon",
    html: "<div>📍</div>",
    iconSize: [36, 36],
    iconAnchor: [18, 18]
});

// Calculate distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (value) => value * Math.PI / 180;

    const earthRadius = 6371;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
};

// Update map view when locations are loaded
function MapUpdater({ userLocation, places }) {
    const map = useMap();

    useEffect(() => {
        const points = [
            [userLocation.latitude, userLocation.longitude],
            ...places.map((place) => [place.latitude, place.longitude])
        ];

        if (points.length > 1) {
            map.fitBounds(points, { padding: [40, 40], maxZoom: 12 });
        } else {
            map.setView(
                [userLocation.latitude, userLocation.longitude],
                11
            );
        }
    }, [map, userLocation, places]);

    return null;
}

function NearbyRestaurantsMap() {
    const { userLocation, city } = useSelector(
        (state) => state.user
    );

    const { shops, loading, error } = useGetAllShops();

    const [places, setPlaces] = useState([]);
    const [mapLoading, setMapLoading] = useState(false);

    const apiKey = import.meta.env.VITE_Location_Api_Key;

    // Group shops by city and state
    const groupedShops = useMemo(() => {
        const groups = new Map();

        shops.forEach((shop) => {
            if (!shop.city) return;

            const key = `${shop.city.toLowerCase()}-${(shop.state || "").toLowerCase()}`;

            if (!groups.has(key)) {
                groups.set(key, {
                    city: shop.city,
                    state: shop.state || "",
                    shops: []
                });
            }

            groups.get(key).shops.push(shop);
        });

        return Array.from(groups.values());
    }, [shops]);

    // Get coordinates for each city
    useEffect(() => {
        if (!userLocation || !groupedShops.length || !apiKey) return;

        let cancelled = false;

        const fetchCityLocations = async () => {
            try {
                setMapLoading(true);

                const results = await Promise.all(
                    groupedShops.map(async (place) => {
                        try {
                            const searchText = [
                                place.city,
                                place.state,
                                "India"
                            ].filter(Boolean).join(", ");

                            const response = await axios.get(
                                "https://api.geoapify.com/v1/geocode/search",
                                {
                                    params: {
                                        text: searchText,
                                        limit: 1,
                                        format: "json",
                                        apiKey
                                    }
                                }
                            );

                            const result = response.data.results?.[0];

                            if (!result) return null;

                            const distance = calculateDistance(
                                userLocation.latitude,
                                userLocation.longitude,
                                result.lat,
                                result.lon
                            );

                            return {
                                ...place,
                                latitude: result.lat,
                                longitude: result.lon,
                                distance
                            };

                        } catch (error) {
                            console.log(
                                `Unable to locate ${place.city}`,
                                error
                            );

                            return null;
                        }
                    })
                );

                if (!cancelled) {
                    setPlaces(
                        results
                            .filter(Boolean)
                            .sort((a, b) => a.distance - b.distance)
                    );
                }

            } catch (error) {
                console.log("Map location error:", error);
            } finally {
                if (!cancelled) {
                    setMapLoading(false);
                }
            }
        };

        fetchCityLocations();

        return () => {
            cancelled = true;
        };

    }, [userLocation, groupedShops, apiKey]);

    if (!userLocation) {
        return (
            <div className="nearby-map-message">
                <h3>Location unavailable</h3>
                <p>Please allow location access to find nearby restaurants.</p>
            </div>
        );
    }

    if (loading || mapLoading) {
        return (
            <div className="nearby-map-message">
                Finding restaurants near you...
            </div>
        );
    }

    if (error) {
        return (
            <div className="nearby-map-message">
                Unable to load restaurants. Please try again.
            </div>
        );
    }

    if (!places.length) {
        return (
            <div className="nearby-map-message">
                <h3>No nearby restaurants found</h3>
                <p>There are currently no registered restaurant locations to show.</p>
            </div>
        );
    }

    return (
        <div className="nearby-map-section">

            <div className="nearby-map-heading">
                <div>
                    <h2>Restaurants Near You</h2>
                    <p>
                        Restaurants outside {city} are shown by nearest city.
                    </p>
                </div>

                <span>{places.length} locations</span>
            </div>

            <div className="nearby-map-layout">

                <div className="nearby-map">
                    <MapContainer
                        center={[
                            userLocation.latitude,
                            userLocation.longitude
                        ]}
                        zoom={10}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />  

                        <MapUpdater
                            userLocation={userLocation}
                            places={places}
                        />

                        <Marker
                            position={[
                                userLocation.latitude,
                                userLocation.longitude
                            ]}
                            icon={userIcon}
                        >
                            <Popup>
                                <strong>Your current location</strong>
                                <p>{city}</p>
                            </Popup>
                        </Marker>

                        {places.map((place) => (
                            <Marker
                                key={`${place.city}-${place.state}`}
                                position={[
                                    place.latitude,
                                    place.longitude
                                ]}
                                icon={restaurantIcon}
                            >
                                <Popup>
                                    <strong>{place.city}</strong>
                                    <p>{place.state}</p>
                                    <p>
                                        {place.shops.length} restaurants available
                                    </p>
                                    {place.shops.map((shop) => (
                                        <div key={shop._id}>
                                            {shop.name}
                                        </div>
                                    ))}
                                    <p>
                                        {place.distance.toFixed(1)} km away
                                    </p>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>

                <div className="nearby-place-list">
                    <h3>Closest restaurant locations</h3>

                    {places.slice(0, 5).map((place, index) => (
                        <div
                            className="nearby-place-card"
                            key={`${place.city}-${place.state}`}
                        >
                            <div className="nearby-place-number">
                                {index + 1}
                            </div>

                            <div className="nearby-place-details">
                                <h4>{place.city}</h4>
                                <p>
                                    {place.shops.length} restaurants
                                </p>
                            </div>

                            <span>
                                {place.distance.toFixed(1)} km
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default NearbyRestaurantsMap;
