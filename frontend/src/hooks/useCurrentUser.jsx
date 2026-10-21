import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import axios from "axios";
import { setUserData } from "../redux/userSlice";

function useCurrentUser() {

    const dispatch = useDispatch();
    useEffect(() => {

        const fetchUser = async () => {
            try {

                const token = localStorage.getItem("token");
                const result = await axios.get(
                    "http://localhost:5000/api/auth/current",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log(result);
                dispatch(setUserData(result.data));
            } catch (error) {
                console.log(
                    "Error getting current user in useCurrentUser.jsx",
                    error
                );
            }
        };

        fetchUser();        //fetchUser is only crteated inside the useEffect but not called

    }, []);

}

export default useCurrentUser;