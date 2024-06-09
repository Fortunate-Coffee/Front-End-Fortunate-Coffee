import { useState } from "react";

const OrderButton = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleOrder = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/cart/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            if (response.ok) {
                setSuccess('Order placed successfully');
                setError(null);
            } else {
                setSuccess(null);
                setError(result.error.message);
            }
        } catch (error) {
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
