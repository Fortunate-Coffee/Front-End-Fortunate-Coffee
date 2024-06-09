import { useState, useEffect } from "react";
import BackButton from '../atoms/BackButton';
import CartItem from '../molecules/CartItem';
import TotalPayment from '../molecules/TotalPayment';
import OrderButton from '../atoms/OrderButton';

const Cart = () => {
    const [prices, setPrices] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/cart');
                const result = await response.json();
                if (response.ok) {
                    setCartItems(result.data);
                    const allPrices = result.data.map(item => item.total);
                    setPrices(allPrices);
                } else {
                    setError(result.error.message);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        if(cartItems.length === 0) {
            <div className="flex justify-center items-center h-screen">
                <p className="">Your cart is empty.</p>
            </div>
        };
    }, [cartItems]);

    useEffect(() => {
        setIsEmpty(cartItems.length === 0);
    }, [cartItems]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">{error}</div>;
    }

    return (
        <div className="">
            <div className='fixed top-0 z-0 w-full h-auto bg-white shadow-lg flex px-7 py-4'>
                <BackButton />
                <h1 className="grow font-medium">Your Cart</h1>
            </div>
            <div className="mx-7 my-4">
                {isEmpty ? (
                    <div className="flex justify-center items-center h-screen">
                        <p className="">Your cart is empty.</p>
                    </div>
                ) : (
                    <div>
                        <CartItem items={cartItems} setPrices={setPrices} setGlobalCartItems={setCartItems}/>
                        <div className="flex mt-10">
                            <p className='flex items-center w-6/12 font-semibold'>Name</p>
                            <input type="text" className="w-6/12 truncate bg-[#E8E8E8] font-semibold p-2 placeholder:font-medium block hover:border-none focus:outline-none rounded-xl text-center" placeholder="Your Name" />
                        </div>
                        <div className="flex mt-3">
                            <p className='flex items-center w-10/12 font-semibold'>Table Number</p>
                            <p className="w-2/12 truncate font-semibold text-right">1</p>
                        </div>
                        <TotalPayment prices={prices} />
                        <OrderButton />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
