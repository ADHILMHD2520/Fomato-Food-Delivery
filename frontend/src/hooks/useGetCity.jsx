import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCity } from "../redux/userSlice"; // adjust path if needed

function useGetCity() {
    const dispatch = useDispatch();

    const apikey = import.meta.env.VITE_Location_Api_Key;

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const result = await axios.get(
                    `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`
                );

                const city = result.data.results[0].city;

                console.log("City:", city);

                dispatch(setCity(city));

            } catch (error) {
                console.log("Error getting city:", error);
            }
        });
    }, [dispatch]);
}

export default useGetCity;