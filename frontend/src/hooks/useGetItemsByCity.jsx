import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { setItemsInCity } from "../redux/userSlice";

function useGetItemsByCity() {

    const dispatch = useDispatch();

    const {city}=useSelector(state=>state.user)
    useEffect(() => {

        const fetchItems = async () => {
            try {
                const token = localStorage.getItem("token");
                const result = await axios.get(
                    `http://localhost:5000/api/item/get-by-city/${city}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log(result);
                dispatch(setItemsInCity(result.data));
                console.log("items in this city are ",result.data)
            } catch (error) {
                console.log(
                    "Error getting current user in useGetShopByCity.jsx",
                    error
                );
            }
        };

        fetchItems();        
    }, [city]);

}

export default useGetItemsByCity;