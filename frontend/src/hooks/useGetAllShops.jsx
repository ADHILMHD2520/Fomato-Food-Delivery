
import { useEffect, useState } from "react";
import axios from "axios";

function useGetAllShops() {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAllShops = async () => {
            try {
                setLoading(true);

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:5000/api/shop/get-all-shops",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setShops(response.data || []);

            } catch (error) {
                console.error(error);
                setError(
                    error.response?.data?.message ||
                    "Unable to fetch restaurants"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchAllShops();
    }, []);

    return { shops, loading, error };
}

export default useGetAllShops;
