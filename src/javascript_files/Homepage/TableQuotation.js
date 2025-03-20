import React from "react";

const Table = ({ tableHead, tableData, generateInvoice }) => {
  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            {tableHead.map((head, index) => (
              <th key={index} style={styles.th}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex} style={styles.tr}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={styles.td}>
                  {cell}
                </td>
              ))}
              {/* <td style={styles.actionTd}>
                <button
                  onClick={() => generateInvoice(tableData[rowIndex])} // Pass the invoice data
                  style={styles.button}
                >
                  Generate Invoice
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableContainer: {
    width: "100%",
    overflowX: "auto",
    padding: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    fontSize: "16px",
  },
  th: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px",
    border: "1px solid #ddd",
  },
  tr: {
    backgroundColor: "#f9f9f9",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
  },
  actionTd: {
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default Table;
