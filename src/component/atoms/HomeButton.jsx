import { Link } from "react-router-dom";

const HomeButton = () => {
    return (
        <div className="grow">
            <Link to="/">
                <i className="fa-solid fa-arrow-left fa-fade text-black"></i>
            </Link>
        </div>
    );
};

export default HomeButton;
