import { useState, useEffect } from 'react';
import { formatPrice } from '../../menu';
import HomeButton from '../atoms/HomeButton';
import PaymentInfo from '../atoms/PaymentInfo';
import TotalPayment from '../molecules/TotalPayment';

const Payment = ({ setCartItems }) => {
    const [tableNumber, setTableNumber] = useState('');
    const [orderData, setOrderData] = useState(null)
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        const savedTableNumber = localStorage.getItem('tableNumber');
        if (savedTableNumber) {
            setTableNumber(savedTableNumber);
        }

        // Mengambil data pesanan dari storage lokal saat komponen dimuat
        const storedData = localStorage.getItem('orderData');
        if (storedData) {
            const { orderNumber, items, totalPrice } = JSON.parse(storedData);
            const orderData = { orderNumber, items, totalPrice };
            setOrderData(orderData); // Menyimpan data pesanan di state
            console.log(orderData);

            // Mengambil harga dari orderData
            const allPrices = items.map(item => item.price);
            setPrices(allPrices); // Memperbarui state harga
        }
    }, [setCartItems, setPrices]);

    return(
        <div className="">
            <div className='fixed top-0 z-0 w-full h-auto bg-white shadow-lg flex px-7 py-4'>
                <HomeButton />
                <h1 className="grow font-medium">Payment</h1>
            </div>
            <div className="mx-7 my-4">
                <PaymentInfo />
                <div className="text-center my-10">
                    <p className='font-light tracking-widest mt-3 text-[#8B8989]'>Table Number</p>
                    <p className='font-semibold text-9xl'>{tableNumber} </p>
                    <p className='font-semibold mt-3 text-[#8B8989]'>{orderData ? `Order No. ${orderData.orderNumber}` : ''}</p>
                </div>
                <div className="flex flex-col font-semibold mb-3">
                    {orderData && orderData.items.map((item, index) => (
                        <div key={index} className="flex flex-row justify-between my-1 truncate">
                            <p className='truncate w-6/12'>{item.name}</p>
                            <div className="flex flex-row w-3/12 justify-end">
                                <p className='mx-6'>{item.quantity}x</p>
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