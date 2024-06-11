import { useState } from "react";

const OrderButton = ({ cartItems, customerName, tableNumber, total }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleOrder = async () => {
        setLoading(true);
        try {
            // Step 1: Create the order
            const orderResponse = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cust_name: customerName,
                    table_number: tableNumber,
                    order_status: 0,
                    price_total: total,
                    user_acc_id: 3
                })
            });

            const orderResult = await orderResponse.json();

            if (!orderResponse.ok) {
                throw new Error(orderResult.error.message);
            }

            // Step 2: Create detail orders for the created order
            const orderId = orderResult.order_id;
            const detailOrderResponse = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/detail-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_id: orderId,
                    menus: cartItems.map(item => ({
                        menu_id: item.menu_id,
                        detail_order_qty: item.quantity,
                        detail_order_notes: item.notes || ''
                    }))
                })
            });

            const detailOrderResult = await cartItems;
            console.log("Adding Detail Food Ingredients", detailOrderResult);

            if (!detailOrderResponse.ok) {
                throw new Error(detailOrderResult.error.message);
            }
            setSuccess('Order placed successfully');
            setError(null);
            setTimeout(() => {
            }, 2000); 

            // Save order data to local storage
            const orderData = {
                orderNumber: orderId,
                items: cartItems.map(item => ({ name: item.menu_name, quantity: item.quantity, price: item.total })),
                totalPrice: cartItems.reduce((acc, curr) => acc + curr.total, 0)
            };
            localStorage.setItem('orderData', JSON.stringify(orderData));

            // Jika pembuatan pesanan dan detail pesanan berhasil, lanjutkan ke checkout
            await handleCheckout();
        } catch (error) {
            setSuccess(null);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckout = async () => {
        setLoading(true);
        try {
            // Kirim permintaan checkout ke server
            const response = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/cart/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cartItems,
                    customerName,
                    tableNumber
                })
            });
            const data = await response.json();
            console.log("Checkout successful!", data);

            if (!response.ok) {
                throw new Error(data.error.message);
            }

            // Jika berhasil, atur pesan sukses dan kosongkan keranjang
            setSuccess('Order placed successfully');
            setError(null);
            setTimeout(() => {
                // Redirect ke halaman pembayaran setelah beberapa waktu
                window.location.href = '/payment';
            }, 2000); // Dalam milidetik (misal: 2000 untuk 2 detik)

        } catch (error) {
            // Jika terjadi kesalahan, atur pesan kesalahan
            setSuccess(null);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-xl p-4">
            {success && <p className="text-green-500 mt-2">{success}</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            <button 
                onClick={handleOrder}
                className="bg-[#4caf50] hover:bg-[#39753b] text-white p-4 rounded-3xl shadow-lg w-full"
                disabled={loading}
            >
                {loading ? 'Ordering...' : 'Order'}
            </button>
        </div>
    );
};

export default OrderButton;
