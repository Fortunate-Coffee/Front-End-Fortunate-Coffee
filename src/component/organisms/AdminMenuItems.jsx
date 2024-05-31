import { useState } from "react";
import { formatPrice } from "../../menu";
import AdminEditMenuForm from "./AdminEditMenuForm";
import AdminEditMenuIngredientsForm from "./AdminEditMenuIngredientsForm";
import AdminDeleteConfirm from "./AdminDeleteConfirm";

const MenuItems = ({menu}) => {
    const [showAdminDeleteConfirm, setShowAdminDeleteConfirm] = useState(false);
    const [showEditMenuForm, setShowEditMenuForm] = useState(false);
    const [showEditMenuIngredientsForm ,setShowEditMenuIngredientsForm] = useState(false);

    return(
        <div className="flex flex-wrap gap-3 mt-6 mb-16">
            {showAdminDeleteConfirm && <AdminDeleteConfirm setShowAdminDeleteConfirm={setShowAdminDeleteConfirm}/>}
            {showEditMenuForm && <AdminEditMenuForm setShowEditMenuForm={setShowEditMenuForm} setShowEditMenuIngredientsForm={setShowEditMenuIngredientsForm} />}
            {showEditMenuIngredientsForm && <AdminEditMenuIngredientsForm setShowEditMenuIngredientsForm={setShowEditMenuIngredientsForm} />}

            {menu.length === 0 ? (
                <p className="text-center w-full">Not found</p>
            ) : (
                menu.map((menu, index) => (
                    <div
                        key={index}
                        className="w-[calc(30%_-_4.5rem)] pb-5 rounded-lg shadow-[3px_8px_12px_rgba(0,0,0,0.25)] scale-95 hover:scale-100 text-center"
                        >
                        <img
                            src={menu.menu_image}
                            alt={menu.menu_name}
                            className="bg-cover"
                        />
                        <div className="px-5">
                            <h2 className="font-bold text-xl mt-5 line-clamp-2 hyphens-auto">
                                {menu.menu_name}
                            </h2>
                            <p className="truncate text-gray-500 text-sm">
                                {menu.category.category_name}
                            </p>
                            <p className="mt-3 text-justify line-clamp-3">
                                {menu.menu_desc}
                            </p>
                            <p className="font-semibold my-4">
                                Rp. {formatPrice(menu.menu_price)}
                            </p>
                            <button type="submit" onClick={() => setShowEditMenuForm(true)} className="bg-[#43745B] hover:bg-green-800 text-white font-bold w-2/5 mx-2 py-2 px-4 shadow-xl rounded-xl">
                                    Edit
                            </button>
                            <button type="submit" onClick={() => setShowAdminDeleteConfirm(true)}  className="border border-[#43745B] bg-white hover:bg-gray-100 text-[#43745B] mx-2 font-bold w-2/5 py-2 px-4 shadow-xl rounded-xl">
                                    Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default MenuItems;