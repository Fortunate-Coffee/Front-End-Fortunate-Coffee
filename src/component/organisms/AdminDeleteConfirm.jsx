const AdminDeleteConfirm = ({setShowAdminDeleteConfirm}) => {
    return(
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-40">
            <div className="bg-white p-4 rounded-xl shadow-xl relative">
                <button className="absolute top-4 right-5 fa-beat-fade text-lg text-gray-500 hover:text-gray-700" onClick={() => setShowAdminDeleteConfirm(false)}>
                    <i className="fas fa-times"></i>
                </button>
                <div className="flex flex-col items-center">
                    <img src="https://i.ibb.co/hK1sz87/Delete.png" alt="Delete Confirmation" className="w-48 h-auto my-4" />
                    <p className="px-4 font-semibold tracking-wide">Are you sure want to delete this item?</p>
                </div>
                <div className="mt-3 flex justify-center">
                    <button type="submit" onClick={() => setShowAdminDeleteConfirm(false)} className="flex mx-2 my-3 border border-[#43745B] bg-white hover:bg-gray-50 text-[#43745B] font-bold py-2 px-4 shadow-xl rounded-xl">Cancel</button>
                    <button type="submit" className="flex mx-2 my-3 bg-[#43745B] hover:bg-green-800 text-white font-bold py-2 px-4 shadow-xl rounded-xl">Delete</button>
                </div>
            </div>
        </div>
    );
}

export default AdminDeleteConfirm;