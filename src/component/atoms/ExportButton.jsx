import { Link } from "react-router-dom";

const ExportButton = () => {
    return(
        <div className="flex">
            <Link to="#" onClick={''} className='px-3 py-2 flex ms-5 flex-row shadow-2xl rounded-xl bg-white'>
                <i className="flex items-center fa-solid fa-file-export fa-lg text-[#43745B]"></i>
                <p className='ms-2 text-[#43745B]'>Export</p>
            </Link>
        </div>
    );
}

export default ExportButton;