// AdminStockTable.js
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminOrderDetail from "./AdminOrderDetail"; // Menggunakan path relatif

export const adminStockData = [
  { 
    tableNo: 1, 
    orderNo: '101293', 
    date: '2024-04-18', 
    time: '10:00', 
    paymentStatus: 1,
    items: [
        { name: "Joyful Rice", quantity: 1, notes: "Extra spicy" },
        { name: "Cripsy Bun", quantity: 3, notes: null }, // Contoh tanpa catatan
        { name: "Green Tea", quantity: 2, notes: "No sugar" },
    ],
    total: "Rp. 75.000" // Total pembelian
  },
  { 
    tableNo: 3, 
    orderNo: '112892', 
    date: '2024-04-18', 
    time: '10:00', 
    paymentStatus: 0,
    items: [
        { name: "Joyful Rice", quantity: 1, notes: "Extra spicy" },
        { name: "Cripsy Bun", quantity: 3, notes: null }, // Contoh tanpa catatan
        { name: "Green Tea", quantity: 2, notes: "No sugar" },
    ],
    total: "Rp. 75.000" // Total pembelian
  },
  { 
    tableNo: 2, 
    orderNo: '129023', 
    date: '2024-04-18', 
    time: '10:00', 
    paymentStatus: 1,
    total: "Rp. 75.000" // Total pembelian
  },
  { 
    tableNo: 4, 
    orderNo: '201983', 
    date: '2024-04-18', 
    time: '10:00', 
    paymentStatus: 0,
    items: [
        { name: "Joyful Rice", quantity: 1, notes: "Extra spicy" },
        { name: "Cripsy Bun", quantity: 3, notes: null }, // Contoh tanpa catatan
        { name: "Green Tea", quantity: 2, notes: "No sugar" },
    ],
    total: "Rp. 75.000" // Total pembelian
  },
  { 
    tableNo: 8, 
    orderNo: '298202', 
    date: '2024-04-18', 
    time: '10:00', 
    paymentStatus: 1,
    total: "Rp. 75.000" // Total pembelian
  },
  { 
    tableNo: 9, 
    orderNo: '173245', 
    date: '2024-04-18', 
    time: '10:00', 
    paymentStatus: 0,
    items: [
        { name: "Joyful Rice", quantity: 1, notes: "Extra spicy" },
        { name: "Cripsy Bun", quantity: 3, notes: null }, // Contoh tanpa catatan
        { name: "Green Tea", quantity: 2, notes: "No sugar" },
    ],
    total: "Rp. 75.000" // Total pembelian
  },
];

const AdminStockTable = () => {
    const [showOrderDetail, setShowOrderDetail] = useState(false);
    const [selectedOrderNo, setSelectedOrderNo] = useState(null);

    // Fungsi untuk menampilkan detail pesanan saat tombol ditekan
    const handleShowOrderDetail = (orderNo) => {
        setShowOrderDetail(true);
        setSelectedOrderNo(orderNo);
    };

    return (
        <div className="">
            {showOrderDetail && <AdminOrderDetail setShowOrderDetail={setShowOrderDetail} orderNo={selectedOrderNo} />}

            <div className="w-full my-10">
                <table className="border border-gray-300 shadow-xl min-w-full divide-y divide-gray-300">
                    <thead className="bg-[#43745B] text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                Order Number
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                Table Number
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                Time
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                                Payment Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                        {adminStockData.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white text-black' : 'bg-green-50 text-black'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium">
                                    {item.orderNo}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    {item.tableNo}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    {item.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    {item.time}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    {item.paymentStatus === 1 ? (
                                        <Link to="#" onClick={() => handleShowOrderDetail(item.orderNo)}>
                                            <i className="fa-solid fa-check text-green-800"></i>
                                        </Link>
                                    ) : (
                                        <Link to="#" onClick={() => handleShowOrderDetail(item.orderNo)}>
                                            <i className="fa-regular fa-clock text-yellow-500"></i>
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminStockTable;
