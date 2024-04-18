import ExportButton from "../atoms/ExportButton";
import GetDataButton from "../atoms/GetDataButton";
import DateSelect from "../atoms/DateSelect";
import AdminStockTable from "../organisms/AdminStockTable";

const AdminOrderHistory = () => {
    const tableNo = [
        {text: 1},
        {text: 2},
        {text: 3},
        {text: 4},
        {text: 5}
    ];

    return(
        <div>
            <div className="p-3 flex justify-between items-center bg-[#43745B] shadow-xl">
                <h1 className='text-white tracking-wide'>Order History</h1>
                <ExportButton />
            </div>
            <div className="mt-6 p-3">
                <div className="flex justify-between">
                        <DateSelect />
                        <div>
                            <label htmlFor="selectOption" className="font-medium me-6 text-[#43745B]">Table Number</label>
                            <select id="selectOption" name="selectOption" className="border border-[#43745B] rounded-xl shadow-xl p-2 px-3 me-2">
                                {tableNo.map((tableNo, index) => (
                                    <option key={index} value={tableNo.text}>{tableNo.text}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="orderNumber" className="font-medium me-6 text-[#43745B]">Order Number</label>
                            <input type="number" id="orderNumber" required name="orderNumber" min={1} className="border border-[#43745B] rounded-xl shadow-xl p-2 px-3 me-2" />
                        </div>
                        <GetDataButton />
                </div>
                <AdminStockTable />
            </div>
        </div>
    );
}

export default AdminOrderHistory;
