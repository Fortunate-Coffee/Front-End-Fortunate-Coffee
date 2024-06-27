import { useState } from "react";
import { formatPrice } from "../../menu";
import AdminEditMenuForm from "./AdminEditMenuForm";
import AdminEditMenuIngredientsForm from "./AdminEditMenuIngredientsForm";
import AdminDeleteConfirm from "./AdminDeleteConfirm";

const MenuItems = ({menu}) => {
    const [showAdminDeleteConfirm, setShowAdminDeleteConfirm] = useState(false);
    const [showEditMenuForm, setShowEditMenuForm] = useState(false);
    const [showEditMenuIngredientsForm ,setShowEditMenuIngredientsForm] = useState(false);
    const [currentMenuId, setCurrentMenuId] = useState(null);
    const [deleteMenuId, setDeleteMenuId] = useState(null);
    const [deleteSuccess, setDeleteSuccess] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleDeleteMenu = (id) => {
        setDeleteMenuId(id);
        setShowAdminDeleteConfirm(true);
    };

    const handleDeleteConfirmation = async () => {
        // Kirim permintaan hapus ke database
        try {
            setLoading(true);
            // Ambil token dari local storage
            const token = localStorage.getItem('accessToken');
    
            // Mengirimkan permintaan hapus ke backend dengan token
            const response = await fetch(`https://backend-fortunate-coffee.up.railway.app/api/v1/menu/${deleteMenuId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete menu');
            }
    
            setDeleteSuccess('Deleted menu successfully');
            
            setTimeout(() => {
                setShowAdminDeleteConfirm(false);
            }, 2000);
    
        } catch (error) {
            console.error('Error deleting menu:', error);
            setDeleteError(error);
            setTimeout(() => {
                setDeleteError(error);
            }, 2000);
        }
    };

    // Sort menu items by updatedAt in descending order
    const sortedMenu = [...menu].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return(
        <div className="flex flex-wrap gap-3 mt-6 mb-16">
            {showAdminDeleteConfirm && <AdminDeleteConfirm setShowDeleteConfirm={setShowAdminDeleteConfirm} entityName="menu" itemId={deleteMenuId} onConfirmDelete={handleDeleteConfirmation}/>}
            {showEditMenuForm && <AdminEditMenuForm setShowEditMenuForm={setShowEditMenuForm} setShowEditMenuIngredientsForm={setShowEditMenuIngredientsForm} menuId={currentMenuId}/>}
            {showEditMenuIngredientsForm && <AdminEditMenuIngredientsForm setShowEditMenuIngredientsForm={setShowEditMenuIngredientsForm} menuId={currentMenuId} />}

            {sortedMenu.length === 0 ? (
                <p className="my-24 text-gray-500 text-center tracking-wide w-full">Menu not found.</p>
            ) : (
                sortedMenu.map((menu, index) => (
                    <div
                        key={index}
                        className="w-[calc(30%_-_4.5rem)] pb-5 rounded-lg shadow-[3px_8px_12px_rgba(0,0,0,0.25)] scale-95 hover:scale-100 text-center"
                        >
                        <img
                            src={menu.menu_image}
                            alt={menu.menu_name}
                            className="bg-cover w-full h-56"
                        />
                        <div className="px-5">
                            <div className="h-16">
                               <h2 className="font-bold text-xl mt-5 line-clamp-2 hyphens-auto">
                                    {menu.menu_name}
                                </h2>
                                <p className="truncate text-gray-500 text-sm">
                                    {menu.category.category_name}
                                </p> 
                            </div>
                            
                            <p className="h-24 mt-3 text-justify line-clamp-3">
                                {menu.menu_desc}
                            </p>
                            <p className="font-semibold my-4">
                                Rp. {formatPrice(menu.menu_price)}
                            </p>
                            <div className="min-h-12 overflow-y-auto max-h-12">
                                {menu.OutOfStock && menu.OutOfStock.length > 0 && (
                                    <div>
                                        {menu.OutOfStock.map((item, index) => (
                                            <p key={index} className="flex font-semibold italic text-red-600">{item}</p>
                                        ))}
                                    </div>
                                )}
                                {menu.stockWarnings && menu.stockWarnings.length > 0 && (
                                    <div>
                                        {menu.stockWarnings.map((warning, index) => (
                                            <p key={index} className="flex font-semibold italic text-orange-500">{warning}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button type="submit" onClick={() => { setShowEditMenuForm(true); setCurrentMenuId(menu.menu_id); }} className="bg-[#43745B] hover:bg-green-800 text-white font-bold w-2/5 mx-2 mt-4 py-2 px-4 shadow-xl rounded-xl">
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 12h4zm2 5.291l-2.162-.88A8.015 8.015 0 014 12H0c0 2.021.388 3.936 1.081 5.627L6 17.29z"></path>
                                    </svg>
                                ) : (
                                    'Edit'
                                )}
                            </button>
                            <button type="submit" disabled={loading} onClick={() => handleDeleteMenu(menu.menu_id)}  className="border border-[#43745B] bg-white hover:bg-gray-100 text-[#43745B] mx-2 font-bold w-2/5 py-2 px-4 shadow-xl rounded-xl">
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 12h4zm2 5.291l-2.162-.88A8.015 8.015 0 014 12H0c0 2.021.388 3.936 1.081 5.627L6 17.29z"></path>
                                    </svg>
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default MenuItems;