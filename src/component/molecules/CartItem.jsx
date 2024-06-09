import { useState, useEffect } from "react";
import QtyPicker from "../atoms/QtyPicker";
import { formatPrice } from "../../menu";
import DeleteButton from "../atoms/DeleteButton";

const CartItem = ({ items, setPrices, setGlobalCartItems }) => {
    const [cartItems, setCartItems] = useState(items);

    const handleDelete = async (index) => {
        try {
            const response = await fetch(`https://backend-fortunate-coffee.up.railway.app/api/v1/cart/${cartItems[index].menu_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const updatedItems = [...cartItems];
                updatedItems.splice(index, 1);
                setCartItems(updatedItems);
                setGlobalCartItems(updatedItems); // Update the parent state
                // Update prices after deleting item
                const allPrices = updatedItems.map(item => item.total);
                setPrices(allPrices);
                console.log("successful delete : ", updatedItems)
            } else {
                console.error("Failed to delete item from cart");
            }
        } catch (error) {
            console.error("Error deleting item from cart:", error);
        }
    }

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

    useEffect(() => {
        const allPrices = cartItems.map(item => item.total);
        setPrices(allPrices);
    }, [cartItems, setPrices]);

    return (
        <div className="flex flex-col mt-16">
            {cartItems.map((item, index) => (
                <div key={index} className="flex flex-row w-full justify-between items-center my-4">
                    <img 
                        src={item.menu_image}
                        alt={item.menu_name}
                        className="w-1/6 h-1/6"
                    />
                    <div className="flex flex-col w-[41%] mx-2">
                        <p className="truncate text-left font-semibold">{item.menu_name}</p>
                        <p className="truncate text-left font-light text-sm">{item.notes}</p>
                        <p className="text-left">Rp. {formatPrice(item.menu_price)}</p>
                    </div>
                    <div className="flex flex-row w-3/12">
                        <QtyPicker className="flex justify-start" menuId={item.menu_id} initialQty={item.quantity} onQtyChange={handleQtyChange} />
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
