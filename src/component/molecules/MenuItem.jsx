import { useParams } from "react-router-dom";
import { categoryFiles } from "../../menu";
import QtyPicker from "../atoms/QtyPicker";
import NoteButton from "../atoms/NoteButton";
import { formatPrice } from "../../menu";

const MenuItem = () => {
    const { categorySlug } = useParams();

    // Menemukan objek kategori yang sesuai dengan categorySlug
    const selectedCategory = categoryFiles.find(category => category.slug === categorySlug);

    return(
        <div className="flex flex-col mt-7">
            {selectedCategory && selectedCategory.items.map((item, index) => (
                <div key={index} className="flex flex-row w-full justify-between my-4">
                    <img 
                        src={`/images/Menu/${item.image}`}
                        alt={item.name}
                        className="w-2/12"
                    />
                    <div className="flex flex-col w-6/12">
                        <p className="text-left">{item.name}</p>
                        <QtyPicker />
                    </div>
                    <div className="flex flex-col w-3/12">
                        <p className="text-right">Rp. {formatPrice(item.price)}</p>
                        <NoteButton />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MenuItem;