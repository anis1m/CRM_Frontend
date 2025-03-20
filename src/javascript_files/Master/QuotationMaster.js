import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../../css_files/Master/QuotationMaster.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TableQuotation from "../Homepage/TableQuotation";

function QuotationMaster() {
  const [tableData, setTableData] = useState([]);
  const [quotationData, setQuotationData] = useState({
    invoiceNumber: "",
    clientName: "",
    itemDescription: "",
    quantity: "",
    subtotal: "",
    tax: "5",
    total: "",
    date: "",
  });
  const [showAddQuotationMaster, setShowAddQuotationMaster] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("categories")) || [];
    setTableData(storedData);
  }, []);

  function calculateTotal(subtotal, tax) {
    const taxRate = parseFloat(tax) / 100;
    return (parseFloat(subtotal) + parseFloat(subtotal) * taxRate).toFixed(2);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const totalAmount = calculateTotal(
      quotationData.subtotal,
      quotationData.tax
    );
    const newQuotation = {
      invoiceNumber: tableData.length + 1,
      ...quotationData,
      total: totalAmount,
    };
    const updatedData = [...tableData, newQuotation];
    setTableData(updatedData);
    localStorage.setItem("categories", JSON.stringify(updatedData));
    toast.success("Quotation Added Successfully");
    setShowAddQuotationMaster(false);
  }

  function generatePDF(invoice) {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Company Name", 20, 20);
    doc.setFont("helvetica", "normal");
    doc.text("123 Business Road, City, Country", 20, 30);
    doc.text("Phone: (123) 456-7890", 20, 40);
    doc.text("Email: contact@company.com", 20, 50);

    doc.setFontSize(16);
    doc.text("Invoice", 150, 20);
    doc.setFontSize(12);
    doc.text(`Invoice No: ${invoice.invoiceNumber}`, 150, 30);
    doc.text(`Date: ${invoice.date}`, 150, 40);

    doc.autoTable({
      startY: 60,
      head: [["Item Description", "Quantity", "Subtotal", "Tax", "Total"]],
      body: [
        [
          invoice.itemDescription,
          invoice.quantity,
          `$${invoice.subtotal}`,
          `${invoice.tax}%`,
          `$${invoice.total}`,
        ],
      ],
      theme: "striped",
      margin: { top: 10 },
    });

    doc.text(
      "Thank you for your business!",
      20,
      doc.internal.pageSize.height - 20
    );
    doc.save(`Invoice_${invoice.invoiceNumber}.pdf`);
  }

  return (
    <section className="quotation-master">
      <ToastContainer />
      <h1>Quotation Master</h1>
      <blockquote className="quotation-master-forms">
        <button onClick={() => setShowAddQuotationMaster(true)}>
          Create Quotation
        </button>
      </blockquote>

      {showAddQuotationMaster && (
        <form className="add-quotation-master" onSubmit={handleSubmit}>
          <button
            className="quotation-close-btn"
            onClick={() => setShowAddQuotationMaster(false)}
          >
            X
          </button>
          <label>Client Name</label>
          <input
            type="text"
            value={quotationData.clientName}
            onChange={(e) =>
              setQuotationData({ ...quotationData, clientName: e.target.value })
            }
          />
          <label>Item Description</label>
          <input
            type="text"
            value={quotationData.itemDescription}
            onChange={(e) =>
              setQuotationData({
                ...quotationData,
                itemDescription: e.target.value,
              })
            }
          />
          <label>Quantity</label>
          <input
            type="number"
            value={quotationData.quantity}
            onChange={(e) =>
              setQuotationData({ ...quotationData, quantity: e.target.value })
            }
          />
          <label>Subtotal</label>
          <input
            type="number"
            value={quotationData.subtotal}
            onChange={(e) =>
              setQuotationData({ ...quotationData, subtotal: e.target.value })
            }
          />
          <label>Tax</label>
          <select
            value={quotationData.tax}
            onChange={(e) =>
              setQuotationData({ ...quotationData, tax: e.target.value })
            }
          >
            <option value="5">5%</option>
            <option value="10">10%</option>
            <option value="15">15%</option>
          </select>
          <label>Total</label>
          <input
            type="text"
            value={calculateTotal(quotationData.subtotal, quotationData.tax)}
            readOnly
          />
          <label>Date</label>
          <input
            type="date"
            value={quotationData.date}
            onChange={(e) =>
              setQuotationData({ ...quotationData, date: e.target.value })
            }
          />
          <button type="submit">Add Quotation</button>
        </form>
      )}

      <TableQuotation
        tableHead={[
          "Invoice Number",
          "Client Name",
          "Item Description",
          "Quantity",
          "Subtotal",
          "Tax",
          "Total",
          "Date",
          "Actions",
        ]}
        tableData={tableData.map((item) => [
          item.invoiceNumber,
          item.clientName,
          item.itemDescription,
          item.quantity,
          item.subtotal,
          item.tax,
          item.total,
          item.date,
          <button onClick={() => generatePDF(item)}>Generate Invoice</button>,
        ])}
      />
    </section>
  );
}

export default QuotationMaster;
