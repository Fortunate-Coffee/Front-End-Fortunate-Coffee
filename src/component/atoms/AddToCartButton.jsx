import { useState } from "react";

const AddToCartButton = ({ onClick, disabled, isInCart }) => {
    const [loading, setLoading] = useState(false); // State for loading status

    const handleClick = async () => {
        setLoading(true); // Set loading status to true when button is clicked
        await onClick(); // Call onClick function passed as prop
        setLoading(false); // Set loading status back to false after onClick function finishes
    };

    return (
        <div>
            <button onClick={handleClick} disabled={disabled} className="flex justify-center items-center bg-[#4caf50] hover:bg-[#39753b] text-white p-4 rounded-2xl shadow-xl w-full mt-12">
                {loading ? ( // Render loading spinner or button text based on loading state
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 12h4zm2 5.291l-2.162-.88A8.015 8.015 0 014 12H0c0 2.021.388 3.936 1.081 5.627L6 17.29z"></path>
                    </svg>
                ) : (
                    isInCart ? 'Update to Cart' : 'Add to Cart'
                )}
            </button>
        </div>
    );
}

export default AddToCartButton;
