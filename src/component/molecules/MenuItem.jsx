import { useState, useEffect } from "react";
import { formatPrice } from "../../menu";
import QtyPicker from "../atoms/QtyPicker";
import NoteButton from "../atoms/NoteButton";

const MenuItem = ({ items }) => {
    const [menuItems, setMenuItems] = useState(items);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/cart');
                const result = await response.json();
                if (response.ok) {
                    const cartItems = result.data;
                    const updatedMenuItems = menuItems.map(menuItem => {
                        const cartItem = cartItems.find(item => item.menu_id === menuItem.menu_id);
                        return cartItem ? { ...menuItem, cart_qty: cartItem.quantity } : menuItem;
                    });
                    setMenuItems(updatedMenuItems);
                } else {
                    console.error(result.error.message);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const handleQtyChange = (menuId, newQty) => {
        const updatedItems = menuItems.map(item => {
            if (item.menu_id === menuId) {
                return { ...item, cart_qty: newQty };
            }
            return item;
        });
        setMenuItems(updatedItems);
    };

    return (
        <div className="flex flex-col">
            {menuItems.map((item, index) => (
                <div key={index} className="flex flex-row w-full justify-between my-4">
                    <img 
                        src={item.menu_image}
                        alt={item.menu_name}
                        className="w-2/12 rounded-lg shadow-lg h-14 lg:w-32 lg:h-32 hover:scale-105"
                    />
                    <div className="flex flex-col w-6/12">
                        <p className="text-left">{item.menu_name}</p>
                        <QtyPicker className="flex items-center justify-start mt-1" menuId={item.menu_id} initialQty={item.cart_qty || 0} onQtyChange={handleQtyChange} />
                    </div>
                    <div className="flex flex-col w-3/12">
                        <p className="text-right">Rp. {formatPrice(item.menu_price)}</p>
                        <NoteButton categoryName={item.category.category_name} menuName={item.menu_name}/>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MenuItem;
