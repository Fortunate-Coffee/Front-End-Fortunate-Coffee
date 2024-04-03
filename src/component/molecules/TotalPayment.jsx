import { formatPrice } from "../../menu";

const TotalPayment = ({ prices }) => {
    // Menghitung total harga dari array prices
    const subtotal = prices.reduce((acc, curr) => acc + curr, 0);
    const tax = subtotal * 0.11;
    const total = subtotal + tax;

    return(
        <div className="flex flex-col">
            <div className="flex items-center justify-between font-semibold mt-3 my-2">
                <p className="w-11/12">Subtotal</p>
                <p className="w-4/12 text-right">Rp. {formatPrice(subtotal)}</p>
            </div>
            <div className="flex items-center justify-between font-semibold my-1">
                <p className="w-11/12">Tax (11%)</p>
                <p className="w-4/12 text-right">Rp. {formatPrice(tax)}</p>
            </div>
            <hr className="my-1"></hr>
            <div className="flex items-center justify-between font-semibold my-1">
                <p className="w-11/12">Total</p>
                <p className="w-4/12 text-right">Rp. {formatPrice(total)}</p>
            </div>
        </div>
    );
}

export default TotalPayment;