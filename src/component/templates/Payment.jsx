import { useState, useEffect } from 'react';
import { menuData } from '../../menu';
import { formatPrice } from '../../menu';
import HomeButton from '../atoms/HomeButton';
import PaymentInfo from '../atoms/PaymentInfo';
import TotalPayment from '../molecules/TotalPayment';

const Payment = () => {
    const [limitedOfferItems, setLimitedOfferItems]= useState(menuData["Limited Offer"].items);

    // State untuk menyimpan semua harga
    const [prices, setPrices] = useState([]);

    // Memperbarui state harga saat komponen dirender
    useEffect(() => {
        const allPrices = limitedOfferItems.map(item => item.price);
        setPrices(allPrices);
    }, [limitedOfferItems, setPrices]);

    return(
        <div className="">
            <div className='fixed top-0 z-0 w-full h-auto bg-white shadow-lg flex px-7 py-4'>
                <HomeButton />
                <h1 className="grow font-medium">Payment</h1>
            </div>
            <div className="mx-7 my-4">
                <PaymentInfo />
                <div className="text-center my-10">
                    <p className='font-semibold text-9xl'>24</p>
                    <p className='font-semibold mt-3 text-[#8B8989]'>Order No. 123</p>
                </div>
                <div className="flex flex-col font-semibold mb-3">
                    {limitedOfferItems.map((item, index) => (
                        <div key={index} className="flex flex-row justify-between my-1 truncate">
                            <p>{item.name}</p>
                            <div className="flex flex-row w-3/12 justify-end">
                                <p className='mx-6'>1x</p>
                                <p>Rp. {formatPrice(item.price)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <hr></hr>
                <TotalPayment prices={prices} />
                <p className='my-9 font-semibold text-center'>Thank you for ordering!</p>
            </div>
        </div>
    );
}

export default Payment;