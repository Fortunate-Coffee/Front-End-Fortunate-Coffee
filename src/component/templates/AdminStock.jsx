import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExportButton from "../atoms/ExportButton";
import DateSelect from "../atoms/DateSelect";
import GetDataButton from "../atoms/GetDataButton";
import AdminStockTable from "../organisms/AdminStockTable";
import AdminConfirmsFoodIngredientsForm from "../organisms/AdminConfirmsFoodIngredientsForm"; // Import modal confirmation
import AdminAddFoodIngredientsForm from "../organisms/AdminAddFoodIngredientsForm";
import AdminAddTypeFoodIngredientsForm from "../organisms/AdminAddTypeFoodIngredientsForm";

const AdminStock = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showAddFoodIngredientsForm, setShowAddFoodIngredientsForm] = useState(false);
    const [showAddTypeFoodIngredientsForm, setShowAddTypeFoodIngredientsForm] = useState(false);
    const [selectedType, setSelectedType] = useState('Remaining Stock');
    
    useEffect(() => {
        // Inisialisasi selectedType berdasarkan pilihan pertama dari dropdown
        setSelectedType(document.getElementById('selectOptionType').value);
    }, []);

    const handleNewIngredients = () => {
        setShowConfirmation(true);
    };

    const ingredients = [
        { text: 'All' },
        { text: 'Egg' },
        { text: 'Rice' },
        { text: 'Corn' },
        { text: 'Mushroom' },
        { text: 'Tempe' },
    ];

    const types = [
        { text: 'Remaining Stock'},
        { text: 'In' },
        { text: 'Out' },
    ];
    

    return (
        <div className="">
            {showConfirmation && (
                <AdminConfirmsFoodIngredientsForm
                    setShowAddFoodIngredientsForm={setShowAddFoodIngredientsForm}
                    setShowAddTypeFoodIngredientsForm={setShowAddTypeFoodIngredientsForm}
                    setShowConfirmation={setShowConfirmation}
                />
            )}

            {showAddFoodIngredientsForm && (
                <AdminAddFoodIngredientsForm setShowAddFoodIngredientsForm={setShowAddFoodIngredientsForm} />
            )}

            {showAddTypeFoodIngredientsForm && (
                <AdminAddTypeFoodIngredientsForm setShowAddTypeFoodIngredientsForm={setShowAddTypeFoodIngredientsForm} />
            )}

            <div className="p-3 flex justify-between items-center bg-[#43745B] shadow-xl">
                <h1 className='text-white tracking-wide'>Stock</h1>
                <div className="flex">
                    <button onClick={handleNewIngredients} className='px-3 py-2 flex ms-5 items-center flex-row shadow-2xl rounded-xl bg-white'>
                        <i className="flex items-center fas fa-square-plus fa-lg text-[#43745B]"></i>
                        <p className='ms-2 text-[#43745B]'>New Ingredients</p>
                    </button>
                    <ExportButton />
                </div>
            </div>
            <div className="mt-6 p-3">
                <div className="flex justify-between">
                    <DateSelect />
                    <div className="mx-6">
                        <label htmlFor="selectOptionType" className="font-medium me-6 text-[#43745B]">Ingredients</label>
                        <select id="selectOptionType" name="selectOptionType" className="border border-[#43745B] rounded-xl shadow-xl p-2 px-3 me-2">
                            {ingredients.map((ingredients, index) => (
                                <option key={index} value={ingredients.text}>{ingredients.text}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mx-6">
                        <label htmlFor="selectOption" className="font-medium me-6 text-[#43745B]">Type</label>
                        <select id="selectOption" onChange={(e) => setSelectedType(e.target.value)} name="selectOption" className="border border-[#43745B] rounded-xl shadow-xl p-2 px-3 me-2">
                            {types.map((type, index) => (
                                <option key={index} value={type.text}>{type.text}</option>
                            ))}
                        </select>
                    </div>
                    <GetDataButton />
                </div>
            <AdminStockTable selectedType={selectedType} />
            </div>
        </div>
    );
}

export default AdminStock;