import { useState } from 'react';
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

    const categories = [
        {text: 'Limited Offer'},
        {text: 'Fortunate Bread'},
        {text: 'Asian Cuisine'},
        {text: 'Spaghetti'},
        {text: 'Fortunate Rice'},
    ];

    return (
        <div>
            {showAddCategoryForm && <AdminAddCategoryForm setShowCategoryForm={setShowAddCategoryForm} />}
            {showAddMenuForm && <AdminAddMenuForm setShowAddMenuForm={setShowAddMenuForm} setShowAddMenuIngredientsForm={setShowAddMenuIngredientsForm} />}
            {showAddMenuIngredientsForm && <AdminAddMenuIngredientsForm setShowAddMenuIngredientsForm={setShowAddMenuIngredientsForm} />}

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
                    <select id="selectOption" name="selectOption" className="border border-[#43745B] rounded-xl shadow-xl p-2 px-3 me-2">
                        {categories.map((category, index) => (
                            <option key={index} value={category.text}>{category.text}</option>
                        ))}
                    </select>
                    <GetDataButton />
                </div>
                <AdminMenuItems />
            </div>
        </div>
    );
}

export default AdminMenu;
