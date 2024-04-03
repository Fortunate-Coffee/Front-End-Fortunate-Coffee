import { useState, useEffect } from "react";
import { menuData } from "../../menu";
import QtyPicker from "../atoms/QtyPicker";
import { formatPrice } from "../../menu";
import DeleteButton from "../atoms/DeleteButton";

const CartItem = ({ setPrices }) => {
    const [limitedOfferItems, setLimitedOfferItems]= useState(menuData["Limited Offer"].items);

    const handleDelete = (index) => {
        // Buat salinan dari limitedOfferItems
        const updatedItems = [...limitedOfferItems];
        // Hapus item sesuai dengan index yang diberikan
        updatedItems.splice(index, 1);
        // Memperbarui state dengan item yang telah dihapus
        setLimitedOfferItems(updatedItems);
    }

    // Memperbarui state harga saat komponen dirender
    useEffect(() => {
        const allPrices = limitedOfferItems.map(item => item.price);
        setPrices(allPrices);
    }, [limitedOfferItems, setPrices]);

    return(
        <div className="flex flex-col mt-16">
            {limitedOfferItems.map((item, index) => (
                <div key={index} className="flex flex-row w-full justify-between items-center my-4">
                    <img 
                        src={`/images/Menu/${item.image}`}
                        alt={item.name}
                        className="w-1/6 h-1/6"
                    />
                    <div className="flex flex-col w-[41%] mx-2">
                        <p className="truncate text-left font-semibold">{item.name}</p>
                        <p className="truncate text-left font-light text-sm">minta bonus ya bang hehe</p>
                        <p className="text-left">Rp. {formatPrice(item.price)}</p>
                    </div>
                    <div className="flex flex-row w-3/12">
                        <QtyPicker className="flex justify-start" />
                    </div>
                    <div className="flex flex-row w-1/12 text-right">
                        <DeleteButton onClick={() => handleDelete(index)} className="flex justify-start" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CartItem;

        // Jika ingin menampilkan semua menu
        // <div className="flex flex-col">
        //     {menuData && Object.values(menuData).map(category => (
        //         category.items.map((item, index) => (
        //         <div key={index} className="flex flex-row w-full justify-between my-4">
        //             <img 
        //                 src={`/images/Menu/${item.image}`}
        //                 alt={item.name}
        //                 className="w-2/12"
        //             />
        //             <div className="flex flex-col w-6/12">
        //                 <p className="text-left">{item.name}</p>
        //                 <QtyPicker className="flex items-center justify-start mt-1" />
        //             </div>
        //             <div className="flex flex-col w-3/12">
        //                 <p className="text-right">Rp. {formatPrice(item.price)}</p>
        //             </div>
        //         </div>
        //     ))))}
        // </div>