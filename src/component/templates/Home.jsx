import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from "../organisms/Navbar";
import BannerImage from "../atoms/BannerImage";
import MenuCategory from "../atoms/MenuCategory";

const Home = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const table = searchParams.get('table');
        if (table) {
            localStorage.setItem('tableNumber', table);
        }
    }, [searchParams]);

    return(
        <div>
            <Navbar />
            <div className="mx-7 my-4">
                <BannerImage />
                <MenuCategory />
            </div>
        </div>
    );
}

export default Home;
