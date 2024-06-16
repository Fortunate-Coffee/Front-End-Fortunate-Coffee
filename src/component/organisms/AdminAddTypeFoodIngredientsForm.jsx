import { useState, useEffect } from "react";

const AdminAddTypeFoodIngredientsForm = ({ setShowAddTypeFoodIngredientsForm }) => {
    const [ingredients, setIngredients] = useState([]);
    const [formData, setFormData] = useState({
        food_ingredients_id: '',
        detail_food_ingredients_qty: '',
        detail_food_ingredients_type: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [types] = useState([
        { text: 'In' },
        { text: 'Out' },
    ]);

    useEffect(() => {
        const fetchIngredients = async () => {
            const token = localStorage.getItem('accessToken');
            try {
                const response = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/food-ingredients', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    // Sort the ingredients alphabetically by name before setting the state
                    data.sort((a, b) => a.food_ingredients_name.localeCompare(b.food_ingredients_name));
                    setIngredients(data);
                } else {
                    console.error('Error fetching ingredients:', data);
                }
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        };

        fetchIngredients();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('accessToken');
        const { food_ingredients_id, detail_food_ingredients_qty, detail_food_ingredients_type } = formData;

        if (!food_ingredients_id || !detail_food_ingredients_qty || !detail_food_ingredients_type) {
            setError('All fields are required.');
            console.log(food_ingredients_id);
            console.log(detail_food_ingredients_qty);
            console.log(detail_food_ingredients_type);
            setSuccess('');
            setLoading(false);
            return;
        }

        // Convert quantity to number
        const payload = {
            ...formData,
            detail_food_ingredients_qty: Number(detail_food_ingredients_qty)
        };


        try {
            const response = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/type-food-ingredients', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Added new ingredient type successfully!');
                setError('');
                setTimeout(() => {
                    setShowAddTypeFoodIngredientsForm(false);
                }, 2000);
            } else {
                setError(data.message || 'Error adding ingredient transaction');
                setSuccess('');
            }
        } catch (error) {
            console.error('Error adding ingredient type:', error);
            setError('An error occurred. Please try again.');
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
                            <label htmlFor="foodIngredients" className="w-20 me-5 block text-sm font-medium text-gray-700">Ingredients</label>
                            <select id="food_ingredients_id" name="food_ingredients_id" value={formData.food_ingredients_id} onChange={handleChange} className="border border-gray-300 rounded-md shadow-lg w-56 p-2 px-3 me-2">
                            <option value="" disabled>Select an ingredient</option>
                                {ingredients.map((ingredient, index) => (
                                    <option key={index} value={ingredient.food_ingredients_id}>{ingredient.food_ingredients_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="my-2 flex items-center">
                            <label htmlFor="detail_food_ingredients_qty" className="w-20 me-5 block text-sm font-medium text-gray-700">Qty</label>
                            <input type="number" id={"detail_food_ingredients_qty"} name="detail_food_ingredients_qty" min={1} value={formData.detail_food_ingredients_qty} onChange={handleChange} required className="w-20 mt-1 p-2 border border-gray-300 rounded-md shadow-lg" />
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="detail_food_ingredients_type" className="w-20 me-5 block text-sm font-medium text-gray-700">Type</label>
                            <select id="detail_food_ingredients_type" name="detail_food_ingredients_type" value={formData.detail_food_ingredients_type}  onChange={handleChange} className="border border-gray-300 rounded-md shadow-lg p-2 px-3 me-2">
                                <option value="" disabled>Select a type</option>
                                {types.map((type, index) => (
                                    <option key={index} value={type.text}>{type.text}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {error && <p className="flex w-full mt-3 text-red-500 text-left">{error}</p>}
                    {success && <p className="flex w-full mt-3 text-green-500 text-left">{success}</p>}
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

export default AdminAddTypeFoodIngredientsForm;
