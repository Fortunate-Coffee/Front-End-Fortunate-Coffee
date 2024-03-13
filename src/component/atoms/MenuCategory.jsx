import { Link, NavLink } from "react-router-dom";

const MenuCategory = () => {
    const categoryFiles = [
        {image: "Menu Spesial.png", name: "Menu Spesial"},
        {image: "Nasi.png", name: "Nasi"},
        {image: "Menu Paket.png", name: "Menu Paket"},
        {image: "Kwetiau.png", name: "Kwetiau"},
        {image: "Mie.png", name: "Mie"},
        {image: "Bihun.png", name: "Bihun"},
        {image: "Sop.png", name: "Sop"},
        {image: "Salad.png", name: "Salad"},
        {image: "Coffee.png", name: "Coffee"}
    ];

    return(
        <div className="flex flex-wrap">
            {categoryFiles.map((category, index) => (
                <div key={index} className="w-1/3 sm:w-1/4 md:w-1/9 lg:w-1/6 mb-3">
                    <NavLink as={Link} to={"/"}>
                        <img
                            src={`/images/Menu/${category.image}`}
                            alt="Banner Home"
                            className="h-auto w-full px-1"
                        />
                        <p className="text-center text-sm mt-2">{category.name}</p>
                    </NavLink>
                </div>
            ))}
        </div>
    )
}

export default MenuCategory;