import { Link } from "react-router-dom";

const NotAuthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
        <i className="fa-solid fa-face-sad-tear mb-4 text-3xl"></i>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-600">You do not have permission to access this page.</p>
        <div className="">
            <Link to="/admin" >
            <button className="bg-[#4caf50] hover:bg-[#39753b] text-white p-4 rounded-2xl shadow-xl w-full my-8">
                Back to Menu
            </button>
            </Link> 
        </div>
    </div>
  );
};

export default NotAuthorizedPage;
