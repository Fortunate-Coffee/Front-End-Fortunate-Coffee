import { useState, useEffect } from 'react';
import { formatPrice } from '../../menu';

const AdminOrderDetail = ({ setShowOrderDetail, orderNo, updateOrderStatus }) => {
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/detail-order/${orderNo}/order`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setOrderData(data);
                    console.log('Order data: ', orderData);
                    console.log('data: ', data);
                    console.log('set order: ', setOrderData(data));
                } else {
                    throw new Error("Failed to load order details.");
                }
            } catch (err) {
                setError("Failed to load order details. Please try again.");
                setSuccess(null);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [orderNo, token]);

    const handleCompleteOrder = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/order/${orderNo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 'order_status': 1 }),
            });
            if (response.ok) {
                setSuccess("Order completed successfully.");
                setTimeout(() => {
                    setShowOrderDetail(false);
                }, 2000);
                setError(null);
                updateOrderStatus(orderNo, true);
            } else {
                const errorData = await response.json();
                console.error("Failed to complete the order:", errorData);
                throw new Error("Failed to complete the order.");
            }
        } catch (err) {
            setError("Failed to complete the order. Please try again.");
            setSuccess(null);
        }
    };

    const handlePrintOrder = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                <div className="bg-white p-4 rounded-xl shadow-xl relative">
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 12h4zm2 5.291l-2.162-.88A8.015 8.015 0 014 12H0c0 2.021.388 3.936 1.081 5.627L6 17.29z"></path>
                    </svg>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                <div className="bg-white p-4 rounded-xl shadow-xl relative">
                    <h2 className="mb-5 text-center text-lg font-semibold">{error}</h2>
                    <button className="absolute top-4 right-5 text-lg text-gray-500 hover:text-gray-700" onClick={() => setShowOrderDetail(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
        );
    }

    const status = orderData[0].order && orderData[0].order.order_status === true ? "Done" : "Pending";

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-xl shadow-xl relative printable print:w-fit print:h-fit">
                <button className="print:hidden absolute top-4 right-5 text-lg text-gray-500 hover:text-gray-700" onClick={() => setShowOrderDetail(false)}>
                    <i className="fas fa-times"></i>
                </button>
                <h2 className="print:hidden text-center text-lg font-semibold">Order Detail</h2>
                <div className="hidden print:flex print:flex-row print:items-center print:justify-center">
                    <img alt='logo' src='https://ik.imagekit.io/fndsjy/Fortunate_Coffee/FC%20Logo.png?updatedAt=1716675738839' className='print:w-12 print:h-12 print:text-black font-bold print:grayscale' />
                    <h1 className="hidden print:flex print:font-mono print:mb-0 mb-5 text-center text-lg font-semibold">FORTUNATE COFFEE</h1>
                </div>
                <p className='hidden print:flex print:w-96 print:my-2 print:text-center print:font-mono print:mx-auto print:justify-center'>Cemara Asri, Boulevard Raya Street Number 8, Medan Estate, Percut Sei Tuan Subdistrict, Deli Serdang Regency, North Sumatera 20371.</p>
                <p className='hidden print:flex print:justify-between'>==============================================</p>
                <div className="px-4 print:px-0 print:text-black print:font-mono">
                    <div className="flex mb-3 print:flex print:mx-auto print:w-96">
                        <p className="print:text-black w-40 text-[#43745B] font-medium">Order Number</p>
                        <p>{orderData[0].order && orderData[0].order.order_id}</p>
                    </div>
                    <div className="flex mb-3 print:flex print:mx-auto print:w-96">
                        <p className="print:text-black w-40 text-[#43745B] font-medium">Table Number</p>
                        <p>{orderData[0].order && orderData[0].order.table_number}</p>
                    </div>
                    <div className="flex mb-3 print:flex print:mx-auto print:w-96">
                        <p className="print:text-black w-40 text-[#43745B] font-medium">Order Date</p>
                        <p className="me-3">{orderData[0] && orderData[0].order && new Date(orderData[0].order.createdAt).toLocaleDateString()}</p>
                        <p>{orderData[0].order && new Date(orderData[0].order.createdAt).toLocaleTimeString()} WIB</p>
                    </div>
                    <div className="flex mb-3 print:flex print:mx-auto print:w-96">
                        <p className="print:text-black w-40 text-[#43745B] font-medium">Status</p>
                        <p>{status}</p>
                    </div>
                    <div className="flex mb-3 print:flex print:mx-auto print:w-96">
                        <p className="print:text-black print:flex print:mx-auto print:w-[70%] w-40 text-[#43745B] font-medium ">Items</p>
                        <div className="print:flex print:mx-auto print:w-96 w-96 flex flex-col">
                            {orderData && orderData.map((item, index) => (
                                <div key={index}>
                                    <div className="flex mb-2">
                                        <p className="print:text-black w-6 me-2 text-[#43745B] font-medium">{item.detail_order_qty}x</p>
                                        <p className=''>{item.menu_name}</p>
                                    </div>
                                    {item.detail_order_notes && (
                                        <div className="print:text-black print:border-none ms-8 mb-3 print:font-mono border border-[#43745B] bg-white text-[#43745B] text-xs italic px-2 py-1 w-48 rounded-lg">
                                            <p className='w-48 pe-3 print:font-mono truncate'>Notes: {item.detail_order_notes}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className='hidden print:flex print:text-gray-600 print:font-mono print:text-lg'>------------------------------------------------------</p>
                    <div className="flex mb-6 print:mb-0 print:flex print:mx-auto print:w-96">
                        <p className="print:text-black w-40 text-[#43745B] font-medium">Total</p>
                        <p>{orderData[0].order && `Rp. ${formatPrice(orderData[0].order.price_total)}`}</p>
                    </div>
                </div>
                <p className='hidden print:flex print:mb-0 '>==============================================</p>
                {error && <p className="italic text-red-500">{error}</p>}
                    {success && <p className="italic text-green-500">{success}</p>}
                <div className="mt-5 text-center">
                    {orderData[0].order && orderData[0].order.order_status === false && (
                        <button
                            className="bg-[#43745B] hover:bg-[#3b654f] text-white py-2 px-4 rounded-lg shadow-md mr-3"
                            onClick={handleCompleteOrder}
                        >
                            Complete Order
                        </button>
                    )}
                    {orderData[0].order && orderData[0].order.order_status === true && (
                        <button
                            className="print:hidden bg-[#43745B] hover:bg-[#3b654f] text-white py-2 px-4 rounded-lg shadow-md"
                            onClick={handlePrintOrder}
                        >
                            Print Order
                        </button>
                    )}
                </div>
                <p className='hidden print:flex print:w-96 print:font-mono print:text-center print:mt-0 print:mb-2 print:flex print:justify-between print:mx-auto'>Thank you for visiting Fortunate Coffee! We're grateful for your purchase. Remember, the whole world is one family. May all beings be happy. We look forward to your next visit!</p>
            </div>
        </div>
    );
};

export default AdminOrderDetail;
