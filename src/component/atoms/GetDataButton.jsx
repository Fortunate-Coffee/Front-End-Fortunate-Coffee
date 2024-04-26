// GetDataButton.jsx
import React from "react";

const GetDataButton = ({ onClick }) => {
    return (
        <div>
            <button
                type="button"
                className="bg-[#43745B] hover:bg-green-800 text-white font-bold py-2 px-4 shadow-xl rounded-xl"
                onClick={onClick} // Panggil onClick prop saat tombol ditekan
            >
                Get Data
            </button>
        </div>
    );
}

export default GetDataButton;
