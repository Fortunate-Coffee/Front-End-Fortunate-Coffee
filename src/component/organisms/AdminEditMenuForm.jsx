import { useState } from "react";

const AdminEditMenuForm = ({ setShowEditMenuForm, setShowEditMenuIngredientsForm }) => {

    const categories = [
        {text: 'Limited Offer'},
        {text: 'Fortunate Bread'},
        {text: 'Asian Cuisine'},
        {text: 'Spaghetti'},
        {text: 'Fortunate Rice'},
    ];

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        image: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lakukan sesuatu dengan formData, misalnya kirim ke backend
        // Kemudian kosongkan form atau lakukan tindakan lainnya
        const previousFormData = [{ ...formData }];
        setFormData({
            name: '',
            category: '',
            description: '',
            price: '',
            image: null
        });
        setShowEditMenuForm(false);
        setShowEditMenuIngredientsForm(true, previousFormData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="fixed">          
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                <div className="bg-white p-4 rounded-xl shadow-xl relative">
                    <button className="absolute top-4 right-5 fa-beat-fade text-lg text-gray-500 hover:text-gray-700" onClick={() => setShowEditMenuForm(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                    <h2 className="mb-5 text-center text-lg font-semibold">Edit New Menu</h2>
                    <form onSubmit={handleSubmit} className="px-5">
                        <div className="flex items-center mb-4">
                            <label htmlFor="name" className="w-4/12 block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="name" required name="name" value={formData.name} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-lg" />
                        </div>
                        <div className="flex items-center mb-4">
                            <label htmlFor="category" className="w-4/12 block text-sm font-medium text-gray-700">Category</label>
                            <select id="category" required name="category" value={formData.category} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-lg">
                                {categories.map((category, index) => (
                                    <option key={index} value={category.text}>{category.text}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center mb-4">
                            <label htmlFor="description" className="w-4/12 block text-sm font-medium text-gray-700">Description</label>
                            <textarea id="description" required name="description" value={formData.description} onChange={handleChange} rows="4" className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-lg"></textarea>
                        </div>
                        <div className="flex items-center mb-4">
                            <label htmlFor="price" className="w-4/12 block text-sm font-medium text-gray-700">Price (Rp)</label>
                            <input type="number" id="price" name="price" min={1000} value={formData.price} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-lg" />
                        </div>
                        <div className="flex items-center mb-6">
                            <label htmlFor="image" className="w-4/12 block text-sm font-medium text-gray-700">Image</label>
                            <input type="file" id="image" name="image" onChange={handleChange} accept="image/*" className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-lg" />
                        </div>
                        <div>
                            <button type="submit" className="flex my-3 mx-auto bg-[#43745B] hover:bg-green-800 text-white font-bold py-2 px-4 shadow-xl rounded-xl">Continue</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminEditMenuForm;