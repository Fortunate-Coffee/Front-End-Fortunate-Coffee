import { Link, NavLink } from "react-router-dom";

const BannerImage = () => {
    return(
        <div className="my-10">
            <NavLink as={Link} to={"/"}>
                <img src="images/Banner.png" alt="Banner Home" className="w-full" />
            </NavLink>
        </div>
    )
}

export default BannerImage;