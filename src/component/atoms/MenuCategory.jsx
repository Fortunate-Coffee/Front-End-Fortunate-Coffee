import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const MenuCategory = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/category`);
                if (!response.ok) {
                    throw new Error("Network response was not okay.");
                }
                const data = await response.json();
                // Sort the categories by updated_at in descending order (most recent first)
                const sortedData = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                setCategory(sortedData);
                setLoading(false);
            } catch (error) {
                console.error("Fetch error: ", error);
                setLoading(false);
            }
        };
        fetchCategory();
    }, []);

    if (loading) {
        // Create placeholders while data is loading
        const placeholders = new Array(category.length).fill(null);

        return (
            <div className="flex flex-wrap">
                {placeholders.map((_, index) => (
                    <div key={index} className="animate-pulse w-1/3 sm:w-1/4 md:w-1/9 lg:w-1/6 mb-3">
                        <div className="scale-95 fa-fade bg-gray-300 h-28 lg:h-52 shadow-lg rounded-lg"></div>
                        <div className="h-4 bg-gray-300 mt-2 mx-auto w-3/4 rounded"></div>
                    </div>
                ))}
            </div>
        );
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