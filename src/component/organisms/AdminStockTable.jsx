export const adminStockData = [
  {
    foodIngredientsNo: 'Egg',
    qty: 10,
    date: '2024-04-18', 
    time: '10:00',
    type: 'Remaining Stock'
  },
  {
    foodIngredientsNo: 'Rice',
    qty: 10,
    date: '2024-04-18', 
    time: '10:00',
    type: 'Remaining Stock'
  },
  {
    foodIngredientsNo: 'Mushroom',
    qty: 10,
    date: '2024-04-18', 
    time: '10:00',
    type: 'In'
  },
  {
    foodIngredientsNo: 'Chocolate',
    qty: 10,
    date: '2024-04-18', 
    time: '10:00',
    type: 'Remaining Stock'
  },
  {
    foodIngredientsNo: 'Seaweed',
    qty: 10,
    date: '2024-04-18', 
    time: '10:00',
    type: 'In'
  },
  {
    foodIngredientsNo: 'Tomato',
    qty: 10,
    date: '2024-04-18', 
    time: '10:00',
    type: 'Remaining Stock'
  }
];

const AdminStockTable = () => {
    return (
        <div className="">
            <div className="w-full my-10">
                <table className="border border-gray-300 shadow-xl min-w-full divide-y divide-gray-300">
                    <thead className="bg-[#43745B] text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hover:scale-110">
                                name
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hover:scale-110">
                                qty
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hover:scale-110">
                                last updated date
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider hover:scale-110">
                                last updated time
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                        {adminStockData.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white text-black' : 'bg-green-50 text-black'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium">
                                    {item.foodIngredientsNo}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    {item.qty}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    {item.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    {item.time}
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
