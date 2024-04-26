import { Link, NavLink } from "react-router-dom";

const BannerImage = () => {
    return(
        <div className="mt-24 my-8">
            <NavLink as={Link} to={"/"}>
                <img src="https://i.ibb.co/wQ6PkyW/Banner.jpg" alt="Banner Home" className="w-full lg:h-72 rounded-xl shadow-xl" />
            </NavLink>
        </div>
    )
}

export default BannerImage;