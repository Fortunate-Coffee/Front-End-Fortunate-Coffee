import { useState, useEffect } from "react";

const AdminDeleteConfirm = ({ setShowDeleteConfirm, entityName, itemId, onConfirmDelete }) => {
    const [successMessage, setSuccessMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showInitialWarning, setShowInitialWarning] = useState(true);
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowInitialWarning(false);
        }, 5000);

        // Cleanup the timer if the component unmounts before the timer completes
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (showInitialWarning) {
            const countdownTimer = setInterval(() => {
                setCountdown((prevCount) => prevCount - 1);
            }, 1000);

            // Cleanup the countdown timer
            return () => clearInterval(countdownTimer);
        }
    }, [showInitialWarning]);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await onConfirmDelete(itemId);
            setSuccessMessage('Deleted successfully!');
            setWarningMessage('');
            setTimeout(() => {
                setShowDeleteConfirm(false);
            }, 2000); 
        } catch (error) {
            console.error('Error:', error);
            setWarningMessage('Failed to delete.');
            setSuccessMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-40">
            <div className="bg-white p-4 rounded-xl shadow-xl relative">
                <button className="absolute top-4 right-5 fa-beat-fade text-lg text-gray-500 hover:text-gray-700" onClick={() => setShowDeleteConfirm(false)}>
                    <i className="fas fa-times"></i>
                </button>
                <div className="flex flex-col items-center">
                    <img src="https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Delete%20Confirmation.png?updatedAt=1716709944023" alt="Delete Confirmation" className="w-48 h-auto my-4" />
                    <p className="px-4 font-semibold tracking-wide">Are you sure want to delete this {entityName}?</p>
                </div>
                {successMessage && <p className="px-4 mt-2 text-green-600 text-left">{successMessage}</p>}
                {warningMessage && <p className="px-4 mt-2 text-red-600 text-left">{warningMessage}</p>}
                {showInitialWarning ? (
                    <div className="flex flex-col items-center">
                        <p className="my-2 font-semibold text-yellow-600 tracking-wide">WARNING! Deleting this item will remove it from the system permanently and cannot be undone. ({countdown}s)</p>
                    </div>
                ) : (
                    <div className="mt-3 flex justify-center">
                        <button type="button" onClick={() => setShowDeleteConfirm(false)} className="flex mx-2 my-3 border border-[#43745B] bg-white hover:bg-gray-50 text-[#43745B] font-bold py-2 px-4 shadow-xl rounded-xl hover:scale-110">Cancel</button>
                        <button type="button" onClick={handleDelete} className="flex mx-2 my-3 bg-[#43745B] hover:bg-green-800 text-white font-bold py-2 px-4 shadow-xl rounded-xl hover:scale-110">
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 12h4zm2 5.291l-2.162-.88A8.015 8.015 0 014 12H0c0 2.021.388 3.936 1.081 5.627L6 17.29z"></path>
                            </svg>
                        ) : (
                            'Delete'
                        )}
                    </button>
                </div>
                )}
            </div>
        </div>
    );
}

export default AdminDeleteConfirm;
