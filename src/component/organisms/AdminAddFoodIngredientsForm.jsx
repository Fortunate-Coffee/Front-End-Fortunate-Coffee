import { useState } from "react";

const AdminAddFoodIngredientsForm = ({ setShowAddFoodIngredientsForm, foodIngredients }) => {
    const [formDataList, setFormDataList] = useState({
            food_ingredients_name: '',
            food_ingredients_stock: ''
        });

    const [successMessage, setSuccessMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the food ingredient name already exists
        const isDuplicate = foodIngredients && foodIngredients.some(ingredient => ingredient.food_ingredients_name.toLowerCase() === formDataList.food_ingredients_name.toLowerCase());
        if (isDuplicate) {
            setWarningMessage('Food ingredient name already exists.');
            setSuccessMessage('');
            return;
        }

        if (formDataList.food_ingredients_stock <= 1) {
            setWarningMessage('Stock must be greater than 1.');
            setSuccessMessage('');
            return;
        }

        const data = {
            food_ingredients_name: formDataList.food_ingredients_name,
            food_ingredients_stock: formDataList.food_ingredients_stock
        };

        // Assuming you have a function to get the stored token
        const token = localStorage.getItem('accessToken');
        setLoading(true);

        try {
            const response = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/food-ingredients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error.message || 'Failed to add food ingredient');
            }

            const result = await response.json();
            console.log('Food ingredient added:', result);

            setFormDataList({
                food_ingredients_name: '',
                food_ingredients_stock: ''
            });

            setSuccessMessage('Food ingredient added successfully!');
            setWarningMessage('');
            setTimeout(() => {
                setShowAddFoodIngredientsForm(false);
            }, 2000); 
        } catch (error) {
            console.error('Error:', error);
            setWarningMessage('Failed to add food ingredient. Please try again.');
            setSuccessMessage('');
        } finally {
            setLoading(false);
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataList({
            ...formDataList,
            [name]: value
        });
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
                            <label htmlFor='food_ingredients_name' className="me-5 block text-sm font-medium text-gray-700">Ingredients</label>
                            <input type="text" id='food_ingredients_name' name="food_ingredients_name" value={formDataList.food_ingredients_name} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-1/2 shadow-lg" />
                        </div>
                        <div className="flex items-center justify-start">
                            <label htmlFor="food_ingredients_stock" className="me-5 block text-sm font-medium text-gray-700">Qty</label>
                            <input type="number" id="food_ingredients_stock" name="food_ingredients_stock" min={1} value={formDataList.food_ingredients_stock} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded-md w-1/2 shadow-lg" />
                        </div>
                    </div>
                    {successMessage && <p className="flex w-full mt-3 text-green-600 text-left">{successMessage}</p>}
                    {warningMessage && <p className="flex w-full mt-3 text-red-600 text-left">{warningMessage}</p>}
                    <p className="flex mt-3 w-full text-xs text-left text-gray-400 italic">* Qty per serving.</p>
                    <div>
                    <button type="submit" disabled={loading} className="flex my-3 mx-auto bg-[#43745B] hover:bg-green-800 text-white font-bold py-2 px-4 shadow-xl rounded-xl hover:scale-110">
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 12h4zm2 5.291l-2.162-.88A8.015 8.015 0 014 12H0c0 2.021.388 3.936 1.081 5.627L6 17.29z"></path>
                                </svg>
                            ) : (
                                'Save'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminAddFoodIngredientsForm;
