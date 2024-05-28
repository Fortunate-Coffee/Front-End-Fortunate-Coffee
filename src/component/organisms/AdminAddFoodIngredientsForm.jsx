import React, { useState } from "react";

const AdminAddFoodIngredientsForm = ({ setShowAddFoodIngredientsForm }) => {
    const [formDataList, setFormDataList] = useState([
        {
            foodIngredients: '',
            qty: '',
            type: 'In'
        }
    ]);

    const handleChange = (e) => {
        const { foodIngredients, value } = e.target;
        setFormDataList({
            ...formDataList,
            [foodIngredients]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lakukan sesuatu dengan formDataList, misalnya kirim ke backend
        // Kemudian kosongkan form atau lakukan tindakan lainnya
        setFormDataList([{ foodIngredients: '', qty: '', type: 'In' }]);
        setShowAddFoodIngredientsForm(false); // Close the current form
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-40">
            <div className="bg-white p-4 rounded-xl shadow-xl relative">
                <button className="absolute top-4 right-5 fa-beat-fade text-lg text-gray-500 hover:text-gray-700" onClick={() => setShowAddFoodIngredientsForm(false)}>
                    <i className="fas fa-times"></i>
                </button>
                <h2 className="mb-5 text-center text-lg font-semibold">Add Food Ingredients</h2>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <div className="flex flex-row justify-between my-1">
                        <div className="flex items-center">
                            <label htmlFor={`ingredients`} className="me-5 block text-sm font-medium text-gray-700">Ingredients</label>
                            <input type="text" id={`foodIngredients`} name="foodIngredients" value={formDataList.foodIngredients} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-1/2 shadow-lg" />
                        </div>
                        <div className="flex items-center justify-start">
                            <label htmlFor="qty" className="me-5 block text-sm font-medium text-gray-700">Qty</label>
                            <input type="number" id={"qty"} name="qty" min={1} value={formDataList.qty} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-1/2 shadow-lg" />
                        </div>
                    </div>
                    <p className="flex mt-3 w-full text-xs text-left text-gray-400 italic">* Qty per serving.</p>
                    <div>
                        <button type="submit" className="flex my-3 mx-auto bg-[#43745B] hover:bg-green-800 text-white font-bold py-2 px-4 shadow-xl rounded-xl hover:scale-110">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminAddFoodIngredientsForm;