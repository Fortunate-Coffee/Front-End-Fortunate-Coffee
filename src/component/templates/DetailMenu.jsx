import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatPrice } from "../../menu";
import BackButton from "../atoms/BackButton";
import TextArea from "../atoms/TextArea";
import ShoppingCartButton from "../atoms/ShoppingCartButton";
import AddToCartButton from "../atoms/AddToCartButton";

const DetailMenu = () => {
    const { menuName } = useParams();
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [notes, setNotes] = useState("");

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                // Ambil semua menu dari backend
                const response = await fetch(`https://backend-fortunate-coffee.up.railway.app/api/v1/menu`);
                const menus = await response.json();

                // Cari menu berdasarkan menuName
                const menuItem = menus.find(item => item.menu_name === decodeURIComponent(menuName));

                if (menuItem) {
                    // Jika ditemukan, ambil detail menu berdasarkan ID
                    const detailResponse = await fetch(`https://backend-fortunate-coffee.up.railway.app/api/v1/menu/${menuItem.menu_id}`);
                    const detailData = await detailResponse.json();
                    setSelectedItem(detailData);
                } else {
                    setSelectedItem(null);
                }
            } catch (error) {
                console.error('Error fetching menu items:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCartItemCount = async () => {
            try {
                const response = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/cart');
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

        fetchMenuItems();
        fetchCartItemCount();
    }, [menuName]);

    useEffect(() => {
        if (selectedItem) {
            fetchCartItems();
        }
    }, [selectedItem]);

    const fetchCartItems = async () => {
        try {
            const response = await fetch(`https://backend-fortunate-coffee.up.railway.app/api/v1/cart`);
            const result = await response.json();
            if (response.ok) {
                // Cari item yang sesuai dengan menu yang sedang dilihat
                const cartItem = result.data.find(item => item.menu_id === selectedItem?.menu_id);
                if (cartItem) {
                    setQty(cartItem.quantity);
                } else {
                    setQty(0);
                }
            } else {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const incrementQty = async () => {
        const newQty = qty + 1;
        setQty(newQty);
    };

    const decrementQty = async () => {
        if (qty > 1) {
            const newQty = qty - 1;
            setQty(newQty);
        }
    };
    const handleAddToCart = async () => {
        try {
            const response = await fetch(`https://backend-fortunate-coffee.up.railway.app/api/v1/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    menu_id: selectedItem.menu_id,
                    cart_qty: qty,
                    notes: notes
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }
            const result = await response.json();
            console.log('Category added:', result);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    if (loading) {
        return <div className="my-72 text-center text-gray-700 fa-beat">Loading...</div>;
    }

    if (!selectedItem) {
        return <div className="my-72 text-center text-gray-700 fa-beat">Menu item not found.</div>;
    }

    return (
        <div>
            <div className='fixed top-0 z-40 w-full h-auto bg-white shadow-lg flex px-7 py-4'>
                <BackButton />
                <h1 className="grow font-medium">Details</h1>
                <ShoppingCartButton itemCount={itemCount} />
            </div>
            <img 
                src={selectedItem.menu_image}
                alt={selectedItem.menu_name}
                className="mt-16 w-full h-72"
            />
            <div className="mx-7 my-6">
                <div className="flex font-semibold">
                    <p className="w-8/12">{selectedItem.menu_name}</p>
                    <p className="w-4/12 text-right">Rp. {formatPrice(selectedItem.menu_price)}</p>
                </div>
                <div className="py-2 font-extralight text-justify">
                    <p>{selectedItem.menu_desc}</p>
                </div>
                <TextArea value={notes} onChange={e => setNotes(e.target.value)} />
                <div className="flex items-center justify-center mt-1">
                    <button onClick={decrementQty} className="bg-[#4caf50] rounded-full py-1 px-2 text-xs">
                        <i className="fa-solid fa-minus text-white"></i>
                    </button>
                    <p className="px-3">{qty}</p>
                    <button onClick={incrementQty} className="bg-[#4caf50] rounded-full py-1 px-2 text-xs">
                        <i className="fa-solid fa-plus text-white"></i>
                    </button>
                </div>
                <AddToCartButton onClick={handleAddToCart} disabled={qty === 0}/>
            </div>
        </div>
    );
}

export default DetailMenu;
