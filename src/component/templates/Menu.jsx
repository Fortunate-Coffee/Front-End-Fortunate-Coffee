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
        return <div className='my-72 text-center text-gray-700 fa-beat'>Loading...</div>;
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