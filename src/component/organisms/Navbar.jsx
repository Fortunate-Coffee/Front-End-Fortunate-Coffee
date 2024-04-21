import Searching from "../molecules/Searching";
import ShoppingCartButton from "../atoms/ShoppingCartButton";
import ProfileButton from "../atoms/ProfileButton";

const Navbar = ({ itemCount }) => {

    return(
        <div className="fixed top-0 z-0 w-full h-auto bg-white flex flex-row justify-between shadow-lg px-8 py-4">
            <Searching />
            <ShoppingCartButton itemCount={itemCount} />
            <ProfileButton />
        </div>
    )
}

export default Navbar;