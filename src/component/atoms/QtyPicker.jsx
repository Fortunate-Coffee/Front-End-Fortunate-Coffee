import { useState, useEffect } from "react";

const QtyPicker = ({ className, menuId, initialQty, onQtyChange }) => {
    const [qty, setQty] = useState(initialQty || 0);

    useEffect(() => {
        setQty(initialQty || 0);
    }, [initialQty]);

    const incrementQty = async () => {
        const newQty = qty + 1;
        setQty(newQty);
        onQtyChange(menuId, newQty);
        // Fungsi untuk menambahkan item ke keranjang ketika tombol "+" ditekan
        await addToCart();
    };

    const decrementQty = async () => {
        if (qty > 1) {
            const newQty = qty - 1;
            setQty(newQty);
            onQtyChange(menuId, newQty);
            await removeFromCart(); // Kurangi item dari backend
        }
    };
    

    const addToCart = async () => {
        try {
            const response = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    menu_id: menuId,
                    cart_qty: 1, // Tambah 1 item ke keranjang setiap kali tombol "+" ditekan
                    notes: "" // Catatan tambahan (jika diperlukan)
                })
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const removeFromCart = async () => {
        try {
            const response = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    menu_id: menuId,
                    cart_qty: -1,
                    notes: ""
                })
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    return(
        <div className={`${className}`}>
            <button onClick={decrementQty} className="bg-[#4caf50] rounded-full py-1 px-2 text-xs">
                <i className="fa-solid fa-minus text-white"></i>
            </button>
            <p className="px-3">{qty}</p>
            <button onClick={incrementQty} className="bg-[#4caf50] rounded-full py-1 px-2 text-xs">
                <i className="fa-solid fa-plus text-white"></i>
            </button>
        </div>
    )
}

export default QtyPicker;
