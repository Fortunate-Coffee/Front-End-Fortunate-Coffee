import React from 'react';

const AdminCategoriesForm = ({ setShowCategoriesForm }) => {
    const handleCloseForm = () => {
        setShowCategoriesForm(false);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50" onClick={handleCloseForm}>
            <div className="bg-white p-4 rounded-xl shadow-xl relative">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleCloseForm}>
                    <i className="fas fa-times"></i>
                </button>
                <h2 className="text-lg font-semibold mb-2">Categories Form</h2>
                {/* Isi form kategori di sini */}
            </div>
        </div>
    );
}

export default AdminCategoriesForm;
