import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const MenuCategory = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch("https://backend-fortunate-coffee.up.railway.app/api/v1/category");
                if (!response.ok) {
                    throw new Error("Network response was not okay.");
                }
                const data = await response.json();
                setCategory(data);
                setLoading(false);
            } catch (error) {
                console.error("Fetch error: ", error);
                setLoading(false);
            }
        };
        fetchCategory();
    }, []);

    if (loading) {
        return(
        <div>
            <h1 className="my-12 text-center text-gray-700 fa-beat">Loading...</h1>
        </div>)
    }

    return(
        <div className="flex flex-wrap">
            {category.map((category, index) => (
                <div key={index} className="w-1/3 sm:w-1/4 md:w-1/9 lg:w-1/6 mb-3">
                    <NavLink as={Link} to={`/category/${encodeURIComponent(category.category_name)}`}>
                        <img
                            src={category.category_image}
                            alt="Banner Home"
                            className="scale-90 hover:scale-100 bg-cover w-full h-28 lg:h-52 shadow-lg rounded-lg"
                        />
                        <p className="text-center text-sm mt-2">{category.category_name}</p>
                    </NavLink>
                </div>
            ))}
        </div>
    )
}

export default MenuCategory;