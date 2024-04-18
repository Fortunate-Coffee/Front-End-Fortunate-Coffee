import { Link } from "react-router-dom";

export const adminStockData = [
  { tableNo: 1, orderNo: '101293', date: '2024-04-18', time: '10:00', paymentStatus: 1 },
  { tableNo: 2, orderNo: '232034', date: '2024-04-18', time: '11:00', paymentStatus: 0 },
  { tableNo: 3, orderNo: '111269', date: '2024-04-18', time: '12:00', paymentStatus: 1 },
  { tableNo: 2, orderNo: '232034', date: '2024-04-18', time: '11:00', paymentStatus: 0 },
  { tableNo: 3, orderNo: '111269', date: '2024-04-18', time: '12:00', paymentStatus: 1 },
  { tableNo: 2, orderNo: '232034', date: '2024-04-18', time: '11:00', paymentStatus: 0 },
  { tableNo: 3, orderNo: '111269', date: '2024-04-18', time: '12:00', paymentStatus: 1 },
];

const AdminStockTable = () => {
  return (
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
                    <Link to={'/admin/order-history'}>
                        <i class="fa-solid fa-check text-green-800"></i>
                    </Link>
                ) : (
                    <Link to={'/admin/order-history'}>
                        <i class="fa-regular fa-clock text-yellow-500"></i>
                    </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStockTable;
