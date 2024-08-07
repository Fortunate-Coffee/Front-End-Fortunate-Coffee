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
    const [loading, setLoading] = useState(false);

    const handleShowAddMenuIngredientsForm = (show, menuId) => {
        setShowAddMenuIngredientsForm(show);
        setMenuId(menuId);
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        const fetchCategory = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/category`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setCategory(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        const fetchMenu = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/menu`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setMenu(data);
                setLoading(false);
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
        setLoading(true);
        
        let url;
        if (selectedCategory === 'All') {
            url = `${process.env.REACT_APP_API_URL}/api/v1/menu`;
        } else {
            const categoryId = getCategoryIdByName(selectedCategory);
            if (!categoryId) {
                setMenu([]);
                setLoading(false);
                return;
            }
            url = `${process.env.REACT_APP_API_URL}/api/v1/menu/category/${categoryId}`;
        }

        try {
            const response = await fetch(url, {
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {showAddCategoryForm && <AdminAddCategoryForm setShowCategoryForm={setShowAddCategoryForm} category={category} />}
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
                        <option value="" disabled>Select a category</option>
                        <option value="All">All</option>
                        {category
                            .slice() // Membuat salinan array untuk memastikan tidak mengubah array asli
                            .sort((a, b) => a.category_name.localeCompare(b.category_name)) // Urutkan kategori berdasarkan nama
                            .map((category, index) => (
                                <option key={index} value={category.category_name}>{category.category_name}</option>
                            ))
                        }
                    </select>
                    <GetDataButton onClick={fetchMenuByCategory} loading={loading}/>
                </div>
                <AdminMenuItems menu={menu} />
            </div>
        </div>  
    );
}

export default AdminMenu;
