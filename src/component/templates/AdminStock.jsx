import React, { useState, useEffect } from "react";
import ExportButton from "../atoms/ExportButton";
import DateSelect from "../atoms/DateSelect";
import GetDataButton from "../atoms/GetDataButton";
import AdminStockTable from "../organisms/AdminStockTable";
import AdminConfirmsFoodIngredientsForm from "../organisms/AdminConfirmsFoodIngredientsForm";
import AdminAddFoodIngredientsForm from "../organisms/AdminAddFoodIngredientsForm";
import AdminAddTypeFoodIngredientsForm from "../organisms/AdminAddTypeFoodIngredientsForm";

const AdminStock = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showAddFoodIngredientsForm, setShowAddFoodIngredientsForm] = useState(false);
    const [showAddTypeFoodIngredientsForm, setShowAddTypeFoodIngredientsForm] = useState(false);
    const [selectedType, setSelectedType] = useState('Remaining Stock');
    const [selectedDate, setSelectedDate] = useState('Today');
    const [foodIngredients, setFoodIngredients] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [loading, setLoading] = useState(false); 
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchFoodIngredients = async () => {
            const token = localStorage.getItem('accessToken');
            try {
                const response = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/food-ingredients', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setFoodIngredients(Array.isArray(data) ? data : []);
                } else {
                    console.error('Error fetching food ingredients:', data);
                }
            } catch (error) {
                console.error('Error fetching food ingredients:', error);
            }
        };

        fetchFoodIngredients();
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        let url = `https://backend-fortunate-coffee.up.railway.app/api/v1/filtered-food-ingredients`;

        const queryParams = new URLSearchParams();
        if (selectedIngredient) {
            queryParams.append('food_ingredients_id', selectedIngredient);
        }
        if (selectedType) {
            queryParams.append('type', selectedType);
        }
        if (selectedDate) {
            queryParams.append('period', selectedDate);
        }

        url += `?${queryParams.toString()}`;

        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Tambahkan token ke header permintaan
                }
            });
            const result = await response.json();
            setData(Array.isArray(result) ? result : []);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGetData = () => {
        fetchData();
    };

    const handleNewIngredients = () => {
        setShowConfirmation(true);
        setSelectedType('Remaining Stock'); // Set jenis bahan baku kembali ke "Remaining Stock"
    };

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
                <AdminAddFoodIngredientsForm setShowAddFoodIngredientsForm={setShowAddFoodIngredientsForm} foodIngredients={foodIngredients} />
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
                    <DateSelect setSelectedDate={setSelectedDate} />
                    <div className="mx-6">
                        <label htmlFor="selectOptionType" className="font-medium me-6 text-[#43745B]">Ingredients</label>
                        <select value={selectedIngredient} onChange={(e) => setSelectedIngredient(e.target.value)} id="selectOptionType" name="selectOptionType" className="border border-[#43745B] rounded-xl shadow-xl p-2 px-3 me-2">
                            <option value="" disabled>Select an ingredient</option>
                            {foodIngredients.map((ingredients, index) => (
                                <option key={index} value={ingredients.food_ingredients_id}>{ingredients.food_ingredients_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mx-6">
                        <label htmlFor="selectOption" className="font-medium me-6 text-[#43745B]">Type</label>
                        <select id="selectOption" onChange={(e) => setSelectedType(e.target.value)} name="selectOption" className="border border-[#43745B] rounded-xl shadow-xl p-2 px-3 me-2">
                            <option value="" disabled>Select a type</option>
                            {types.map((type, index) => (
                                <option key={index} value={type.text}>{type.text}</option>
                            ))}
                        </select>
                    </div>
                    <GetDataButton onClick={handleGetData} loading={loading} />
                </div>
                <AdminStockTable data={data} foodIngredients={foodIngredients} />
            </div>
        </div>
    );
}

export default AdminStock;