import { useState, useEffect } from "react";
import QtyPicker from "../atoms/QtyPicker";
import { formatPrice } from "../../menu";
import DeleteButton from "../atoms/DeleteButton";

const CartItem = ({ items, setPrices, setGlobalCartItems, editedNotes, onNotesChange }) => {
    const [cartItems, setCartItems] = useState(items);
    const [loading, setLoading] = useState(true);
    const [focusedItemId, setFocusedItemId] = useState(null);

    useEffect(() => {
        const fetchMaxStock = async (item) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/menu/${item.menu_id}`);
                const data = await response.json();
                return { ...item, maxStockCanBeMade: data.maxStockCanBeMade };
            } catch (error) {
                console.error('Error fetching max stock:', error);
                return item; // Return item without modification if fetch fails
            }
        };

        const fetchAllMaxStock = async () => {
            const savedNotes = JSON.parse(localStorage.getItem('cartNotes')) || {};
            const updatedItems = await Promise.all(items.map(async (item) => {
                const itemWithMaxStock = await fetchMaxStock(item);
                return {
                    ...itemWithMaxStock,
                    notes: savedNotes[item.menu_id] || item.notes,
                };
            }));
            setCartItems(updatedItems);
            setLoading(false);
        };

        fetchAllMaxStock();
    }, [items]);

    const handleDelete = async (index) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/cart/${cartItems[index].menu_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const updatedItems = [...cartItems];
                const deletedItem = updatedItems.splice(index, 1)[0];
                setCartItems(updatedItems);
                setGlobalCartItems(updatedItems); // Update the parent state
                // Update prices after deleting item
                const allPrices = updatedItems.map(item => item.total);
                setPrices(allPrices);
                
                // Delete notes from local storage
                const savedNotes = JSON.parse(localStorage.getItem('cartNotes')) || {};
                delete savedNotes[deletedItem.menu_id];
                localStorage.setItem('cartNotes', JSON.stringify(savedNotes));

                console.log("successful delete : ", updatedItems);
            } else {
                console.error("Failed to delete item from cart");
            }
        } catch (error) {
            console.error("Error deleting item from cart:", error);
        }
    };

    const handleQtyChange = (menuId, newQty) => {
        const updatedItems = cartItems.map(item => {
            if (item.menu_id === menuId) {
                return { ...item, quantity: newQty, total: item.menu_price * newQty };
            }
            return item;
        });
        setCartItems(updatedItems);
        setGlobalCartItems(updatedItems);
        const allPrices = updatedItems.map(item => item.total);
        setPrices(allPrices);
    };

    // const handleNotesChange = (menuId, newNotes) => {
    //     setEditedNotes({ ...editedNotes, [menuId]: newNotes });
    //     const savedNotes = JSON.parse(localStorage.getItem('cartNotes')) || {};
    //     savedNotes[menuId] = newNotes;
    //     localStorage.setItem('cartNotes', JSON.stringify(savedNotes));
    // };
    const handleSaveNotes = async (menuId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/cart/${menuId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ notes: editedNotes[menuId] }),
            });
            if (response.ok) {
                const updatedItems = cartItems.map(item => {
                    if (item.menu_id === menuId) {
                        return { ...item, notes: editedNotes[menuId] };
                    }
                    return item;
                });
                setCartItems(updatedItems);
                setGlobalCartItems(updatedItems);
                editedNotes(prev => {
                    const newNotes = { ...prev };
                    delete newNotes[menuId];
                    return newNotes;
                });
            } else {
                console.error("Failed to update notes");
            }
        } catch (error) {
            console.error("Error updating notes:", error);
        }
    };

    const handleFocus = (menuId) => {
        setFocusedItemId(menuId);
    };

    const handleBlur = () => {
        setFocusedItemId(null);
    };

    useEffect(() => {
        const allPrices = cartItems.map(item => item.total);
        setPrices(allPrices);
    }, [cartItems, setPrices]);

    if (loading) {
        return (
            <div className="flex flex-col mt-16 animate-pulse">
                {Array(cartItems.length).fill().map((_, index) => (
                    <div key={index} className="flex flex-row w-full justify-between items-center my-4">
                        <div className="w-14 h-14 bg-gray-300 rounded"></div>
                        <div className="flex flex-col w-[41%] mx-2">
                            <div className="bg-gray-300 h-4 w-14 mb-2 rounded"></div>
                            <div className="bg-gray-300 h-4 w-24 mb-1 rounded"></div>
                        </div>
                        <div className="flex flex-row w-5/12">
                            <div className="flex items-center justify-center">
                                <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
                                <div className="bg-gray-300 h-2 w-6 rounded mx-3"></div>
                                <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex flex-row w-1/12 text-right">
                            <div className="bg-gray-300 h-4 w-4 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col mt-16">
            {cartItems.map((item, index) => (
                <div key={index} className="flex flex-row w-full justify-between items-center my-4">
                    <div className="w-12">
                        <img 
                        src={item.menu_image}
                        alt={item.menu_name}
                        className="w-12 h-12 rounded-lg shadow-lg"
                    />
                    </div>
                    <div className="flex flex-col w-[41%] mx-2">
                        <p className="truncate text-left font-semibold">{item.menu_name}</p>
                        {/* <p className="truncate text-left font-light text-sm">{item.notes}</p> */}
                        <form>
                            <div className="my-1 flex items-center">
                                <label className="italic text-sm text-[#4caf50]">Notes: </label>
                                <input 
                                    type="text" 
                                    maxLength={20}
                                    className="bg-gray-200 rounded-lg px-2 py-1 truncate text-left font-light text-sm w-16 lg:w-full mx-1" 
                                    value={editedNotes[item.menu_id] !== undefined ? editedNotes[item.menu_id] : item.notes}
                                    onChange={(e) => onNotesChange(item.menu_id, e.target.value)}
                                    onFocus={() => handleFocus(item.menu_id)}
                                    onBlur={handleBlur}
                                />
                                {focusedItemId === item.menu_id && (
                                    <button 
                                        type="button" 
                                        className="text-green-500" 
                                        onClick={() => handleSaveNotes(item.menu_id)}
                                    >
                                        <i className="fa-solid fa-check"></i>
                                    </button>
                                )}
                            </div>
                        </form>
                        <p className="text-left">Rp. {formatPrice(item.menu_price)}</p>
                    </div>
                    <div className="flex flex-row w-4/12">
                        <QtyPicker className="flex justify-start" menuId={item.menu_id} initialQty={item.quantity} onQtyChange={handleQtyChange} maxStockCanBeMade={item.maxStockCanBeMade}/>
                    </div>
                    <div className="flex flex-row w-1/12 text-right">
                        <DeleteButton onClick={() => handleDelete(index)} className="flex justify-start" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CartItem;
