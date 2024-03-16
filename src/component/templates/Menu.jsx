import { useParams } from 'react-router-dom';
import BackButton from '../atoms/BackButton';
import { categoryFiles } from "../../menu";
import MenuItem from '../molecules/MenuItem';

const Menu = () => {
    const { categorySlug } = useParams();

    // Menemukan objek kategori yang sesuai dengan categorySlug
    const selectedCategory = categoryFiles.find(category => category.slug === categorySlug);

    return(
        <div className="mx-7 my-4">
            <div className='flex'>
                <BackButton />
                {selectedCategory && <h1 className='grow font-medium'>{selectedCategory.title}</h1>}
            </div>
            <MenuItem />
        </div>
    )
}

export default Menu;