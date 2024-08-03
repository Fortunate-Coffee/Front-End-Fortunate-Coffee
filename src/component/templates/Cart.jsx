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
    const [tableNumber, setTableNumber] = useState(null);
    const [customerName, setCustomerName] = useState('');
    const [total, setTotal] = useState(0);
    const [editedNotes, setEditedNotes] = useState({});

    useEffect(() => {
        // Retrieve table number from local storage
        const savedTable = localStorage.getItem('tableNumber');
        if (savedTable) {
            setTableNumber(savedTable);
        }
    }, []);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/cart`);
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

    useEffect(() => {
        // Hitung total dari prices
        const subtotal = prices.reduce((acc, curr) => acc + curr, 0);
        const tax = subtotal * 0.11;
        const calculatedTotal = subtotal + tax;
        setTotal(calculatedTotal); // Atur nilai total ke dalam state
    }, [prices]);

    if (error) {
        return <div className="flex justify-center items-center h-screen">{error}</div>;
    }

    const handleNotesChange = (menuId, newNotes) => {
        setEditedNotes({ ...editedNotes, [menuId]: newNotes });
        const savedNotes = JSON.parse(localStorage.getItem('cartNotes')) || {};
        savedNotes[menuId] = newNotes;
        localStorage.setItem('cartNotes', JSON.stringify(savedNotes));
    };

    return (
        <div className="">
            <div className='fixed top-0 z-10 w-full h-auto bg-white shadow-lg flex px-7 py-4'>
                <BackButton />
                <h1 className="grow font-medium">Your Cart</h1>
            </div>
            {loading ? (
                <div className="animate-pulse"></div>
            ) : (
                <div className="mx-7 my-4">
                    {isEmpty ? (
                        <div className="flex justify-center items-center h-screen">
                            <p className="">Your cart is empty.</p>
                        </div>
                    ) : (
                        <div className="h-screen">
                            <CartItem items={cartItems} setPrices={setPrices} setGlobalCartItems={setCartItems} editedNotes={editedNotes} onNotesChange={handleNotesChange}/>
                            <div className="flex mt-10">
                                <p className='flex items-center w-6/12 font-semibold'>Name</p>
                                <input type="text" maxLength={20} className="w-6/12 truncate bg-[#E8E8E8] font-semibold p-2 placeholder:font-medium block hover:border-none focus:outline-none rounded-xl text-center" placeholder="Your Name" value={customerName} onChange={e => setCustomerName(e.target.value)} />
                            </div>
                            <div className="flex mt-3">
                                <p className='flex items-center w-10/12 font-semibold'>Table Number</p>
                                <p className="w-2/12 truncate font-semibold text-right">{tableNumber}</p>
                            </div>
                            <TotalPayment prices={prices} />
                            <OrderButton cartItems={cartItems} setCartItems={setCartItems} customerName={customerName} tableNumber={tableNumber} total={total} editedNotes={editedNotes}/>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Cart;
