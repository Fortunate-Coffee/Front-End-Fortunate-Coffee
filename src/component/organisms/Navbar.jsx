import React, { useState, useEffect } from "react";
import Searching from "../molecules/Searching";
import ShoppingCartButton from "../atoms/ShoppingCartButton";

const Navbar = () => {
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const fetchCartItemCount = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/cart`);
                const result = await response.json();
                if (response.ok) {
                    // Hitung jumlah item di keranjang belanja
                    const count = result.data.reduce((acc, item) => acc + item.quantity, 0);
                    setItemCount(count);
                } else {
                    console.error(result.error.message);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItemCount();
    }, []);

    return (
        <div className="fixed top-0 z-40 w-full h-auto bg-white flex flex-row justify-between shadow-lg px-9 py-4">
            <Searching />
            <ShoppingCartButton itemCount={itemCount} />
        </div>
    );
}

export default Navbar;
