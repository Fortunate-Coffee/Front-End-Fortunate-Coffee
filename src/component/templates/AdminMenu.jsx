import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminCategoriesForm from '../organisms/AdminCategoriesForm';
import AdminNewMenuForm from '../organisms/AdminNewMenuForm';
import AdminMenuItems from '../organisms/AdminMenuItems';
import AdminFoodIngredientsForm from '../organisms/AdminFoodIngredientsForm';
import GetDataButton from '../atoms/GetDataButton';

const AdminMenu = () => {
    const [showCategoriesForm, setShowCategoriesForm] = useState(false);
    const [showAddMenuForm, setShowAddMenuForm] = useState(false);
    const [showFoodIngredientsForm ,setShowFoodIngredientsForm] = useState(false);

    const categories = [
        {text: 'Limited Offer'},
        {text: 'Fortunate Bread'},
        {text: 'Asian Cuisine'},
        {text: 'Spaghetti'},
        {text: 'Fortunate Rice'},
    ];

    return (
        <div>
            {showCategoriesForm && <AdminCategoriesForm setShowCategoriesForm={setShowCategoriesForm} />}
            {showAddMenuForm && <AdminNewMenuForm setShowAddMenuForm={setShowAddMenuForm} setShowFoodIngredientsForm={setShowFoodIngredientsForm} />}
            {showFoodIngredientsForm && <AdminFoodIngredientsForm setShowFoodIngredientsForm={setShowFoodIngredientsForm} />}

            <div className="p-3 flex justify-between items-center bg-[#43745B] shadow-xl">
                <h1 className='text-white tracking-wide'>Menu</h1>
                <div className="flex">
                    <Link to="#" onClick={() => setShowCategoriesForm(true)} className='px-3 py-2 flex ms-5 flex-row shadow-2xl rounded-xl bg-white'>
                        <i className="flex items-center fas fa-table fa-lg text-[#43745B]"></i>
                        <p className='ms-2 text-[#43745B]'>Categories</p>
                    </Link>
                    <Link to="#" onClick={() => setShowAddMenuForm(true)} className='px-3 py-2 flex ms-5 flex-row shadow-2xl rounded-xl bg-white'>
                        <i className="flex items-center fas fa-square-plus fa-lg text-[#43745B]"></i>
                        <p className='ms-2 text-[#43745B]'>Add New Menu</p>
                    </Link>
                </div>
            </div>
            <div className="mt-6 p-3">
                <div className="flex items-center">
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
