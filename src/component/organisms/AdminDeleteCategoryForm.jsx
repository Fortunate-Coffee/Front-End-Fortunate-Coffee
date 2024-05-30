import { useState } from "react";

const AdminDeleteCategoryForm = ({ setShowAdminDeleteCategoryForm, itemId, fetchCategory }) => {
    const handleDelete = async () => {
        const token = localStorage.getItem('accessToken');
        
        try {
            const response = await fetch(`https://backend-fortunate-coffee.up.railway.app/api/v1/category/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete category');
            }

            // Hapus gambar dari imgkit
            const imgkitResponse = await fetch(`https://ik.imagekit.io/fndsjy/Fortunate_Coffee/${itemId}?updatedAt=1716709944023`, {
                method: 'DELETE'
            });

            if (!imgkitResponse.ok) {
                throw new Error('Failed to delete image from imgkit');
            }

            // Perbarui data kategori setelah penghapusan
            fetchCategory();

            setShowAdminDeleteCategoryForm(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-40">
            <div className="bg-white p-4 rounded-xl shadow-xl relative">
                <button className="absolute top-4 right-5 fa-beat-fade text-lg text-gray-500 hover:text-gray-700" onClick={() => setShowAdminDeleteCategoryForm(false)}>
                    <i className="fas fa-times"></i>
                </button>
                <div className="flex flex-col items-center">
                    <img src="https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Delete%20Confirmation.png?updatedAt=1716709944023" alt="Delete Confirmation" className="w-48 h-auto my-4" />
                    <p className="px-4 font-semibold tracking-wide">Are you sure want to delete this item?</p>
                </div>
                <div className="mt-3 flex justify-center">
                    <button type="button" onClick={() => setShowAdminDeleteCategoryForm(false)} className="flex mx-2 my-3 border border-[#43745B] bg-white hover:bg-gray-50 text-[#43745B] font-bold py-2 px-4 shadow-xl rounded-xl hover:scale-110">Cancel</button>
                    <button type="button" onClick={handleDelete} className="flex mx-2 my-3 bg-[#43745B] hover:bg-green-800 text-white font-bold py-2 px-4 shadow-xl rounded-xl hover:scale-110">Delete</button>
                </div>
            </div>
        </div>
    );
}

export default AdminDeleteCategoryForm;
