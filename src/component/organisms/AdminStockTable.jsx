import { useState } from "react";
import { Link } from "react-router-dom";
import AdminEditFoodIngredientsForm from "../organisms/AdminEditFoodIngredientsForm";
import AdminDeleteConfirm from "./AdminDeleteConfirm";

const AdminStockTable = ({ data, selectedType, foodIngredients }) => {
    const [showEditFoodIngredientsForm, setShowEditFoodIngredientsForm] = useState(false);
    const [showAdminDeleteConfirm, setShowAdminDeleteConfirm] = useState(false);
    const [editFormData, setEditFormData] = useState({});
    const [deleteItemId, setDeleteItemId] = useState(null);

    const handleEdit = (data) => {
        setEditFormData(data);
        setShowEditFoodIngredientsForm(true);
    };

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString();
        return { date, time };
    };

    const handleDeleteStock = (id) => {
        setDeleteItemId(id);
        setShowAdminDeleteConfirm(true);
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(`https://backend-fortunate-coffee.up.railway.app/api/v1/food-ingredients/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete item');
            }
            // Menutup konfirmasi hapus
            setShowAdminDeleteConfirm(false);
            console.log("Deleted Successful")

        } catch (error) {
            console.error('Error deleting item:', error);
            // Tambahkan penanganan kesalahan jika diperlukan
        }
    };

    return (
        <div>
            {showEditFoodIngredientsForm && <AdminEditFoodIngredientsForm setShowEditFoodIngredientsForm={setShowEditFoodIngredientsForm} editFormData={editFormData} foodIngredients={foodIngredients}/>}
            {showAdminDeleteConfirm && <AdminDeleteConfirm setShowDeleteConfirm={setShowAdminDeleteConfirm} onConfirmDelete={handleDelete} entityName="food ingredient" itemId={deleteItemId} />}

            <div className="w-full my-10">
                <table className="border border-gray-300 shadow-xl min-w-full divide-y divide-gray-300">
                    <thead className="bg-[#43745B] text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hover:scale-110">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hover:scale-110">
                                Qty
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hover:scale-110">
                                Last Updated Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hover:scale-110">
                                Last Updated Time
                            </th>
                            {selectedType !== "In" && selectedType !== "Out" && (
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hover:scale-110">
                                    Action
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center p-4">
                                    No Data Available
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => {
                                const { date, time } = formatDateTime(item.updatedAt);
                                return (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white text-black' : 'bg-green-50 text-black'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium">
                                            {item.food_ingredients_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                            {item.food_ingredients_stock}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                            {date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                            {time}
                                        </td>
                                        {selectedType !== "In" && selectedType !== "Out" && (
                                            <td colSpan={2} className="flex justify-around px-6 py-4 whitespace-nowrap text-sm text-center">
                                                <Link to="#" onClick={() => handleEdit(item)}>
                                                    <i className="fa-solid fa-pen-to-square text-lg text-green-800 hover:scale-110"></i>
                                                </Link>
                                                <Link to="#" onClick={() => handleDeleteStock(item.food_ingredients_id)}>
                                                    <i className="fa-solid fa-trash-can text-lg text-red-500 hover:scale-110"></i>
                                                </Link>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminStockTable;
