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
        <div className="flex flex-col items-center">
            <button 
                onClick={handleOrder}
                className="bg-green-500 text-white p-2 rounded"
                disabled={loading}
            >
                {loading ? 'Ordering...' : 'Place Order'}
            </button>
            {success && <p className="text-green-500 mt-2">{success}</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};

export default OrderButton;
