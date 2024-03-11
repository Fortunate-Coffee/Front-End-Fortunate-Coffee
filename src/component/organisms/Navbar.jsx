import Searching from "../molecules/Searching";
import ShoppingCartButton from "../atoms/ShoppingCartButton";

const Navbar = () => {
    return(
        <div className="flex justify-between">
            <Searching />
            <ShoppingCartButton />
        </div>
    )
}

export default Navbar;