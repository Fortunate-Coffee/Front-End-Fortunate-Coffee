import { formatPrice } from "../../menu";

const products = [
    { image: 'https://i.ibb.co/KbnCkG7/Miscellaneous.jpg', title: 'Roasted Nori', category: 'Miscellaneous', description: 'Indonesian Food, we serve the best of combined rice and beancurd w/ blackpepper spices sauce and no MSG potato spices soup.', price: '34000'},
    { image: 'https://i.ibb.co/KbnCkG7/Miscellaneous.jpg', title: 'Roasted Nori', category: 'Miscellaneous', description: 'Indonesian Food, we serve the best of combined rice and beancurd w/ blackpepper spices sauce and no MSG potato spices soup.', price: '34000'},
    { image: 'https://i.ibb.co/KbnCkG7/Miscellaneous.jpg', title: 'Roasted Nori', category: 'Miscellaneous', description: 'Indonesian Food, we serve the best of combined rice and beancurd w/ blackpepper spices sauce and no MSG potato spices soup.', price: '34000'},
    { image: 'https://i.ibb.co/KbnCkG7/Miscellaneous.jpg', title: 'Roasted Nori', category: 'Miscellaneous', description: 'Indonesian Food, we serve the best of combined rice and beancurd w/ blackpepper spices sauce and no MSG potato spices soup.', price: '34000'},
    { image: 'https://i.ibb.co/KbnCkG7/Miscellaneous.jpg', title: 'Roasted Nori', category: 'Miscellaneous', description: 'Indonesian Food, we serve the best of combined rice and beancurd w/ blackpepper spices sauce and no MSG potato spices soup.', price: '34000'},
    { image: 'https://i.ibb.co/KbnCkG7/Miscellaneous.jpg', title: 'Roasted Nori', category: 'Miscellaneous', description: 'Indonesian Food, we serve the best of combined rice and beancurd w/ blackpepper spices sauce and no MSG potato spices soup.', price: '34000'},
    { image: 'https://i.ibb.co/KbnCkG7/Miscellaneous.jpg', title: 'Roasted Nori', category: 'Miscellaneous', description: 'Indonesian Food, we serve the best of combined rice and beancurd w/ blackpepper spices sauce and no MSG potato spices soup.', price: '34000'},
    { image: 'https://i.ibb.co/KbnCkG7/Miscellaneous.jpg', title: 'Roasted Nori', category: 'Miscellaneous', description: 'Indonesian Food, we serve the best of combined rice and beancurd w/ blackpepper spices sauce and no MSG potato spices soup.', price: '34000'},
    { image: 'https://i.ibb.co/KbnCkG7/Miscellaneous.jpg', title: 'Roasted Nori', category: 'Miscellaneous', description: 'Indonesian Food, we serve the best of combined rice and beancurd w/ blackpepper spices sauce and no MSG potato spices soup.', price: '34000'},
]

const MenuItems = () => {
    return(
        <div className="flex flex-wrap gap-3 mt-6 mb-16">
            {
            products.map((product, index) => (
                <div
                    key={index}
                    className="w-[calc(30%_-_4.5rem)] pb-5 rounded-lg shadow-[3px_8px_12px_rgba(0,0,0,0.25)] text-center"
                    >
                    <img
                        src={product.image}
                        alt="product"
                        className="bg-cover"
                    />
                    <div className="px-5">
                        <h2 className="font-bold text-xl mt-5 line-clamp-2 hyphens-auto">
                            {product.title}
                        </h2>
                        <p className="truncate text-gray-500 text-sm">
                            {product.category}
                        </p>
                        <p className="mt-3 text-justify line-clamp-3">
                            {product.description}
                        </p>
                        <p className="font-semibold my-4">
                            Rp. {formatPrice(product.price)}
                        </p>
                        <button type="submit" className="bg-[#43745B] hover:bg-green-800 text-white font-bold w-2/5 mx-2 py-2 px-4 shadow-xl rounded-xl">
                                Edit
                        </button>
                        <button type="submit" className="border border-[#43745B] bg-white hover:bg-gray-100 text-[#43745B] mx-2 font-bold w-2/5 py-2 px-4 shadow-xl rounded-xl">
                                Delete
                        </button>
                    </div>
                </div>
            ))
            }
        </div>
    );
}

export default MenuItems;