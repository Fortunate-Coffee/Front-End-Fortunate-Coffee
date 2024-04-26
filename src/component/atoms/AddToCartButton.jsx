import { Link } from "react-router-dom";

const AddToCartButton = () => {
    return(
        <div className="">
            <Link to="" >
            <button className="bg-[#4caf50] hover:bg-[#39753b] text-white p-4 rounded-2xl shadow-xl w-full mt-12">
                Add To Cart
            </button>
            </Link>
        </div>
    );
}

export default AddToCartButton;