import { useState, useEffect } from "react";

const AdminEditCategoryForm = ({ setShowEditCategoryForm, editFormData, fetchCategory, category }) => {
    const handleCloseForm = () => {
        setShowEditCategoryForm(false);
    };

    const [formData, setFormData] = useState({
        category_name: editFormData.category_name,
        category_image: editFormData.category_image,
        imageKitId: editFormData.imageKitId,
        original_category_name: editFormData.category_name // Store the original category name
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(editFormData.category_image);

    useEffect(() => {
        if (formData.category_image instanceof File) {
            const objectUrl = URL.createObjectURL(formData.category_image);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else if (typeof formData.category_image === 'string' && formData.category_image.startsWith('http')) {
            setPreviewUrl(formData.category_image);
        } else {
            setPreviewUrl(editFormData.category_image);
        }
    }, [formData.category_image, editFormData.category_image]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('category_name', formData.category_name);

        if (formData.category_image instanceof File) {
            data.append('category_image', formData.category_image);
        } else if (typeof formData.category_image === 'string' && formData.category_image.startsWith('http')) {
            // Append URL directly if category_image is a URL
            data.append('category_image', formData.category_image);
        } else if (formData.category_image === undefined) {
            // If no new file selected and not a URL, append the existing image URL
            data.append('category_image', editFormData.category_image);
        }
        
        // Append imageKitId if not changing image
        if (!formData.category_image && formData.imageKitId) {
            data.append('imageKitId', formData.imageKitId);
        } else if (!formData.category_image && editFormData.imageKitId) {
            data.append('imageKitId', editFormData.imageKitId);
        }
        console.log('data name: ', formData.category_name);
        console.log('data image: ', formData.category_image);
        console.log('data imgkit: ', formData.imageKitId);
        console.log('data: ', formData);

        // Check if the category name already exists
        const isDuplicate = category && category.some(category =>
            category.category_name.toLowerCase() === formData.category_name.toLowerCase() &&
            formData.category_name.toLowerCase() !== formData.original_category_name.toLowerCase()
        );
        if (isDuplicate) {
            setWarningMessage('Category name already exists.');
            setSuccessMessage('');
            return;
        }

        const token = localStorage.getItem('accessToken');
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}api/v1/category/${editFormData.category_id}`, {
                method: 'PUT',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to update category');
            }

            const result = await response.json();
            console.log('Category updated:', result);

            setSuccessMessage('Category edited successfully!');
            setWarningMessage('');
            setTimeout(() => {
                setShowEditCategoryForm(false);
            }, 2000); 

            fetchCategory(); // Refresh data kategori setelah update
        } catch (error) {
            console.error('Error:', error);
            setWarningMessage('Failed to update category. Please try again.');
            setSuccessMessage('');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (name === 'category_image') {
            const file = files[0];
    
            // Check if a new file is selected
            if (file) {
                const objectUrl = URL.createObjectURL(file);
                setPreviewUrl(objectUrl);
                setFormData({
                    ...formData,
                    category_image: file
                });
            } else if (value.startsWith('http')) {
                // If input value is a URL, set category_image to URL
                setPreviewUrl(value); // No preview update needed for URL
                setFormData({
                    ...formData,
                    category_image: value
                });
            } else {
                // If no file is selected (user cancels file selection), keep the existing image
                setPreviewUrl(editFormData.category_image); // Reset previewUrl to current image
                setFormData({
                    ...formData,
                    category_image: undefined // Reset to undefined to indicate no new file
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };
    
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-xl shadow-xl relative">
                <button className="absolute top-4 right-5 fa-beat-fade text-lg text-gray-500 hover:text-gray-700" onClick={handleCloseForm}>
                    <i className="fas fa-times"></i>
                </button>
                <h2 className="mb-5 text-center text-lg font-semibold">Edit Category</h2>
                <form onSubmit={handleSubmit} className="px-5">
                    <div className="flex items-center mb-4">
                        <label htmlFor="name" className="w-4/12 block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="category_name" required name="category_name" value={formData.category_name} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full shadow-lg" />
                    </div>
                    <div className="flex items-center mb-6">
                        <label htmlFor="category_image" className="w-4/12 block text-sm font-medium text-gray-700">Image</label>
                        <div className="relative w-full">
                            {previewUrl && (
                                <div className="relative w-full h-40">
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-md shadow-md" />
                                    <button
                                        type="button"
                                        className="absolute inset-0 w-full h-full bg-black bg-opacity-50 text-white font-bold py-2 px-4 opacity-0 hover:opacity-100 transition-opacity rounded-md flex justify-center items-center"
                                        onClick={() => document.getElementById('category_image').click()}
                                    >
                                        {formData.category_image instanceof File ? 'Change Image' : 'Upload Image'}
                                    </button>
                                </div>
                            )}
                            <input type="file" id="category_image" name="category_image" onChange={handleChange} accept="image/*" className="hidden" />
                        </div>
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

export default AdminEditCategoryForm;
