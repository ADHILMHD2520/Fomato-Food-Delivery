import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setLocation } from "../../redux/mapSlice";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "./Checkout.css"
import "leaflet/dist/leaflet.css"

import { FaLocationDot } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";

const apikey = import.meta.env.VITE_Location_Api_Key;

const RecentreMap = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location.lat != null && location.lon != null) {
      map.setView(
        [location.lat, location.lon],
        map.getZoom(),
        { animate: true }
      );
    }
  }, [location.lat, location.lon, map]);
  return null;
};



const Checkout = () => {
  const { location, address } = useSelector(state => state.map)
  console.log("first==", location.lat)

  const dispatch = useDispatch();

  const onDragend = (e) => {
    console.log(e.target.getLatLng())      // it stores the latitude and longitude of marker that is at the ened
    const { lat, lng } = e.target.getLatLng()
    dispatch(setLocation({ lat, lon: lng }));
    getAddresByLatLong(lat, lng, dispatch)
  }

  const getAddresByLatLong = async (lat, lng) => {
    try {

      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apikey}`
      );
      console.log(result.data.results[0].address_line2)

      dispatch(setAddress(result.data.results[0].address_line2))
    } catch (error) {
      console.log(error)
    }
  }

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        dispatch(setLocation({ lat: latitude, lon: longitude }));
        await getAddresByLatLong(latitude, longitude, dispatch);
      } catch (error) {
        console.log("Error getting current location:", error);
      }
    },
      (error) => {
        console.log("Geolocation error:", error.message);
      }
    );
  };

  const getLatLngByAddress = async () => {
    try {
      const result = await axios.get("https://api.geoapify.com/v1/geocode/search", {
        params: {
          text: address,
          apiKey: apikey,
          format: "json",
          limit: 1
        }
      });

      const locationData = result.data.results[0];
      console.log("locationData===",locationData)

      if (!locationData) {
        console.log("Location not found");
        return;
      }
      const { lat, lon } = locationData;
      dispatch(setLocation({ lat, lon }));
      dispatch(setAddress(locationData.address_line2 || locationData.formatted));
    } catch (error) {
      console.log("Error searching location:", error);
    }
  };


  return (
    <main className="checkout-page">
      <section className="checkout-card">
        <h1 className="checkout-title">Checkout</h1>

        <section className="checkout-section">
          <h2 className="checkout-label">
            <span className="location-icon">
              <FaLocationDot />
            </span>
            Delivery Location
          </h2>
          <div className="address-controls">
            <input
              type="text"
              value={address}
              onChange={(e) => dispatch(setAddress(e.target.value))}
              placeholder="Enter your delivery address"
            />
            <button type="button" className='search-button' onClick={getLatLngByAddress}>
              <IoSearchOutline />
            </button>
            <button type="button" className="icon-button locate-button" aria-label="Location" onClick={getCurrentLocation}>
              ⌖
            </button>
          </div>
          <div className='map-header-line'>
            <div className='h-64 w-full flex items-center justify-center'>
              <MapContainer
                className="map-container"
                center={[location.lat, location.lon]}
                zoom={13}
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <RecentreMap location={location} />
                <Marker position={[location.lat, location.lon]} draggable eventHandlers={{ dragend: onDragend }} />


              </MapContainer>
            </div>

          </div>
        </section>

        <section className="checkout-section">
          <h2 className="checkout-label">Payment Method</h2>
          <div className="payment-options">
            <label className="payment-option">
              <input type="radio" name="paymentMethod" defaultChecked />
              <span className="payment-icon cod-icon">₹</span>
              <span className="payment-copy">
                <strong>Cash on Delivery</strong>
                <small>Pay when your food arrives</small>
              </span>
            </label>

            <label className="payment-option">
              <input type="radio" name="paymentMethod" />
              <span className="payment-icon online-icon">▣</span>
              <span className="payment-copy">
                <strong>UPI / Credit / Debit Card</strong>
                <small>Pay securely online</small>
              </span>
            </label>
          </div>
        </section>

        
        <section className="checkout-section order-summary">
          <h2 className="checkout-label">Order Summary</h2>
          <div className="summary-box">
            <div className="summary-row item-row">
              <span>Corn Pizza × 1</span>
              <span>₹199.00</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row">
              <strong>Subtotal</strong>
              <strong>₹199.00</strong>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>₹40.00</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row total-row">
              <strong>Total</strong>
              <strong>₹239.00</strong>
            </div>
          </div>
        </section>

        <button type="button" className="place-order-button">Place Order</button>
      </section>
    </main>
  );
};

export default Checkout;
