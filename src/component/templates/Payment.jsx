import { useState } from 'react';
import BackButton from '../atoms/BackButton';
import PaymentInfo from '../atoms/PaymentInfo';
import TotalPayment from '../molecules/TotalPayment';

const Payment = () => {
    // State untuk menyimpan semua harga
    const [prices, setPrices] = useState([]);

    return(
        <div className="">
            <div className='fixed top-0 z-0 w-full h-auto bg-white shadow-lg flex px-7 py-4'>
                <BackButton />
                <h1 className="grow font-medium">Payment</h1>
            </div>
            <div className="mx-7 my-4">
                <PaymentInfo />
                <div className="text-center my-10">
                    <p className='font-semibold text-9xl'>24</p>
                    <p className='font-semibold mt-3 text-[#8B8989]'>Order No. 123</p>
                </div>
                <TotalPayment prices={prices} />
            </div>
        </div>
    );
}

export default Payment;