import { Link } from "react-router-dom";

const ProfileButton = () => {
    return(
        <Link to={'/login'}>
            <i className="ms-10 fa-solid fa-user"></i>
        </Link>
    );
}

export default ProfileButton;