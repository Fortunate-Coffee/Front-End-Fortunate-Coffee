import { useState, useEffect } from "react";

const AdminAddMenuForm = ({ setShowAddMenuForm, setShowAddMenuIngredientsForm }) => {
    const [category, setCategory] = useState([]);
    const [menuNames, setMenuNames] = useState([]);
    const [formData, setFormData] = useState({
        category_id: '',
        menu_name: '',
        menu_price: '',
        menu_image: null,
        menu_desc: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategory = async () => {
            const token = localStorage.getItem('accessToken');
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/category`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    // Sort the categories alphabetically by category_name
                    const sortedCategories = data.sort((a, b) => a.category_name.localeCompare(b.category_name));
                    setCategory(sortedCategories);

                } else {
                    console.error('Error fetching category:', data);
                }
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        const fetchMenuNames = async () => {
            const token = localStorage.getItem('accessToken');
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/menu`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setMenuNames(data.map(menu => menu.menu_name.toLowerCase()));
                } else {
                    console.error('Error fetching menus:', data);
                }
            } catch (error) {
                console.error('Error fetching menus:', error);
            }
        };

        fetchCategory();
        fetchMenuNames();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (menuNames.includes(formData.menu_name.toLowerCase())) {
            setError('Menu name already exists.');
            setSuccess('');
            return;
        }

        if (formData.menu_price < 1000) {
            setError('Price must be at least 1000.');
            setSuccess('');
            return;
        }

        const token = localStorage.getItem('accessToken');
        setLoading(true); // Set loading state to true before making the request

        const formDataToSend = new FormData();
        formDataToSend.append('category_id', formData.category_id);
        formDataToSend.append('menu_name', formData.menu_name);
        formDataToSend.append('menu_price', formData.menu_price);
        formDataToSend.append('menu_image', formData.menu_image);
        formDataToSend.append('menu_desc', formData.menu_desc);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/menu`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formDataToSend
            });

            const data = await response.json();
            if (response.ok) {
                const menuId = data.data.menu_id;
                setSuccess('Added new menu successfully!');
                setError('');
                setTimeout(() => {
                    setShowAddMenuForm(false);
                    setShowAddMenuIngredientsForm(true, menuId);// Pass the new menu ID to the ingredients form
                }, 2000); 
                console.log('menu ID: ', data);
            } else {
                console.error('Error creating menu:', data);
            }
        } catch (error) {
            console.error('Error creating menu:', error);
        } finally {
            setLoading(false); // Set loading state to false after the request is complete
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'menu_price' && value < 1000) {
            setError('Price must be at least 1000.');
        } else {
            setError('');
        }
    };

    const handleImageChange = (e) => {
        setFormData({
            ...formData,
            menu_image: e.target.files[0]
        });
    };

    return (
        <div className="">          
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                <div className="bg-white p-4 rounded-xl shadow-xl relative">
                    <button className="absolute top-4 right-5 fa-beat-fade text-lg text-gray-500 hover:text-gray-700" onClick={() => setShowAddMenuForm(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                    <h2 className="mb-5 text-center text-lg font-semibold">Add New Menu</h2>
                    <form onSubmit={handleSubmit} className="px-5">
                        <div className="flex items-center mb-4">
                            <label htmlFor="name" className="w-4/12 block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="menu_name" required name="menu_name" value={formData.menu_name} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-lg" />
                        </div>
                        <div className="flex items-center mb-4">
                            <label htmlFor="category" className="w-4/12 block text-sm font-medium text-gray-700">Category</label>
                            <select id="category_id" required name="category_id" value={formData.category_id} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-lg">
                                <option value="" disabled>Select a category</option>
                                {category.map((category, index) => (
                                    <option key={index} value={category.category_id}>{category.category_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center mb-4">
                            <label htmlFor="description" className="w-4/12 block text-sm font-medium text-gray-700">Description</label>
                            <textarea id="menu_desc" required name="menu_desc" value={formData.menu_desc} onChange={handleChange} rows="4" className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-lg"></textarea>
                        </div>
                        <div className="flex items-center mb-4">
                            <label htmlFor="price" className="w-4/12 block text-sm font-medium text-gray-700">Price (Rp)</label>
                            <input type="number" id="menu_price" required name="menu_price" min={1000} value={formData.menu_price} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-lg" />
                        </div>
                        <div className="flex items-center mb-6">
                            <label htmlFor="image" className="w-4/12 block text-sm font-medium text-gray-700">Image</label>
                            <input type="file" id="menu_image" required name="menu_image" onChange={handleImageChange} accept="image/*" className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-lg" />
                        </div>
                        {error && <p className="italic text-red-500">{error}</p>}
                        {success && <p className="italic text-green-500">{success}</p>}
                        <div>
                            <button type="submit" disabled={loading} className="flex my-3 mx-auto bg-[#43745B] hover:bg-green-800 text-white font-bold py-2 px-4 shadow-xl rounded-xl hover:scale-110">
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 12h4zm2 5.291l-2.162-.88A8.015 8.015 0 014 12H0c0 2.021.388 3.936 1.081 5.627L6 17.29z"></path>
                                    </svg>
                                ) : (
                                    'Continue'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminAddMenuForm;