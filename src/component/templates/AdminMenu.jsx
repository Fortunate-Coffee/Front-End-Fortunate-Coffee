import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminMenuItems from '../organisms/AdminMenuItems';

const AdminMenu = () => {
    const [showCategoriesForm, setShowCategoriesForm] = useState(false); // State untuk form kategori
    const [showAddMenuForm, setShowAddMenuForm] = useState(false); // State untuk form tambah menu

    const categories = [
        {text: 'Limited Offer'},
        {text: 'Fortunate Bread'},
        {text: 'Asian Cuisine'},
        {text: 'Spaghetti'},
        {text: 'Fortunate Rice'},
    ];

    return(
        <div>
            {/* Form untuk kategori */}
            {showCategoriesForm && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-xl shadow-xl relative">
                        {/* Tombol untuk menutup form */}
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowCategoriesForm(false)}>
                            <i className="fas fa-times"></i>
                        </button>
                        {/* Isi dari form kecil di sini */}
                        <h2 className="text-lg font-semibold mb-2">Categories Form</h2>
                        {/* Isi form di sini */}
                    </div>
                </div>
            )}

            {/* Form untuk menambah menu */}
            {showAddMenuForm && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-xl shadow-xl relative">
                        {/* Tombol untuk menutup form */}
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowAddMenuForm(false)}>
                            <i className="fas fa-times"></i>
                        </button>
                        {/* Isi dari form kecil di sini */}
                        <h2 className="text-lg font-semibold mb-2">Add New Menu Form</h2>
                        {/* Isi form di sini */}
                    </div>
                </div>
            )}

            <div className="p-3 flex justify-between items-center bg-[#43745B] shadow-xl">
                <h1 className='text-white tracking-wide'>Menu</h1>
                <div className="flex">
                    {/* Link untuk menampilkan form kategori */}
                    <Link to="#" onClick={() => setShowCategoriesForm(true)} className='px-3 py-2 flex ms-5 flex-row shadow-2xl rounded-xl bg-white'>
                        <i className="flex items-center fas fa-table fa-lg text-[#43745B]"></i>
                        <p className='ms-2 text-[#43745B]'>Categories</p>
                    </Link>
                    {/* Link untuk menampilkan form tambah menu */}
                    <Link to="#" onClick={() => setShowAddMenuForm(true)} className='px-3 py-2 flex ms-5 flex-row shadow-2xl rounded-xl bg-white'>
                        <i className="flex items-center fas fa-square-plus fa-lg text-[#43745B]"></i>
                        <p className='ms-2 text-[#43745B]'>Add New Menu</p>
                    </Link>
                </div>
            </div>
            <div className="mt-6 p-3">
                <div className="flex items-center">
                    <label htmlFor="selectOption" className="me-4 text-[#43745B]">Categories</label>
                    <select id="selectOption" name="selectOption" className="border border-[#43745B] rounded-xl shadow-xl p-2 px-3 me-2">
                        {categories.map((category, index) => (
                            <option key={index} value={category.text}>{category.text}</option>
                        ))}
                    </select>
                    <button type="submit" className="bg-[#43745B] hover:bg-green-800 text-white font-bold py-2 px-4 shadow-xl rounded-xl">
                        Get Data
                    </button>
                </div>
                <AdminMenuItems />
            </div>
        </div>
    );
}

export default AdminMenu;
