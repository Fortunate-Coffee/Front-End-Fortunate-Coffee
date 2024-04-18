import { Link } from "react-router-dom";
import ExportButton from "../atoms/ExportButton";

const AdminStock = () => {
    return(
        <div className="">
            <div className="p-3 flex justify-between items-center bg-[#43745B] shadow-xl">
                <h1 className='text-white tracking-wide'>Stock</h1>
                <div className="flex">
                    <Link to="#" onClick={''} className='px-3 py-2 flex ms-5 flex-row shadow-2xl rounded-xl bg-white'>
                        <i className="flex items-center fas fa-table fa-lg text-[#43745B]"></i>
                        <p className='ms-2 text-[#43745B]'>Ingredients</p>
                    </Link>
                    <ExportButton />
                </div>
            </div>
        </div>
    );
}

export default AdminStock;