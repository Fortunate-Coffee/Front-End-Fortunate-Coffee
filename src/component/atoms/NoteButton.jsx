import { Link } from "react-router-dom";

const NoteButton = () => {
    return(
        <div className="flex justify-end me-1 mt-1">
            <Link to={'/'}><i className="fa-solid fa-pen-to-square text-[#4caf50]"></i></Link>
        </div>
    )
}

export default NoteButton;