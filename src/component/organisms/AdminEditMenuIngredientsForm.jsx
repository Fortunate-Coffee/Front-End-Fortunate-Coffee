import { useState, useEffect } from "react";

const AdminEditMenuIngredientsForm = ({ setShowEditMenuIngredientsForm, menuId }) => {
    const [ingredients, setIngredients] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [formDataList, setFormDataList] = useState([]);
    const [warning, setWarning] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMenuIngredients = async () => {
            const token = localStorage.getItem('accessToken');
            try {
                const response = await fetch(`https://backend-fortunate-coffee.up.railway.app/api/v1/menu-ingredients/${menuId}/ingredients`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setFormDataList(data);
                    setOriginalData([...data]); // store
                } else {
                    console.error('Error fetching menu ingredients:', data);
                }
            } catch (error) {
                console.error('Error fetching menu ingredients:', error);
            }
        };

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
                    // Sort ingredients by food_ingredients_name in ascending order
                    const sortedData = data.sort((a, b) => a.food_ingredients_name.localeCompare(b.food_ingredients_name));
                    setIngredients(sortedData);
                } else {
                    console.error('Error fetching ingredients:', data);
                }
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        };

        fetchMenuIngredients();
        fetchIngredients();
    }, [menuId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading state to true before making the request
        
        const token = localStorage.getItem('accessToken');

        try {
            const requestData = {
                ingredients: formDataList.map(item => ({
                    food_ingredients_id: item.food_ingredients_id,
                    menu_ingredients_qty: item.menu_ingredients_qty
                }))
            };

            const response = await fetch(`https://backend-fortunate-coffee.up.railway.app/api/v1/menu-ingredients/${menuId}/ingredients`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestData)
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Menu ingredients updated successfully:', data);
                setSuccess('Menu ingredients updated successfully!');
                setTimeout(() => {
                    setShowEditMenuIngredientsForm(false);
                }, 2000); 
            } else {
                console.error('Error updating menu ingredients:', data);
            }
        } catch (error) {
            console.error('Error updating menu ingredients:', error);
        } finally {
            setLoading(false); // Set loading state to false after the request is complete
        }
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...formDataList];
        list[index][name] = value;
        setFormDataList(list);

        if (name === "food_ingredients_id") {
            const isDuplicate = list.some((item, idx) => item.food_ingredients_id === value && idx !== index);
            if (isDuplicate) {
                setWarning("Duplicate ingredients selected!");
            } else {
                setWarning("");
            }
        }   
        setFormDataList(list);
    };

    const handleAddForm = () => {
        setFormDataList([...formDataList, { food_ingredients_id: '', menu_ingredients_qty: '' }]);
    };

    const handleRemoveForm = (index) => {
        const list = [...formDataList];
        list.splice(index, 1);
        setFormDataList(list);
        setWarning(""); // Reset warning when an item is removed
    };

    const getAvailableIngredients = (currentIndex) => {
        const selectedIds = formDataList.map((item, index) => index !== currentIndex ? item.food_ingredients_id : null).filter(Boolean);
        return ingredients.filter(ingredient => !selectedIds.includes(ingredient.food_ingredients_id));
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
                                <select id={`ingredient-${index}`} name="food_ingredients_id" value={formData.food_ingredients_id} onChange={(e) => handleChange(e, index)} required className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-xl">
                                    <option value="" disabled>Select an ingredient</option>
                                    {getAvailableIngredients(index).map((foodIngredient, i) => (
                                        <option key={i} value={foodIngredient.food_ingredients_id}>{foodIngredient.food_ingredients_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center justify-center">
                                <label htmlFor={`qty-${index}`} className="me-5 block text-sm font-medium text-gray-700">Qty</label>
                                <input type="number" id={`qty-${index}`} name="menu_ingredients_qty" min={1} value={formData.menu_ingredients_qty} onChange={(e) => handleChange(e, index)} required className="mt-1 p-2 border border-gray-300 rounded-md w-1/4 shadow-lg" />
                            </div>
                            <div className="flex items-center justify-between">
                                {index === formDataList.length - 1 ? (
                                    <button type="button" onClick={handleAddForm} className="px-3 py-1 ml-2 bg-[#43745B] text-white hover:bg-green-800 font-bold rounded-full shadow-xl hover:scale-110">+</button>
                                ) : (
                                    <button type="button" onClick={() => handleRemoveForm(index)} className="px-3 py-1 ml-2 bg-white text-[#43745B] border hover:bg-gray-100 font-bold rounded-full shadow-xl hover:scale-110">-</button>
                                )}
                            </div>
                        </div>
                    ))}
                    {warning && <p className="flex text-red-500 text-sm w-full mt-3">{warning}</p>}
                    {success && <p className="flex text-green-500 text-sm w-full mt-3">{success}</p>}
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

export default AdminEditMenuIngredientsForm;
