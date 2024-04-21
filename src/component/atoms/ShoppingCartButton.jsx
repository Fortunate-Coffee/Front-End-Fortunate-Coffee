import { Link } from "react-router-dom";

const ShoppingCartButton = ({ itemCount }) => {
    return(
        <div className='flex justify-start w-2'>
            <Link to={'/cart'}>
                <i className="fa-solid fa-cart-shopping fa-bounce text-black"></i>
                <p className="fa-bounce absolute top-2 ms-2 w-4 h-4 text-white text-xs bg-red-600 rounded-full text-center">{itemCount = 1}</p>
            </Link>
        </div>
    )
}

export default ShoppingCartButton;