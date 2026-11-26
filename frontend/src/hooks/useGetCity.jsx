import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCity, setUserLocation } from "../redux/userSlice"; 
import { setLocation,setAddress } from "../redux/mapSlice";

function useGetCity() {
    const dispatch = useDispatch();

    const apikey = import.meta.env.VITE_Location_Api_Key;

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                dispatch(setUserLocation({
                    latitude,longitude
                }))

                dispatch(setLocation({lat:latitude,lon:longitude}))     // for mapSlice

                const result = await axios.get(
                    `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`
                );

                const city = result.data.results[0].city || "Kadiyangad Palam";
                // const city = "Kadiyangad Palam";

                console.log("City:", city);

                dispatch(setCity(city));

                console.log("Full address:", result.data.results[0].address_line2);

                dispatch(setAddress(result.data.results[0].address_line2));     // for address in mapSlice
            } catch (error) {
                console.log("Error getting city:", error);
            }
        });
    }, [dispatch]);
}

export default useGetCity;