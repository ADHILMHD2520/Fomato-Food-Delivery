import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { setShopsInMyCity, setUserData } from "../redux/userSlice";

function useGetShopByCity() {

    const dispatch = useDispatch();

    const {city}=useSelector(state=>state.user)
    useEffect(() => {

        const fetchShops = async () => {
            try {
                const token = localStorage.getItem("token");
                const result = await axios.get(
                    `http://localhost:5000/api/shop/get-by-city/${city}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log(result);
                dispatch(setShopsInMyCity(result.data));
                console.log("shops in this city are ",result.data)
            } catch (error) {
                console.log(
                    "Error getting current user in useGetShopByCity.jsx",
                    error
                );
            }
        };

        fetchShops();        
    }, [city]);

}

export default useGetShopByCity;