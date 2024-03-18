import Navbar from "../organisms/Navbar";
import BannerImage from "../atoms/BannerImage";
import MenuCategory from "../atoms/MenuCategory";

const Home = () => {
    return(
        <div>
            <Navbar />
            <div className="mx-7 my-4">
                <BannerImage />
                <MenuCategory />
            </div>
        </div>
    )
}

export default Home;