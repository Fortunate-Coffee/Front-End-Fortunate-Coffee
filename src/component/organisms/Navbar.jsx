import Searching from "../molecules/Searching";
import ShoppingCartButton from "../atoms/ShoppingCartButton";

const Navbar = ({ itemCount }) => {

    return(
        <div className="fixed top-0 z-0 w-full h-auto bg-white flex justify-between shadow-lg px-8 py-4">
            <Searching />
            <ShoppingCartButton itemCount={itemCount} />
        </div>
    )
}

export default Navbar;