// AdminOrderDetail.js
import { adminOrderHistory } from "./AdminOrderHistoryTable";

const AdminOrderDetail = ({ setShowOrderDetail, orderNo }) => {
    // Cari objek dalam adminStockData yang memiliki orderNo sesuai
    const orderData = adminOrderHistory.find(item => item.orderNo === orderNo);

    // Tentukan status berdasarkan nilai paymentStatus
    const status = orderData.paymentStatus === 1 ? "Done" : "Pending";

    // Fungsi untuk menangani aksi klik button
    const handleButtonClick = () => {
        if (status === "Done") {
            // Aksi ketika status order done
            console.log("Print order");
        } else {
            // Aksi ketika status order pending
            console.log("Complete order");
        }
    };

    // Jika orderData tidak ditemukan, tampilkan pesan bahwa pesanan tidak ditemukan
    if (!orderData) {
        return (
            <div className="">
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-xl shadow-xl relative">
                        <h2 className="mb-5 text-center text-lg font-semibold">Order Not Found</h2>
                        <button className="absolute top-4 right-5 fa-beat-fade text-lg text-gray-500 hover:text-gray-700" onClick={() => setShowOrderDetail(false)}>
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="">
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
                <div className="bg-white p-4 rounded-xl shadow-xl relative">
                    <button className="absolute top-4 right-5 fa-beat-fade text-lg text-gray-500 hover:text-gray-700" onClick={() => setShowOrderDetail(false)}>
                        <i className="fas fa-times"></i>
                    </button>
                    <h2 className="mb-5 text-center text-lg font-semibold">Detail Order</h2>
                    <div className="px-4">
                        <div className="flex mb-3">
                            <p className="w-40 text-[#43745B] font-medium">Order Number</p>
                            <p>{orderData.orderNo}</p>
                        </div>
                        <div className="flex mb-3">
                            <p className="w-40 text-[#43745B] font-medium">Table Number</p>
                            <p>{orderData.tableNo}</p>
                        </div>
                        <div className="flex mb-3">
                            <p className="w-40 text-[#43745B] font-medium">Order Date</p>
                            <p className="me-3">{orderData.date}</p>
                            <p>{orderData.time} WIB</p>
                        </div>
                        <div className="flex mb-3">
                            <p className="w-40 text-[#43745B] font-medium">Status</p>
                            <p>{status}</p>
                        </div>
                        {/* Tampilkan item menu dengan catatan */}
                        <div className="flex mb-3">
                            <p className="w-40 text-[#43745B] font-medium">Items</p>
                            <div className="flex flex-col">
                                {orderData.items ? (
                                    orderData.items.map((item, index) => (
                                        <div className="">
                                            <div key={index} className="flex mb-2">
                                                <p className="w-8 text-[#43745B] font-medium">{item.quantity}x</p>
                                                <p>{item.name}</p>
                                            </div>
                                            {/* Tampilkan catatan jika ada */}
                                            {item.notes && (
                                                <div className="ms-8 mb-3 border border-[#43745B] bg-white text-[#43745B] text-xs italic px-2 py-1 rounded-lg">
                                                    <p>Notes : {item.notes}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p>No items found</p>
                                )}
                            </div>
                        </div>
                        <div className="flex mb-6">
                            <p className="w-40 text-[#43745B] font-medium">Total</p>
                            <p>{orderData.total}</p>
                        </div>
                        <button
                            type="submit"
                            className="flex mx-auto bg-[#43745B] hover:bg-green-800 text-white font-bold my-3 py-2 px-4 shadow-xl rounded-xl"
                            onClick={handleButtonClick}
                        >
                            {status === "Done" ? "Print" : "Complete"} Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminOrderDetail;
