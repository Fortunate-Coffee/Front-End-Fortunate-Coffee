import { useState } from "react";

const AdminAddCategoryForm = ({ setShowCategoryForm }) => {
    const handleCloseForm = () => {
        setShowCategoryForm(false);
    };

    const [formData, setFormData] = useState({
        category_name: '',
        category_image: null
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('category_name', formData.category_name);
        data.append('category_image', formData.category_image);

        // Assuming you have a function to get the stored token
        const token = localStorage.getItem('accessToken');

        try {
            const response = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/category', {
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

            setShowCategoryForm(false);
        } catch (error) {
            console.error('Error:', error);
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
                    <div>
                        <button type="submit" className="flex my-3 mx-auto bg-[#43745B] hover:bg-green-800 text-white font-bold py-2 px-4 shadow-xl rounded-xl hover:scale-110">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminAddCategoryForm;
