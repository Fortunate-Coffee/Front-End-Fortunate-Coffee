import { Link } from "react-router-dom";

const SearchingButton = () => {
    return(
        <div>
            <Link to={'/'}><i className='fa-solid fa-magnifying-glass fa-beat' style={{color: "#000000;"}}></i></Link>
        </div>
    )
}

export default SearchingButton;