import { useParams } from 'react-router-dom';
import BackButton from '../atoms/BackButton';
import { categoryFiles } from "../../menu";
import MenuItem from '../molecules/MenuItem';

const Menu = () => {
    const { categorySlug } = useParams();

    // Menemukan objek kategori yang sesuai dengan categorySlug
    const selectedCategory = categoryFiles.find(category => category.slug === categorySlug);

    return(
        <div>
            <div className='fixed z-0 top-0 w-full h-auto bg-white shadow-lg flex px-7 py-4'>
                <BackButton />
                {selectedCategory && <h1 className='grow font-medium'>{selectedCategory.title}</h1>}
            </div>
            <div className="mt-16 mx-7 my-4">
                <MenuItem />
            </div>
        </div>
    )
}

export default Menu;