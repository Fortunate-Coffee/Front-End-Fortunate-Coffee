import { useState, useEffect } from "react";
import { formatPrice } from "../../menu";

const TotalPayment = ({ prices }) => {
    const [loading, setLoading] = useState(true);
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Simulate data loading
        setTimeout(() => {
            const calculatedSubtotal = prices.reduce((acc, curr) => acc + curr, 0);
            const calculatedTax = calculatedSubtotal * 0.11;
            const calculatedTotal = calculatedSubtotal + calculatedTax;

            setSubtotal(calculatedSubtotal);
            setTax(calculatedTax);
            setTotal(calculatedTotal);
            setLoading(false);
        }, 1000); // Simulate a delay for loading
    }, [prices]);

    if (loading) {
        return (
            <div className="fa-fade flex flex-col h-60 animate-pulse">
                <div className="flex items-center justify-between font-semibold mt-3 my-2">
                    <div className="w-1/12 bg-gray-300 h-6 rounded"></div>
                    <div className="w-1/12 bg-gray-300 h-6 rounded"></div>
                </div>
                <div className="flex items-center justify-between font-semibold my-1">
                    <div className="w-3/12 bg-gray-300 h-6 rounded"></div>
                    <div className="w-2/12 bg-gray-300 h-6 rounded"></div>
                </div>
                <hr className="my-1" />
                <div className="flex items-center justify-between font-semibold my-1">
                    <div className="w-2/12 bg-gray-300 h-6 rounded"></div>
                    <div className="w-1/12 bg-gray-300 h-6 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-60">
            <div className="flex items-center justify-between font-semibold mt-3 my-2">
                <p className="w-11/12">Subtotal</p>
                <p className="w-7/12 text-right">Rp. {formatPrice(subtotal)}</p>
            </div>
            <div className="flex items-center justify-between font-semibold my-1">
                <p className="w-11/12">Tax (11%)</p>
                <p className="w-7/12 text-right">Rp. {formatPrice(tax)}</p>
            </div>
            <hr className="my-1"></hr>
            <div className="flex items-center justify-between font-semibold my-1">
                <p className="w-11/12">Total</p>
                <p className="w-7/12 text-right">Rp. {formatPrice(total)}</p>
            </div>
        </div>
    );
}

export default TotalPayment;
