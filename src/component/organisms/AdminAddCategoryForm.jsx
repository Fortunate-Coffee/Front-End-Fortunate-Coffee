import { useState } from "react";

const AdminAddCategoryForm = ({ setShowCategoryForm, category }) => {
    const [successMessage, setSuccessMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleCloseForm = () => {
        setShowCategoryForm(false);
    };

    const [formData, setFormData] = useState({
        category_name: '',
        category_image: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the category name already exists
        const isDuplicate = category && category.some(category => category.category_name.toLowerCase() === formData.category_name.toLowerCase());
        if (isDuplicate) {
            setWarningMessage('Category name already exists.');
            setSuccessMessage('');
            return;
        }

        const data = new FormData();
        data.append('category_name', formData.category_name);
        data.append('category_image', formData.category_image);

        // Assuming you have a function to get the stored token
        const token = localStorage.getItem('accessToken');
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/category`, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to add category');
            }

            const result = await response.json();
            console.log('Category added:', result);

            setFormData({
                category_name: '',
                category_image: null
            });

            setSuccessMessage('Category added successfully!');
            setWarningMessage('');
            setTimeout(() => {
                setShowCategoryForm(false);
            }, 2000); 
        } catch (error) {
            console.error('Error:', error);
            setWarningMessage('Failed to add category. Please try again.');
            setSuccessMessage('');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'category_image' ? files[0] : value
        });
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-xl shadow-xl relative">
                <button className="absolute top-4 right-5 fa-beat-fade text-lg text-gray-500 hover:text-gray-700" onClick={handleCloseForm}>
                    <i className="fas fa-times"></i>
                </button>
                <h2 className="mb-5 text-center text-lg font-semibold">Add New Category</h2>
                <form onSubmit={handleSubmit} className="px-5">
                    <div className="flex items-center mb-4">
                        <label htmlFor="category_name" className="w-4/12 block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="category_name" required name="category_name" value={formData.category_name} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-lg" />
                    </div>
                    <div className="flex items-center mb-6">
                        <label htmlFor="category_image" className="w-4/12 block text-sm font-medium text-gray-700">Image</label>
                        <input type="file" id="category_image" required name="category_image" onChange={handleChange} accept="image/*" className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-lg" />
                    </div>
                    {successMessage && <p className="text-green-600 text-left">{successMessage}</p>}
                    {warningMessage && <p className="text-red-600 text-left">{warningMessage}</p>}
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

export default AdminAddCategoryForm;
