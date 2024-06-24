import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ExportButton = ({ data, selectedType, foodIngredients }) => {
    const exportToPDF = () => {
        const doc = new jsPDF();

        // Get current date and time
        const now = new Date();
        const currentDate = now.toLocaleDateString();
        const currentTime = now.toLocaleTimeString();

        // Sort data based on the updatedAt field in descending order (most recent first)
        const sortedData = [...data].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        const tableColumn = ["Name", "Qty", "Last Updated Date", "Last Updated Time"];
        const tableRows = [];

        sortedData.forEach(item => {
            const ingredientName = selectedType === "In" || selectedType === "Out"
                ? foodIngredients.find(ingredient => ingredient.food_ingredients_id === item.food_ingredients_id)?.food_ingredients_name
                : item.food_ingredients_name;
            const qty = selectedType === "In" || selectedType === "Out"
                ? item.detail_food_ingredients_qty
                : item.food_ingredients_stock;
            const updatedAt = new Date(item.updatedAt);
            const date = updatedAt.toLocaleDateString();
            const time = updatedAt.toLocaleTimeString();

            const dataRow = [ingredientName, qty, date, time];
            tableRows.push(dataRow);
        });

        // Add text before starting the table
        doc.setFont('times', 'bold');
        doc.text(`Stock Data Fortunate Coffee by ${selectedType}`, 14, 15);

        
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
                1: { align: 'center' }, // Kolom 2 (Qty) rata tengah
                2: { align: 'center' }, // Kolom 3 (Last Updated Date) rata tengah
                3: { align: 'center' }, // Kolom 4 (Last Updated Time) rata tengah
            }
        });

        // Add page number at the bottom right corner
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.text(`Page ${i} of ${totalPages}`, doc.internal.pageSize.getWidth() - 25, doc.internal.pageSize.getHeight() - 5);
        }

        doc.save(`Stock Data Fortunate Coffee by ${selectedType}.pdf`);
    };

    return (
        <div className="flex">
            <Link to="#" onClick={exportToPDF} className='px-3 py-2 flex ms-5 flex-row shadow-2xl rounded-xl bg-white'>
                <i className="flex items-center fa-solid fa-file-export fa-lg text-[#43745B]"></i>
                <p className='ms-2 text-[#43745B]'>Export</p>
            </Link>
        </div>
    );
}

export default ExportButton;
