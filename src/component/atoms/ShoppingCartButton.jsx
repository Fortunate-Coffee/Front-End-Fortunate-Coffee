import { Link } from "react-router-dom";

const ShoppingCartButton = () => {
    return(
        <div className='flex w-[2.5%] justify-end'>
            <Link to={'/'}><i className="fa-solid fa-cart-shopping fa-bounce text-black"></i></Link>
        </div>
    )
}

export default ShoppingCartButton;