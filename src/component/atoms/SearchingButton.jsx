import { Link } from "react-router-dom";

const SearchingButton = () => {
    return(
        <div>
            <Link to={'/'}><i className='fa-solid fa-magnifying-glass fa-beat text-black'></i></Link>
        </div>
    )
}

export default SearchingButton;