import jsPDF from 'jspdf';
import 'jspdf-autotable';
import companyLogo from '../../../assets/logos/Blue-type.png'; // Adjust path to your logo file

export const generateInvoice = (invoice) => {
    const doc = new jsPDF();

    // Company Logo at the top-right corner
    const logoWidth = 40;
    const logoHeight = 40;
    const marginLeft = doc.internal.pageSize.width - logoWidth - 10;
    doc.addImage(companyLogo, 'PNG', marginLeft, 10, logoWidth, logoHeight);

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Invoice', 14, 30);

    // Invoice details section
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Invoice ID: INV-${invoice.id}`, 14, 50);
    doc.text(`Date: ${new Date(invoice.dateCreated).toLocaleDateString('en-US')}`, 14, 58);
    doc.text(`Customer: ${invoice.cusName}`, 14, 66);
    doc.text(`Registration Number: ${invoice.registrationNumber}`, 14, 74);

    // Invoice description and notes
    doc.setFontSize(10);
    const invoiceText = `Thank you for your business. Please remit payment at your earliest convenience.`;
    const splitInvoiceText = doc.splitTextToSize(invoiceText, 180);
    doc.text(splitInvoiceText, 14, 90);

    // Table header
    const tableColumnHeaders = ['Vehicle No', 'Customer Name', 'Date', 'Amount'];

    // Table rows (example with invoice details)
    const tableRows = [
        [invoice.registrationNumber, invoice.cusName, new Date(invoice.dateCreated).toLocaleDateString('en-US'), `Rs ${invoice.amount.toLocaleString()}`],
        // Add more rows as needed
    ];

    // Auto-table configuration
    doc.autoTable({
        startY: 110,
        head: [tableColumnHeaders],
        body: tableRows,
        theme: 'grid', // 'striped', 'grid', 'plain'
        styles: {
            fontSize: 10,
            cellPadding: 3,
            textColor: [0, 0, 0],
            lineColor: [0, 0, 0],
            lineWidth: 0.1,
        },
    });

    // Footer section
    const footerText = `Thank you for choosing our services. For any inquiries, please contact us at contact@example.com`;
    const splitFooterText = doc.splitTextToSize(footerText, 180);
    const footerHeight = splitFooterText.length * 10 + 10;
    doc.text(splitFooterText, 14, doc.internal.pageSize.height - footerHeight);

    // Create Blob URL for the PDF
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);

    return pdfUrl;
};
