import { Link, NavLink } from "react-router-dom";

const BannerImage = () => {
    return(
        <div className="mt-24 my-8">
            <NavLink as={Link} to={"/"}>
                <img src="https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Banner.jpg?updatedAt=1716675763691" alt="Banner Home" className="w-full lg:h-72 rounded-xl shadow-xl" />
            </NavLink>
        </div>
    )
}

export default BannerImage;