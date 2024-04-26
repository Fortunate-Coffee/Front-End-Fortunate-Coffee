// AdminStockTable.js
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminEditFoodIngredientsForm from "../organisms/AdminEditFoodIngredientsForm";
import AdminDeleteConfirm from "./AdminDeleteConfirm";

export const adminStockData = [
  {
    foodIngredientsNo: 'Egg',
    qty: 10,
    date: '2024-04-18', 
    time: '10:00',
    type: 'Remaining Stock'
  },
  {
    foodIngredientsNo: 'Rice',
    qty: 10,
    date: '2024-04-18', 
    time: '10:00',
    type: 'Remaining Stock'
  },
  {
    foodIngredientsNo: 'Mushroom',
    qty: 10,
    date: '2024-04-18', 
    time: '10:00',
    type: 'In'
  },
  {
    foodIngredientsNo: 'Chocolate',
    qty: 10,
    date: '2024-04-18', 
    time: '10:00',
    type: 'Remaining Stock'
  },
  {
    foodIngredientsNo: 'Seaweed',
    qty: 10,
    date: '2024-04-18', 
    time: '10:00',
    type: 'In'
  },
  {
    foodIngredientsNo: 'Tomato',
    qty: 10,
    date: '2024-04-18', 
    time: '10:00',
    type: 'Remaining Stock'
  }
];

const AdminStockTable = ({ selectedType }) => {
    const [showEditFoodIngredientsForm, setShowEditFoodIngredientsForm] = useState(false);
    const [showAdminDeleteConfirm, setShowAdminDeleteConfirm] = useState(false);
    const [editFormData, setEditFormData] = useState({});

    // Fungsi untuk menangani penekanan tombol edit
    const handleEdit = (data) => {
        setEditFormData(data);
        setShowEditFoodIngredientsForm(true);
    };

    return (
        <div className="">
            {showEditFoodIngredientsForm && <AdminEditFoodIngredientsForm setShowEditFoodIngredientsForm={setShowEditFoodIngredientsForm} editFormData={editFormData}/>}
            {showAdminDeleteConfirm && <AdminDeleteConfirm setShowAdminDeleteConfirm={setShowAdminDeleteConfirm}/>}

            <div className="w-full my-10">
                <table className="border border-gray-300 shadow-xl min-w-full divide-y divide-gray-300">
                    <thead className="bg-[#43745B] text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hover:scale-110">
                                name
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hover:scale-110">
                                qty
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hover:scale-110">
                                last updated date
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hover:scale-110">
                                last updated time
                            </th>
                            {selectedType !== "Remaining Stock" && (
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hover:scale-110">
                                    action
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                        {adminStockData.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white text-black' : 'bg-green-50 text-black'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium">
                                    {item.foodIngredientsNo}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    {item.qty}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    {item.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    {item.time}
                                </td>
                                {selectedType !== "Remaining Stock" && (
                                    <td colSpan={2} className="flex justify-around px-6 py-4 whitespace-nowrap text-sm text-center">
                                        <Link to="#" onClick={() => handleEdit(item)}>
                                            <i className="fa-solid fa-pen-to-square text-lg text-green-800 hover:scale-110"></i>
                                        </Link>
                                        <Link to="#" onClick={() => setShowAdminDeleteConfirm(true)}>
                                            <i className="fa-solid fa-trash-can text-lg text-red-500 hover:scale-110"></i>
                                        </Link>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminStockTable;
