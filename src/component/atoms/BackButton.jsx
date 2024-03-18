import { Link } from "react-router-dom";

const BackButton = () => {
    return (
        <div className="grow">
            <Link to="#" onClick={() => window.history.back()}>
                <i className="fa-solid fa-arrow-left fa-fade text-black"></i>
            </Link>
        </div>
    );
};

export default BackButton;
