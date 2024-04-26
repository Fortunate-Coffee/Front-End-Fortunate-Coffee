import { useParams } from "react-router-dom";
import { categoryFiles } from "../../menu";
import QtyPicker from "../atoms/QtyPicker";
import NoteButton from "../atoms/NoteButton";
import { formatPrice } from "../../menu";

const MenuItem = ({ categoryName }) => {
    const { categorySlug } = useParams();

    // Menemukan objek kategori yang sesuai dengan categorySlug
    const selectedCategory = categoryFiles.find(category => category.slug === categorySlug);

    return (
        <div className="flex flex-col">
            {selectedCategory && selectedCategory.items.map((item, index) => (
                <div key={index} className="flex flex-row w-full justify-between my-4">
                    <img 
                        src={`/images/Menu/${item.image}`}
                        alt={item.name}
                        className="w-2/12 rounded-lg shadow-lg hover:scale-105"
                    />
                    <div className="flex flex-col w-6/12">
                        <p className="text-left">{item.name}</p>
                        <QtyPicker className="flex items-center justify-start mt-1" />
                    </div>
                    <div className="flex flex-col w-3/12">
                        <p className="text-right">Rp. {formatPrice(item.price)}</p>
                        <NoteButton categoryName={categorySlug} menuItemName={item.name}/>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MenuItem;
