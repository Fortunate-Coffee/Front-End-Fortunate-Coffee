import Searching from "../molecules/Searching";
import ShoppingCartButton from "../atoms/ShoppingCartButton";

const Navbar = () => {
    return(
        <div className="flex justify-between shadow-lg px-7 py-4">
            <Searching />
            <ShoppingCartButton />
        </div>
    )
}

export default Navbar;