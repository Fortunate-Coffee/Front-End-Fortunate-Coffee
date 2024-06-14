// AdminStockTable.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminOrderDetail from "./AdminOrderDetail";

const AdminOrderHistoryTable = ({ orders = [] }) => {
    const [showOrderDetail, setShowOrderDetail] = useState(false);
    const [selectedOrderNo, setSelectedOrderNo] = useState(null);
    const [orderList, setOrderList] = useState(orders); // Local state for orders

    useEffect(() => {
        setOrderList(orders); // Update local state when props.orders changes
    }, [orders]);

    // Fungsi untuk menampilkan detail pesanan saat tombol ditekan
    const handleShowOrderDetail = (orderNo) => {
        setShowOrderDetail(true);
        setSelectedOrderNo(orderNo);
    };

    // Function to update the order status
    const updateOrderStatus = (orderNo, status) => {
        setOrderList(prevOrders =>
            prevOrders.map(order =>
                order.order_id === orderNo ? { ...order, order_status: status } : order
            )
        );
    };

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString();
        return { date, time };
    };

    // Sort orders by descending createdAt
    const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="">
            {showOrderDetail && <AdminOrderDetail setShowOrderDetail={setShowOrderDetail} orderNo={selectedOrderNo} updateOrderStatus={updateOrderStatus}/>}

            <div className="w-full my-10">
                <table className="border border-gray-300 shadow-xl min-w-full divide-y divide-gray-300">
                    <thead className="bg-[#43745B] text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hover:scale-110">
                                Order Number
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hover:scale-110">
                                Table Number
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hover:scale-110">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hover:scale-110">
                                Time
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hover:scale-110">
                                Payment Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                        {sortedOrders.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center p-4">
                                    No Data Available
                                </td>
                            </tr>
                        ) : (
                            sortedOrders.map((item, index) => {
                                const { date, time } = formatDateTime(item.updatedAt);
                                return (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white text-black' : 'bg-green-50 text-black'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium">
                                            {item.order_id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                            {item.table_number}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                            {date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                            {time}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                            {item.order_status === true ? (
                                                <Link to="#" onClick={() => handleShowOrderDetail(item.order_id)}>
                                                    <i className="fa-solid fa-check text-green-800 hover:scale-110"></i>
                                                </Link>
                                            ) : (
                                                <Link to="#" onClick={() => handleShowOrderDetail(item.order_id)}>
                                                    <i className="fa-regular fa-clock text-yellow-500 hover:scale-110"></i>
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrderHistoryTable;
