import { useParams } from "react-router-dom";
import { categoryFiles } from "../../menu";
import BackButton from "../atoms/BackButton";
import { formatPrice } from "../../menu";
import ReqOrder from "../atoms/ReqOrder";
import TextArea from "../atoms/TextArea";
import QtyPicker from "../atoms/QtyPicker";
import ShoppingCartButton from "../atoms/ShoppingCartButton";
import AddToCartButton from "../atoms/AddToCartButton";

const DetailMenu = () => {
    const { categorySlug, menuSlug } = useParams();

    // Temukan kategori yang sesuai
    const selectedCategory = categoryFiles.find(category => category.slug === categorySlug);

    console.log(selectedCategory.items.find(item => item.name === menuSlug));
    console.log(item => item.slug);
    
    // Temukan item yang sesuai dengan menuSlug di dalam kategori tersebut
    const selectedItem = selectedCategory?.items.find(item => item.name === menuSlug);

    if (!selectedItem) {
        return <div className=" my-72 text-center font-bold">Menu item not found.</div>;
    }

    return(
        <div>
            <div className='fixed top-0 z-0 w-full h-auto bg-white shadow-lg flex px-7 py-4'>
                <BackButton />
                <h1 className="grow font-medium">Details</h1>
                <ShoppingCartButton />
            </div>
            <img 
                src={`/images/Menu/${selectedItem.image}`}
                alt={selectedItem.name}
                className="mt-16 w-full h-72"
            />
            <div className="mx-7 my-6">
                <div className="flex font-semibold">
                    <p className="w-8/12">{selectedItem.name}</p>
                    <p className="w-4/12 text-right">Rp. {formatPrice(selectedItem.price)}</p>
                </div>
                <div className=" py-2 font-extralight text-justify">
                    <p>{selectedItem.detail}</p>
                </div>
                <p className="mt-5">Permintaan Khusus</p>
                <ReqOrder />
                <TextArea />
                <QtyPicker className="flex items-center justify-center mt-1"/>
                <AddToCartButton />
            </div>
        </div>
    );
}

export default DetailMenu;