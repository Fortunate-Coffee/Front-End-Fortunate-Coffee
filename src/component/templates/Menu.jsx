import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../atoms/BackButton';
import MenuItem from '../molecules/MenuItem';
import ShoppingCartButton from '../atoms/ShoppingCartButton';


const Menu = () => {
    const { categoryName } = useParams();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch(`https://backend-fortunate-coffee.up.railway.app/api/v1/menu`);
                const data = await response.json();

                // Filter item menu berdasarkan nama kategori
                const categoryData = data.filter(item => {
                    return item.category.category_name === decodeURIComponent(categoryName);
                });

                if (categoryData.length > 0) {
                    setSelectedCategory(categoryData[0].category);
                    setMenuItems(categoryData);
                }
            } catch (error) {
                console.error('Error fetching menu items:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCartItemCount = async () => {
            try {
                const response = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/cart');
                const result = await response.json();
                if (response.ok) {
                    // Hitung jumlah item di keranjang belanja
                    const count = result.data.reduce((acc, item) => acc + item.quantity, 0);
                    setItemCount(count);
                } else {
                    console.error(result.error.message);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchMenuItems();
        fetchCartItemCount();
    }, [categoryName]);

    if (loading) {
        // Create placeholders while data is loading
        const placeholders = new Array(menuItems.length).fill(null);

        return (
            <div className="fa-fade flex flex-col">
                {placeholders.map((_, index) => (
                    <div key={index} className="flex flex-row w-full justify-between my-4 animate-pulse">
                        <div className="w-2/12 bg-gray-300 rounded-lg shadow-lg h-14 lg:w-32 lg:h-32"></div>
                        <div className="flex flex-col w-8/12 ms-2">
                            <div className="bg-gray-300 h-4 w-3/4 rounded mb-2"></div>
                            <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
                        </div>
                        <div className="flex flex-col w-4/12">
                            <div className="bg-gray-300 h-4 w-full rounded mb-2"></div>
                            <div className="bg-gray-300 h-4 w-1/2 rounded ml-auto"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return(
        <div>
            <div className='fixed z-40 top-0 w-full h-auto bg-white shadow-lg flex px-7 py-4'>
                <BackButton />
                {selectedCategory && <h1 className='grow font-medium'>{selectedCategory.category_name}</h1>}
                <ShoppingCartButton itemCount={itemCount} />
            </div>
            <div className="mt-16 mx-7 my-4">
                <MenuItem items={menuItems}/>
            </div>
        </div>
    )
}

export default Menu;