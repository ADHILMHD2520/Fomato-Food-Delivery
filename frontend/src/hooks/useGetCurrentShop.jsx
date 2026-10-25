import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import axios from "axios";
import { setShopData } from "../redux/ownerSlice";

function useGetCurrentShop() {

    const dispatch = useDispatch();
    useEffect(() => {

        const fetchShop = async () => {
            try {

                const token = localStorage.getItem("token");
                const result = await axios.get(
                    "http://localhost:5000/api/shop/get-shop",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log(result);
                dispatch(setShopData(result.data));
            } catch (error) {
                console.log(
                    "Error getting current shop in useGetCurrentShop.jsx",
                    error
                );
            }
        };

        fetchShop();        

    }, []);

}

export default useGetCurrentShop;