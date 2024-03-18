import { useState } from "react";

const QtyPicker = ({ className }) => {
    const [qty, setQty] = useState(0);

    const incrementQty = () => {
        setQty(qty + 1);
    };

    const decrementQty = () => {
        if (qty > 0) {
            setQty(qty - 1);
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