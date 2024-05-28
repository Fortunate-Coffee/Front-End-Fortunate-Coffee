import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatPrice } from "../../menu";
import BackButton from "../atoms/BackButton";
import TextArea from "../atoms/TextArea";
import QtyPicker from "../atoms/QtyPicker";
import ShoppingCartButton from "../atoms/ShoppingCartButton";
import AddToCartButton from "../atoms/AddToCartButton";

const DetailMenu = () => {
    const { menuName } = useParams();
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                // Ambil semua menu dari backend
                const response = await fetch(`https://backend-fortunate-coffee.up.railway.app/api/v1/menu`);
                const menus = await response.json();

                // Cari menu berdasarkan menuName
                const menuItem = menus.find(item => item.menu_name === decodeURIComponent(menuName));

                if (menuItem) {
                    // Jika ditemukan, ambil detail menu berdasarkan ID
                    const detailResponse = await fetch(`https://backend-fortunate-coffee.up.railway.app/api/v1/menu/${menuItem.menu_id}`);
                    const detailData = await detailResponse.json();
                    setSelectedItem(detailData);
                } else {
                    setSelectedItem(null);
                }
            } catch (error) {
                console.error('Error fetching menu items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, [menuName]);

    if (loading) {
        return <div className="my-72 text-center text-gray-700 fa-beat">Loading...</div>;
    }

    if (!selectedItem) {
        return <div className="my-72 text-center text-gray-700 fa-beat">Menu item not found.</div>;
    }

    return (
        <div>
            <div className='fixed top-0 z-40 w-full h-auto bg-white shadow-lg flex px-7 py-4'>
                <BackButton />
                <h1 className="grow font-medium">Details</h1>
                <ShoppingCartButton />
            </div>
            <img 
                src={selectedItem.menu_image}
                alt={selectedItem.menu_name}
                className="mt-16 w-full h-72"
            />
            <div className="mx-7 my-6">
                <div className="flex font-semibold">
                    <p className="w-8/12">{selectedItem.menu_name}</p>
                    <p className="w-4/12 text-right">Rp. {formatPrice(selectedItem.menu_price)}</p>
                </div>
                <div className="py-2 font-extralight text-justify">
                    <p>{selectedItem.menu_desc}</p>
                </div>
                <TextArea />
                <QtyPicker className="flex items-center justify-center mt-1"/>
                <AddToCartButton />
            </div>
        </div>
    );
}

export default DetailMenu;
