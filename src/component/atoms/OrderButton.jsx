import { Link } from "react-router-dom";

const OrderButton = () => {
    return(
        <div className="">
            <Link to="/payment" >
            <button type="submit" className="bg-[#4caf50] hover:bg-[#39753b] text-white p-4 rounded-3xl w-full mt-9 shadow-xl">
                Order
            </button>
            </Link>
        </div>
    );
}

export default OrderButton;