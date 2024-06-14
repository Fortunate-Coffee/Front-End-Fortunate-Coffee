import { useState, useEffect } from 'react';
import ExportButton from "../atoms/ExportButton";
import GetDataButton from "../atoms/GetDataButton";
import DateSelect from "../atoms/DateSelect";
import AdminOrderHistoryTable from "../organisms/AdminOrderHistoryTable";

const AdminOrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState('Today');
    const [selectedTableNumber, setSelectedTableNumber] = useState('');
    const [orderNumber, setOrderNumber] = useState('');

    const tableNo = [];
    for (let i = 1; i <= 20; i++) {
        tableNo.push({id: i,  text: i });
    }

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        // Fetch all orders initially
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://backend-fortunate-coffee.up.railway.app/api/v1/order', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
            setLoading(false);
        };

        fetchOrders();
    }, [token]);

    const fetchData = async () => {
        setLoading(true);
        let url = 'https://backend-fortunate-coffee.up.railway.app/api/v1/filtered-order';

        const queryParams = new URLSearchParams();
        if (selectedDate) {
            queryParams.append('period', selectedDate);
        }
        if (selectedTableNumber) {
            queryParams.append('table_number', selectedTableNumber);
        }
        if (orderNumber) {
            queryParams.append('order_id', orderNumber);
        }

        url += `?${queryParams.toString()}`;

        try {
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching filtered orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGetData = () => {
        fetchData();
    };

    return(
        <div>
            <div className="p-3 flex justify-between items-center bg-[#43745B] shadow-xl">
                <h1 className='text-white tracking-wide'>Order History</h1>
                <ExportButton />
            </div>
            <div className="mt-6 p-3">
                <div className="flex justify-between">
                        <DateSelect setSelectedDate={setSelectedDate} />
                        <div>
                            <label htmlFor="selectOption" className="font-medium me-6 text-[#43745B]">Table Number</label>
                            <select value={selectedTableNumber} id="selectOption" name="selectOption" className="border border-[#43745B] rounded-xl shadow-xl p-2 px-3 me-2" onChange={(e) => setSelectedTableNumber(e.target.value)}>
                                <option value='' disabled>Select a table number</option>
                                {tableNo.map((tableNo, index) => (
                                    <option key={index} value={tableNo.id}>{tableNo.text}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="orderNumber" className="font-medium me-6 text-[#43745B]">Order Number</label>
                            <input placeholder='Your order number' type="number" id="orderNumber" required name="orderNumber" min={1} className="border border-[#43745B] rounded-xl shadow-xl p-2 px-3 me-2" onChange={(e) => setOrderNumber(e.target.value)}/>
                        </div>
                        <GetDataButton onClick={handleGetData} loading={loading}/>
                </div>
                <AdminOrderHistoryTable orders={orders}/>
            </div>
        </div>
    );
}

export default AdminOrderHistory;
