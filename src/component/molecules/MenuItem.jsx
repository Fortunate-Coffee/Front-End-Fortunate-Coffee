import QtyPicker from "../atoms/QtyPicker";
import NoteButton from "../atoms/NoteButton";
import { formatPrice } from "../../menu";

const MenuItem = ({ items }) => {
    return (
        <div className="flex flex-col">
            {items.map((item, index) => (
                <div key={index} className="flex flex-row w-full justify-between my-4">
                    <img 
                        src={item.menu_image}
                        alt={item.menu_name}
                        className="w-2/12 rounded-lg shadow-lg hover:scale-105"
                    />
                    <div className="flex flex-col w-6/12">
                        <p className="text-left">{item.menu_name}</p>
                        <QtyPicker className="flex items-center justify-start mt-1" />
                    </div>
                    <div className="flex flex-col w-3/12">
                        <p className="text-right">Rp. {formatPrice(item.menu_price)}</p>
                        <NoteButton categoryName={item.category.category_name} menuName={item.menu_name}/>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MenuItem;
