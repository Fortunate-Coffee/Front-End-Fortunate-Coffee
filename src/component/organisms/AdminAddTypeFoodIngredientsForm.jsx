import React, { useState } from "react";

const AdminAddTypeFoodIngredientsForm = ({ setShowAddTypeFoodIngredientsForm }) => {
    const ingredients = [
        { text: 'All' },
        { text: 'Egg' },
        { text: 'Rice' },
        { text: 'Corn' },
        { text: 'Mushroom' },
        { text: 'Tempe' },
    ];

    const types = [
        { text: 'In' },
        { text: 'Out' },
    ];

    const [formDataList, setFormDataList] = useState([
        {
            foodIngredients: '',
            qty: '',
            type: ''
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
        setFormDataList([{ foodIngredients: '', qty: '', type: '' }]);
        setShowAddTypeFoodIngredientsForm(false); // Close the current form
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-40">
            <div className="bg-white p-4 rounded-xl shadow-xl relative">
                <button className="absolute top-4 right-5 fa-beat-fade text-lg text-gray-500 hover:text-gray-700" onClick={() => setShowAddTypeFoodIngredientsForm(false)}>
                    <i className="fas fa-times"></i>
                </button>
                <h2 className="mb-5 text-center text-lg font-semibold">Add Type Food Ingredients</h2>
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <div className="my-2">
                        <div className="flex items-center">
                            <label htmlFor="selectOption" className="w-20 me-5 block text-sm font-medium text-gray-700">Ingredients</label>
                            <select id="selectOption" name="selectOption" className="border border-gray-300 rounded-md shadow-lg w-56 p-2 px-3 me-2">
                                {ingredients.map((ingredients, index) => (
                                    <option key={index} value={ingredients.text}>{ingredients.text}</option>
                                ))}
                            </select>
                        </div>
                        <div className="my-2 flex items-center">
                            <label htmlFor="qty" className="w-20 me-5 block text-sm font-medium text-gray-700">Qty</label>
                            <input type="number" id={"qty"} name="qty" min={1} value={formDataList.qty} onChange={handleChange} required className="w-20 mt-1 p-2 border border-gray-300 rounded-md shadow-lg" />
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="selectOption" className="w-20 me-5 block text-sm font-medium text-gray-700">Type</label>
                            <select id="selectOption" name="selectOption" className="border border-gray-300 rounded-md shadow-lg p-2 px-3 me-2">
                                {types.map((type, index) => (
                                    <option key={index} value={type.text}>{type.text}</option>
                                ))}
                            </select>
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

export default AdminAddTypeFoodIngredientsForm;
