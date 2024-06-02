import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminAddCategoryForm from '../organisms/AdminAddCategoryForm';
import AdminAddMenuForm from '../organisms/AdminAddMenuForm';
import AdminMenuItems from '../organisms/AdminMenuItems';
import AdminAddMenuIngredientsForm from '../organisms/AdminAddMenuIngredientsForm';
import GetDataButton from '../atoms/GetDataButton';
import AdminCategoryCarousel from '../organisms/AdminCategoryCarousel';

const AdminMenu = () => {
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [showAddMenuForm, setShowAddMenuForm] = useState(false);
    const [showAddMenuIngredientsForm ,setShowAddMenuIngredientsForm] = useState(false);
    const [category, setCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [menu, setMenu] = useState([]);
    const [menuId, setMenuId] = useState(null);

    const handleShowAddMenuIngredientsForm = (show, menuId) => {
        setShowAddMenuIngredientsForm(show);
        setMenuId(menuId);
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        const fetchCategory = async () => {
            try {
                const response = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/category', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setCategory(data);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        const fetchMenu = async () => {
            try {
                const response = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/menu', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setMenu(data);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };
        
        fetchCategory();
        fetchMenu();
    }, []);

    const getCategoryIdByName = (categoryName) => {
        const selectedCategory = category.find(cat => cat.category_name === categoryName);
        return selectedCategory ? selectedCategory.category_id : null;
    };

    const fetchMenuByCategory = async () => {
        const token = localStorage.getItem('accessToken');
        const categoryId = getCategoryIdByName(selectedCategory);
        if (!categoryId) {
            setMenu([]);
            return;
        }

        try {
            const response = await fetch(`https://backend-fortunate-coffee.up.railway.app/api/v1/menu/category/${categoryId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.status === 404) {
                setMenu([]);
            } else {
                setMenu(data);
            }
        } catch (error) {
            console.error('Error fetching menu by category:', error);
            setMenu([]);
        }
    };

    return (
        <div>
            {showAddCategoryForm && <AdminAddCategoryForm setShowCategoryForm={setShowAddCategoryForm} />}
            {showAddMenuForm && <AdminAddMenuForm setShowAddMenuForm={setShowAddMenuForm} setShowAddMenuIngredientsForm={handleShowAddMenuIngredientsForm} />}
            {showAddMenuIngredientsForm && <AdminAddMenuIngredientsForm menuId={menuId} setShowAddMenuIngredientsForm={setShowAddMenuIngredientsForm} />}

            <div className="p-3 flex justify-between items-center bg-[#43745B] shadow-xl">
                <h1 className='text-white tracking-wide'>Menu</h1>
                <div className="flex">
                    <Link to="#" onClick={() => setShowAddMenuForm(true)} className='px-3 py-2 flex ms-5 flex-row shadow-2xl rounded-xl bg-white'>
                        <i className="flex items-center fas fa-square-plus fa-lg text-[#43745B]"></i>
                        <p className='ms-2 text-[#43745B]'>New Menu</p>
                    </Link> 
                    <Link to="#" onClick={() => setShowAddCategoryForm(true)} className='px-3 py-2 flex ms-5 flex-row shadow-2xl rounded-xl bg-white'>
                        <i className="flex items-center fas fa-square-plus fa-lg text-[#43745B]"></i>
                        <p className='ms-2 text-[#43745B]'>New Categories</p>
                    </Link>
                </div>
            </div>
            <div className="mt-6 p-3">
                <AdminCategoryCarousel />
                <div className="flex items-center mt-12">
                    <label htmlFor="selectOption" className="font-medium me-4 text-[#43745B]">Categories</label>
                    <select id="selectOption" name="selectOption" className="border border-[#43745B] rounded-xl shadow-xl p-2 px-3 me-2" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        {category.map((category, index) => (
                            <option key={index} value={category.category_name}>{category.category_name}</option>
                        ))}
                    </select>
                    <GetDataButton onClick={fetchMenuByCategory}/>
                </div>
                <AdminMenuItems menu={menu} />
            </div>
        </div>  
    );
}

export default AdminMenu;
