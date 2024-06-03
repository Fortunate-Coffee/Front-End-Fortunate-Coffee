// GetDataButton.jsx
const GetDataButton = ({ onClick, loading }) => {

    return (
        <div>
            <div>
                <button type="button" onClick={onClick} disabled={loading} className="bg-[#43745B] hover:bg-green-800 text-white font-bold py-2 px-4 shadow-xl rounded-xl">
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 12h4zm2 5.291l-2.162-.88A8.015 8.015 0 014 12H0c0 2.021.388 3.936 1.081 5.627L6 17.29z"></path>
                        </svg>
                    ) : (
                        'Get Data'
                    )}
                </button>
            </div>
        </div>
    );
}

export default GetDataButton;
