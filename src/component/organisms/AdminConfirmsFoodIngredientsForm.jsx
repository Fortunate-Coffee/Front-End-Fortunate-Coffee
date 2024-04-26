// AdminConfirmsFoodIngredientsForm.jsx
import React from "react";

const AdminConfirmsFoodIngredientsForm = ({ setShowAddFoodIngredientsForm, setShowAddTypeFoodIngredientsForm, setShowConfirmation }) => {
    const handleYes = () => {
        setShowAddFoodIngredientsForm(true);
        setShowConfirmation(false);
    };

    const handleNo = () => {
        setShowAddTypeFoodIngredientsForm(true);
        setShowConfirmation(false);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-40">
            <div className="bg-white p-4 rounded-xl shadow-xl relative">
                <button className="absolute top-4 right-5 fa-beat-fade text-lg text-gray-500 hover:text-gray-700" onClick={() => setShowConfirmation(false)}>
                    <i className="fas fa-times"></i>
                </button>
                <div className="flex flex-col items-center">
                    <img src="https://i.ibb.co/RHFK0wZ/Stock.png" alt="Delete Confirmation" className="w-48 h-auto" />
                    <p className="mt-[-1em] px-4 font-semibold tracking-wide">Do you want to add new food ingredients?</p>
                </div>
                <div className="mt-3 flex justify-center">
                    <button type="button" onClick={handleNo} className="flex mx-2 my-3 border border-[#43745B] bg-white hover:bg-gray-50 text-[#43745B] font-bold py-2 px-4 shadow-xl rounded-xl">No</button>
                    <button type="button" onClick={handleYes} className="flex mx-2 my-3 bg-[#43745B] hover:bg-green-800 text-white font-bold py-2 px-4 shadow-xl rounded-xl">Yes</button>
                </div>
            </div>
        </div>
    );
}

export default AdminConfirmsFoodIngredientsForm;
