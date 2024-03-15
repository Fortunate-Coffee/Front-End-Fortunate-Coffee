import { Link, NavLink } from "react-router-dom";
import { categoryFiles } from "../../menu";

const MenuCategory = () => {
    return(
        <div className="flex flex-wrap">
            {categoryFiles.map((category, index) => (
                <div key={index} className="w-1/3 sm:w-1/4 md:w-1/9 lg:w-1/6 mb-3">
                    <NavLink as={Link} to={`/category/${category.slug}`}>
                        <img
                            src={`/images/Menu/${category.image}`}
                            alt="Banner Home"
                            className="h-auto w-auto px-1"
                        />
                        <p className="text-center text-sm mt-2">{category.name}</p>
                    </NavLink>
                </div>
            ))}
        </div>
    )
}

export default MenuCategory;