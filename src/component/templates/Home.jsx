import Navbar from "../organisms/Navbar";
import BannerImage from "../atoms/BannerImage";
import MenuCategory from "../atoms/MenuCategory";

const Home = () => {
    return(
        <div className="mx-7 my-4">
            <Navbar />
            <BannerImage />
            <MenuCategory />
        </div>
    )
}

export default Home;