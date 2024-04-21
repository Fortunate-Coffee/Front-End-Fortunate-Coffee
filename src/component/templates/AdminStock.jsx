import { useState } from "react";
import { Link } from "react-router-dom";
import ExportButton from "../atoms/ExportButton";
import DateSelect from "../atoms/DateSelect";
import GetDataButton from "../atoms/GetDataButton";
import AdminStockTable from "../organisms/AdminStockTable";
import AdminAddFoodIngredientsForm from "../organisms/AdminAddFoodIngredientsForm";

const AdminStock = () => {
    const [showAddFoodIngredientsForm, setShowAddFoodIngredientsForm] = useState(false);

    const ingredients = [
        { text: 'All' },
        { text: 'Egg' },
        { text: 'Rice' },
        { text: 'Corn' },
        { text: 'Mushroom' },
        { text: 'Tempe' },
    ];
    
    return(
        <div className="">
            {showAddFoodIngredientsForm && <AdminAddFoodIngredientsForm setShowAddFoodIngredientsForm={setShowAddFoodIngredientsForm} />}

            <div className="p-3 flex justify-between items-center bg-[#43745B] shadow-xl">
                <h1 className='text-white tracking-wide'>Stock</h1>
                <div className="flex">
                    <Link to="#" onClick={() => setShowAddFoodIngredientsForm(true)} className='px-3 py-2 flex ms-5 flex-row shadow-2xl rounded-xl bg-white'>
                        <i className="flex items-center fas fa-square-plus fa-lg text-[#43745B]"></i>
                        <p className='ms-2 text-[#43745B]'>New Ingredients</p>
                    </Link>
                    <ExportButton />
                </div>
            </div>
            <div className="mt-6 p-3">
                <div className="flex">
                        <DateSelect />
                        <div className="mx-6">
                            <label htmlFor="selectOption" className="font-medium me-6 text-[#43745B]">Ingredients</label>
                            <select id="selectOption" name="selectOption" className="border border-[#43745B] rounded-xl shadow-xl p-2 px-3 me-2">
                                {ingredients.map((ingredients, index) => (
                                    <option key={index} value={ingredients.text}>{ingredients.text}</option>
                                ))}
                            </select>
                        </div>
                        <GetDataButton />
                </div>
                <AdminStockTable />
            </div>
        </div>
    );
}

export default AdminStock;