import { useState, useEffect } from "react";

const AdminEditMenuForm = ({ setShowEditMenuForm, setShowEditMenuIngredientsForm, menuId }) => {
    const [category, setCategory] = useState([]);
    const [menuName, setMenuName] = useState([]);
    const [formData, setFormData] = useState({
        category_id: '',
        menu_name: '',
        menu_price: '',
        menu_image: null,
        menu_desc: '',
        original_menu_name: '', // Include original_menu_name in initial state
    });
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        const fetchCategory = async () => {
            try {
                const response = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/category', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                // Sort data by category_name in ascending order
                const sortedData = data.sort((a, b) => a.category_name.localeCompare(b.category_name));
                setCategory(sortedData);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        const fetchMenuDetail = async () => {
            try {
                const response = await fetch(`https://backend-fortunate-coffee.up.railway.app/api/v1/menu/${menuId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    const imageUrl = data.menu_image ? data.menu_image : null;
                    setFormData({
                        category_id: data.category_id,
                        menu_name: data.menu_name,
                        menu_price: data.menu_price,
                        menu_image: null,
                        menu_desc: data.menu_desc,
                        original_menu_name: data.menu_name,  // Store the original menu name
                    });
                    setPreviewUrl(imageUrl); // Set the initial preview URL
                } else {
                    console.error('Error fetching menu details:', data);
                }
            } catch (error) {
                console.error('Error fetching menu details:', error);
            }
        };

        const fetchMenuName = async () => {
            try {
                const response = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/menu', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setMenuName(data.map(menu => menu.menu_name.toLowerCase()));
                } else {
                    console.error('Error fetching menus:', data);
                }
            } catch (error) {
                console.error('Error fetching menus:', error);
            }
        };

        fetchCategory();
        if (menuId) fetchMenuDetail();
        fetchMenuName();
    }, [menuId]);

    useEffect(() => {
        // Handle image preview URL creation and cleanup
        if (formData.menu_image instanceof File) {
            const objectUrl = URL.createObjectURL(formData.menu_image);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else if (typeof formData.menu_image === 'string' && formData.category_image.startsWith('http')) {
            // Handle case where formData.menu_image is a URL (string)
            setPreviewUrl(formData.menu_image); // Directly set the preview URL
        }
    }, [formData.menu_image]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (menuName.includes(formData.menu_name.toLowerCase()) && formData.menu_name.toLowerCase() !== formData.original_menu_name.toLowerCase()) {
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
        setLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append('category_id', formData.category_id);
        formDataToSend.append('menu_name', formData.menu_name);
        formDataToSend.append('menu_price', formData.menu_price);
        formDataToSend.append('menu_desc', formData.menu_desc);

        // Check if formData.menu_image is a File (meaning user has selected a new image)
        if (formData.menu_image instanceof File) {
            formDataToSend.append('menu_image', formData.menu_image);
        } else {
            // If menu_image is not a File, append the current previewUrl to maintain the existing image
            if (previewUrl) {
                formDataToSend.append('menu_image', previewUrl);
            }
        }

        try {
            const response = await fetch(`https://backend-fortunate-coffee.up.railway.app/api/v1/menu/${menuId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Menu updated successfully!');
                setError('');
                setTimeout(() => {
                    setShowEditMenuForm(false);
                    setShowEditMenuIngredientsForm(true, menuId);
                }, 2000); 
                console.log(data);
            } else {
                setError(data.message || 'Error updating menu');
            }
        } catch (error) {
            setError('Error updating menu', error.message);
            console.error('Error updating menu:', error);
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

        if (name === 'menu_price' && value < 1000) {
            setError('Price must be at least 1000.');
        } else {
            setError('');
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            setFormData({
                ...formData,
                menu_image: e.target.files[0]
            });
    
            const objectUrl = URL.createObjectURL(e.target.files[0]);
            setPreviewUrl(objectUrl);
        }
    };

    return (
        <div className="fixed z-40">          
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-4 rounded-xl shadow-xl relative">
                    <button className="absolute top-4 right-5 fa-beat-fade text-lg text-gray-500 hover:text-gray-700" onClick={() => setShowEditMenuForm(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                    <h2 className="mb-5 text-center text-lg font-semibold">Edit Menu</h2>
                    <form onSubmit={handleSubmit} className="px-5">
                        <div className="flex items-center mb-4">
                            <label htmlFor="menu_name" className="w-5/12 me-2 block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="menu_name" required name="menu_name" value={formData.menu_name} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-lg" />
                        </div>
                        <div className="flex items-center mb-4">
                            <label htmlFor="category_id" className="w-5/12 me-2 block text-sm font-medium text-gray-700">Category</label>
                            <select id="category_id" required name="category_id" value={formData.category_id} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-lg">
                                <option value="" disabled>Select a category</option>
                                {category.map((category, index) => (
                                    <option key={index} value={category.category_id}>{category.category_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center mb-4">
                            <label htmlFor="menu_desc" className="w-5/12 me-2 block text-sm font-medium text-gray-700">Description</label>
                            <textarea id="menu_desc" required name="menu_desc" value={formData.menu_desc} onChange={handleChange} rows="4" className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-lg"></textarea>
                        </div>
                        <div className="flex items-center mb-4">
                            <label htmlFor="menu_price" className="w-5/12 me-2 block text-sm font-medium text-gray-700">Price (Rp)</label>
                            <input type="number" id="menu_price" required name="menu_price" min={1000} value={formData.menu_price} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-lg" />
                        </div>
                        <div className="flex items-center mb-6">
                            <label htmlFor="menu_image" className="w-5/12 me-2 block text-sm font-medium text-gray-700">Image</label>
                            <div className="relative w-full">
                                {previewUrl && (
                                    <div className="relative w-full h-40">
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-md shadow-md" />
                                        <button 
                                            type="button" 
                                            className="absolute inset-0 w-full h-full bg-black bg-opacity-50 text-white font-bold py-2 px-4 opacity-0 hover:opacity-100 transition-opacity rounded-md flex justify-center items-center"
                                            onClick={() => document.getElementById('menu_image').click()}
                                        >
                                            {formData.menu_image ? 'Change Image' : 'Upload Image'}
                                        </button>
                                    </div>
                                )}
                                <input type="file" id="menu_image" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </div>
                        </div>
                        {error && <p className="flex text-red-500 text-left">{error}</p>}
                        {success && <p className="flex text-green-500 text-left">{success}</p>}
                        <div>
                            <button type="submit" disabled={loading} className="flex my-3 mx-auto bg-[#43745B] hover:bg-green-800 text-white font-bold py-2 px-4 shadow-xl rounded-xl hover:scale-110">
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 12h4zm2 5.291l-2.162-.88A8.015 8.015 0 014 12H0c0 2.021.388 3.936 1.081 5.627L6 17.29z"></path>
                                    </svg>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminEditMenuForm;