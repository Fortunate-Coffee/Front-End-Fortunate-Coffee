import React, { useState } from "react";

const AdminEditMenuIngredientsForm = ({ setShowEditMenuIngredientsForm }) => {
    const foodIngredientsList = [
        { text: 'Egg' },
        { text: 'Rice' },
        { text: 'Corn' },
        { text: 'Mushroom' },
        { text: 'Tempe' },
    ];

    const [formDataList, setFormDataList] = useState([
        {
            foodIngredients: '',
            qty: ''
        }
    ]);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const newList = [...formDataList];
        newList[index][name] = value;
        setFormDataList(newList);
    };

    const handleAddForm = () => {
        setFormDataList([...formDataList, { foodIngredients: '', qty: '' }]);
    };

    const handleRemoveForm = (index) => {
        const newList = [...formDataList];
        newList.splice(index, 1);
        setFormDataList(newList);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lakukan sesuatu dengan formDataList, misalnya kirim ke backend
        // Kemudian kosongkan form atau lakukan tindakan lainnya
        setFormDataList([{ foodIngredients: '', qty: '' }]);
        setShowEditMenuIngredientsForm(false); // Close the current form
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-40">
            <div className="bg-white p-4 rounded-xl shadow-xl relative">
                <button className="absolute top-4 right-5 fa-beat-fade text-lg text-gray-500 hover:text-gray-700" onClick={() => setShowEditMenuIngredientsForm(false)}>
                    <i className="fas fa-times"></i>
                </button>
                <h2 className="mb-5 text-center text-lg font-semibold">Menu Ingredients</h2>
                <form onSubmit={handleSubmit} className="flex flex-col justify-between items-center">
                    {formDataList.map((formData, index) => (
                        <div key={index} className="flex flex-row justify-between my-1">
                            <div className="flex items-center">
                                <label htmlFor={`ingredient-${index}`} className="me-5 block text-sm font-medium text-gray-700">Ingredients</label>
                                <select id={`ingredient-${index}`} name="foodIngredients" value={formData.foodIngredients} onChange={(e) => handleChange(e, index)} required className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-xl">
                                    {foodIngredientsList.map((foodIngredient, i) => (
                                        <option key={i} value={foodIngredient.text}>{foodIngredient.text}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center justify-center">
                                <label htmlFor={`qty-${index}`} className="me-5 block text-sm font-medium text-gray-700">Qty</label>
                                <input type="number" id={`qty-${index}`} name="qty" min={1} value={formData.qty} onChange={(e) => handleChange(e, index)} required className="mt-1 p-2 border border-gray-300 rounded-md w-1/4 shadow-lg" />
                            </div>
                            <div className="flex items-center justify-between">
                                {index === formDataList.length - 1 ? (
                                    <button type="button" onClick={handleAddForm} className="px-3 py-1 ml-2 bg-[#43745B] text-white hover:bg-green-800 font-bold rounded-full shadow-xl">+</button>
                                ) : (
                                    <button type="button" onClick={() => handleRemoveForm(index)} className="px-3 py-1 ml-2 bg-white text-[#43745B] border hover:bg-gray-100 font-bold rounded-full shadow-xl">-</button>
                                )}
                            </div>
                        </div>
                    ))}
                    <p className="flex mt-3 w-full text-xs text-left text-gray-400 italic">* Qty per serving.</p>
                    <div>
                        <button type="submit" className="flex my-3 mx-auto bg-[#43745B] hover:bg-green-800 text-white font-bold py-2 px-4 shadow-xl rounded-xl">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminEditMenuIngredientsForm;
