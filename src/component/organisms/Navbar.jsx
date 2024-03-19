import Searching from "../molecules/Searching";
import ShoppingCartButton from "../atoms/ShoppingCartButton";

const Navbar = () => {
    return(
        <div className="fixed top-0 z-0 w-full h-auto bg-white flex justify-between shadow-lg px-7 py-4">
            <Searching />
            <ShoppingCartButton />
        </div>
    )
}

export default Navbar;