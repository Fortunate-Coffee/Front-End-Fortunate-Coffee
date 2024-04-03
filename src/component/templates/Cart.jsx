import { useState } from "react"
import BackButton from '../atoms/BackButton';
import CartItem from '../molecules/CartItem';
import ShoppingCartButton from '../atoms/ShoppingCartButton';
import TotalPayment from '../molecules/TotalPayment';
import OrderButton from '../atoms/OrderButton';

const Cart = () => {
    // State untuk menyimpan semua harga
    const [prices, setPrices] = useState([]);

    // Fungsi untuk menangani perubahan harga dari CartItem
    const handlePriceChange = (newPrices) => {
        setPrices(newPrices);
    };

    return(
        <div className="">
            <div className='fixed top-0 z-0 w-full h-auto bg-white shadow-lg flex px-7 py-4'>
                <BackButton />
                <h1 className="grow font-medium">Your Cart</h1>
                <ShoppingCartButton />
            </div>
            <div className="mx-7 my-4">
                {/* Cek apakah ada item yang ditampilkan dalam CartItem */}
                <CartItem setPrices={handlePriceChange} />
                {/* Tampilkan TotalPayment hanya jika ada item yang ditampilkan dalam CartItem */}
                {prices.length > 0 ? (
                    <>
                        <div className="flex mt-10">
                            <p className='flex items-center w-10/12 font-semibold'>Table Number</p>
                            <input type="number" min={1} className="w-2/12 truncate bg-[#E8E8E8] font-semibold p-2 placeholder:font-medium block hover:border-none focus:outline-none rounded-xl text-center" placeholder="1" />
                        </div>
                        <TotalPayment prices={prices} />
                    </>
                ) : (
                    <div className="flex justify-center items-center h-screen">
                        <p className="">Your cart is empty.</p>
                    </div>
                )}
                <OrderButton />
            </div>
        </div>
    );
}

export default Cart;
