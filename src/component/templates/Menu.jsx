import { useParams } from 'react-router-dom';
import BackButton from '../atoms/BackButton';
import { categoryFiles } from "../../menu";

const Menu = () => {
    const { categorySlug } = useParams();

    return(
        <div className="mx-7 my-4">
            <BackButton />
            <h1>{categoryFiles.title}</h1>
        </div>
    )
}

export default Menu;