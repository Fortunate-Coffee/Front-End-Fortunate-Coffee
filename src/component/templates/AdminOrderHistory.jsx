import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GetDataButton from "../atoms/GetDataButton";
import DateSelect from "../atoms/DateSelect";
import AdminOrderHistoryTable from "../organisms/AdminOrderHistoryTable";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AdminOrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState('All');
    const [selectedTableNumber, setSelectedTableNumber] = useState('');
    const [orderNumber, setOrderNumber] = useState('');

    // Function to format date and time
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return { date, time };
    };

    // Fungsi eksport PDF
    const exportToPDF = () => {
        const doc = new jsPDF();

        // Get current date and time
        const now = new Date();
        const currentDate = now.toLocaleDateString();
        const currentTime = now.toLocaleTimeString();

        // Sort data based on the updatedAt field in descending order (most recent first)
        const sortedData = [...orders].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        const tableColumn = ["Order Number", "Table Number", "Date", "Time", "Payment Status"];
        const tableRows = [];

        sortedData.forEach(item => {
            const { date, time } = formatDateTime(item.updatedAt);
            const paymentStatus = item.order_status ? "Paid" : "Pending";

            const dataRow = [item.order_id, item.table_number, date, time, paymentStatus];
            tableRows.push(dataRow);
        });

        // Add text before starting the table
        doc.setFont('times', 'bold');
        doc.text('Order History Fortunate Coffee', 14, 15);

        // Add export date and time
        doc.setFontSize(10);
        doc.setFont('times', 'normal');
        doc.text(`Exported on ${currentDate} at ${currentTime}`, 14, 20);

        // Generate table with custom styles
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 24,
            theme: 'striped',
            styles: {
                fontStyle: 'normal',
                valign: 'middle', // Posisi vertikal tengah
            },
            headStyles: {
                fillColor: "#43745B",
                textColor: "#FFFFFF",
                valign: 'middle', // Posisi vertikal tengah
            },
            bodyStyles: {
                fillColor: "#FFFFFF",
                textColor: "#000000",
            },
            columnStyles: {
                1: { align: 'center' }, // Kolom 2 (Table Number) rata tengah
                2: { align: 'center' }, // Kolom 3 (Date) rata tengah
                3: { align: 'center' }, // Kolom 4 (Time) rata tengah
                4: { align: 'center' }, // Kolom 5 (Payment Status) rata tengah
            }
        });

        // Add page number at the bottom right corner
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.text(`Page ${i} of ${totalPages}`, doc.internal.pageSize.getWidth() - 25, doc.internal.pageSize.getHeight() - 5);
        }

        doc.save('Order History Fortunate Coffee.pdf');
    };

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

        const queryString = queryParams.toString();
        if (queryString) {
            url += `?${queryString}`;
        }

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

    useEffect(() => {
        handleGetData();
    }, [selectedDate]);

    return(
        <div>
            <div className="p-3 flex justify-between items-center bg-[#43745B] shadow-xl">
                <h1 className='text-white tracking-wide'>Order History</h1>
                <div className="flex">
                    <Link to="#" onClick={exportToPDF} className='px-3 py-2 flex ms-5 flex-row shadow-2xl rounded-xl bg-white'>
                        <i className="flex items-center fa-solid fa-file-export fa-lg text-[#43745B]"></i>
                        <p className='ms-2 text-[#43745B]'>Export</p>
                    </Link>
                </div>
            </div>
            <div className="mt-6 p-3">
                <div className="flex justify-between">
                        <DateSelect setSelectedDate={setSelectedDate} />
                        <div>
                            <label htmlFor="selectOption" className="font-medium me-6 text-[#43745B]">Table Number</label>
                            <select value={selectedTableNumber} id="selectOption" name="selectOption" className="border border-[#43745B] rounded-xl shadow-xl p-2 px-3 me-2" onChange={(e) => setSelectedTableNumber(e.target.value)}>
                                <option value='' disabled>Select a table number</option>
                                <option value="All">All</option>
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
