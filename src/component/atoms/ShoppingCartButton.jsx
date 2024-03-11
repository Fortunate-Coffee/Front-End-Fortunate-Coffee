import { Link } from "react-router-dom";

const ShoppingCartButton = () => {
    return(
        <div className=''>
            <Link to={'/'}><i className="fa-solid fa-cart-shopping fa-bounce" style={{color: "#000000;"}}></i></Link>
        </div>
    )
}

export default ShoppingCartButton;