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
    const [previousQty, setPreviousQty] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [notes, setNotes] = useState("");
    const [isOutOfStock, setIsOutOfStock] = useState(false);
    const [maxStock, setMaxStock] = useState(0);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                // Ambil semua menu dari backend
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/menu`);
                const menus = await response.json();

                // Cari menu berdasarkan menuName
                const menuItem = menus.find(item => item.menu_name === decodeURIComponent(menuName));

                if (menuItem) {
                    // Jika ditemukan, ambil detail menu berdasarkan ID
                    const detailResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/menu/${menuItem.menu_id}`);
                    const detailData = await detailResponse.json();
                    setSelectedItem(detailData);
                    
                    // Ambil notes dari local storage
                    const savedNotes = JSON.parse(localStorage.getItem('cartNotes')) || {};
                    setNotes(savedNotes[detailData.menu_id] || ''); // Set notes ke state jika ada di local storage

                    // Check if item is out of stock
                    setIsOutOfStock(detailData.isOutOfStock);

                    // Set max stock
                    setMaxStock(detailData.maxStockCanBeMade);

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

        fetchMenuItems();
        fetchCartItemCount();
    }, [menuName]);

    useEffect(() => {
        const fetchCartItem = async () => {
            if (selectedItem) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/cart`);
                    const result = await response.json();
                    if (response.ok) {
                        const cartItem = result.data.find(item => item.menu_id === selectedItem?.menu_id);
                        if (cartItem) {
                            const savedNotes = JSON.parse(localStorage.getItem('cartNotes')) || {};
                            setNotes(savedNotes[selectedItem.menu_id] || '');
                            setQty(cartItem.quantity);
                            setIsInCart(true);
                            setPreviousQty(cartItem.quantity);
                        }
                    } else {
                        console.error(result.error.message);
                    }
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
            }
        };

        fetchCartItem();
    }, [selectedItem]);

    const incrementQty = async () => {
        if (qty < maxStock) {
            const newQty = qty + 1;
            setQty(newQty);
        }
    };

    const decrementQty = async () => {
        if (qty > 1) {
            const newQty = qty - 1;
            setQty(newQty);
        }
    };
    const handleAddToCart = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/cart`, {
                method: isInCart ? 'PUT' : 'POST',
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
            console.log('Item added to Cart:', result);

            const qtyDifference = qty - previousQty;
            setItemCount(prevCount => prevCount + qtyDifference);
            setPreviousQty(qty);

            // Update local storage notes upon successful addition
            const savedNotes = JSON.parse(localStorage.getItem('cartNotes')) || {};
            savedNotes[selectedItem.menu_id] = notes;
            localStorage.setItem('cartNotes', JSON.stringify(savedNotes));
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    return (
        <div>
            <div className='fixed top-0 z-40 w-full h-auto bg-white shadow-lg flex px-7 py-4'>
                <BackButton />
                <h1 className="grow font-medium">Details</h1>
                <ShoppingCartButton itemCount={itemCount} />
            </div>
            {loading ? (
                <div className="fa-fade mt-16 animate-pulse">
                    <div className="bg-gray-300 h-72 w-full rounded-lg"></div>
                    <div className="my-6 mx-7">
                        <div className="flex font-semibold">
                            <div className="w-8/12 bg-gray-300 h-6 rounded"></div>
                            <div className="w-2/12 bg-gray-300 h-6 rounded ml-auto"></div>
                        </div>
                        <div className="py-2 my-4 font-extralight text-justify">
                            <div className="bg-gray-300 h-28 rounded"></div>
                        </div>
                        <div className="bg-gray-300 h-20 rounded my-3"></div>
                        <div className="flex items-center justify-center mt-3">
                            <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
                            <div className="bg-gray-300 h-6 w-12 rounded mx-3"></div>
                            <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
                        </div>
                        <div className="bg-gray-300 h-14 rounded mt-8"></div>
                    </div>
                </div>
            ) : (
                selectedItem ? (
                    <div>
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
                            {isOutOfStock ? (
                                <p className="text-red-500 mt-2">Out of stock</p>
                            ) : (
                                <div>
                                    <div className="py-2 font-extralight text-justify">
                                        <p>{selectedItem.menu_desc}</p>
                                    </div>
                                    <TextArea value={notes} onChange={e => setNotes(e.target.value)} />
                                    <div className="flex items-center justify-center mt-1">
                                        <button onClick={decrementQty} className={`bg-[#4caf50] rounded-full py-1 px-2 text-xs ${isOutOfStock ? 'cursor-not-allowed opacity-50' : ''}`}>
                                            <i className="fa-solid fa-minus text-white"></i>
                                        </button>
                                        <p className="px-3">{qty}</p>
                                        {qty < maxStock ? (
                                            <button onClick={incrementQty} className={`bg-[#4caf50] rounded-full py-1 px-2 text-xs ${isOutOfStock ? 'cursor-not-allowed opacity-50' : ''}`}>
                                                <i className="fa-solid fa-plus text-white"></i>
                                            </button>
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                    <AddToCartButton onClick={handleAddToCart} disabled={qty === 0 || isOutOfStock} isInCart={isInCart} />
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="my-72 text-center text-gray-700 fa-beat">Menu item not found.</div>
                )
            )}
        </div>
    );
}

export default DetailMenu;
