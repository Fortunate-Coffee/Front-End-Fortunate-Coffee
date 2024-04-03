import { Link } from "react-router-dom";

const DeleteButton = ({ onClick }) => {
    return (
        <div className="grow" onClick={onClick}>
            <Link to={''}>
                <i className=" py-7 fa-regular fa-trash-can fa-beat-fade text-[#f24e1e]"></i>
            </Link>
        </div>
    );
};

export default DeleteButton;
