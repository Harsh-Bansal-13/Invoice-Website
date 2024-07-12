import React, { useState, useEffect } from "react";
import { isValidData } from "../helper/functions";

const styles = {
  textField:
    "w-auto p-1 rounded outline-none transition-border duration-300 ease-in-out focus:border-green-500",
  tableHead: "bg-slate-400",
  tableCellHead: "p-2 border border-gray-600 ",
  tableCell: "p-2 border border-gray-300 ",
  tableContainer: "shadow-none",
  iconButton: "text-red-500",
};

function InvoiceGrid({ invoices, setInvoices, fields }) {
  const columns = [
    { name: "Index", accessor: (_, index) => index + 1 },
    ...fields,
  ];

  const [state, setState] = useState({
    editingIndex: -1,
    gridData: invoices,
    SnackbarFlag: false,
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState((prevState) => ({ ...prevState, SnackbarFlag: false }));
  };

  useEffect(() => {
    setState((prevState) => ({ ...prevState, gridData: invoices }));
  }, [invoices]);

  const handleEdit = (index) => {
    setState((prevState) => ({ ...prevState, editingIndex: index }));
  };

  const handleSave = (index) => {
    if (!isValidData(state.gridData[index])) {
      setState((prevState) => ({ ...prevState, SnackbarFlag: true }));
      return;
    }

    const updatedInvoices = invoices.map((inv) =>
      inv.id === state.gridData[index].id ? state.gridData[index] : inv
    );
    setInvoices(updatedInvoices);
    setState((prevState) => ({
      ...prevState,
      editingIndex: -1,
      SnackbarFlag: false,
    }));
  };

  const handleDelete = (index) => {
    const updatedInvoices = state.gridData.filter((_, i) => i !== index);
    setInvoices(updatedInvoices);
    setState((prevState) => ({
      ...prevState,
      gridData: updatedInvoices,
      SnackbarFlag: false,
    }));
  };

  const handleChange = (index, field, value) => {
    let newGridData = [...state.gridData];
    newGridData[index] = { ...newGridData[index], [field]: value };

    const amount =
      parseFloat(newGridData[index].price) * parseFloat(newGridData[index].qty);

    const newDiscount = (
      (amount * parseFloat(newGridData[index].discountPercentage)) /
      100
    ).toFixed(2);

    const newTax = (
      (amount * parseFloat(newGridData[index].taxPercentage)) /
      100
    ).toFixed(2);

    const newTotalPrice = (
      amount -
      parseFloat(newDiscount) +
      parseFloat(newTax)
    ).toFixed(2);

    newGridData[index] = {
      ...newGridData[index],
      discount: newDiscount,
      tax: newTax,
      totalPrice: newTotalPrice,
    };

    setState((prevState) => ({ ...prevState, gridData: newGridData }));
  };

  const renderTableHead = () => (
    <thead className={`${styles.tableHead} rounded-lg`}>
      <tr className="rounded-md">
        {columns.map((column) => (
          <th key={column.name} className={styles.tableCellHead}>
            {column.name}
          </th>
        ))}
        <th className={styles.tableCellHead}>Manage</th>
      </tr>
    </thead>
  );

  const renderTableRows = () => (
    <tbody className="bg-white rounded-lg">
      {state.gridData.map((invoice, index) => (
        <tr key={invoice.id}>
          {columns.map((column, colIndex) => {
            let value;
            if (typeof column.accessor === "function") {
              value = column.accessor(invoice, index);
            } else {
              value = invoice[column.accessor];
            }

            const isEditing = state.editingIndex === index && column.editable;
            return (
              <td
                key={colIndex}
                className={`${styles.tableCell} text-center border-1 border-black`}
              >
                {isEditing ? (
                  <input
                    type="number"
                    value={value}
                    onChange={(e) =>
                      handleChange(
                        index,
                        column.accessor,
                        Number(e.target.value)
                      )
                    }
                    className={styles.textField}
                  />
                ) : (
                  value
                )}
              </td>
            );
          })}
          <td className={`${styles.tableCell} text-center`}>
            {state.editingIndex === index ? (
              <button
                onClick={() => handleSave(index)}
                className="text-green-500 mx-2"
              >
                <i class="fi fi-rs-disk"></i>
              </button>
            ) : (
              <button
                onClick={() => handleEdit(index)}
                className="text-blue-500"
              >
                <i class="fi fi-rr-pencil mx-2"></i>
              </button>
            )}
            <button
              onClick={() => handleDelete(index)}
              className={styles.iconButton}
            >
              <i class="fi fi-bs-trash"></i>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <>
      <div className={`overflow-auto ${styles.tableContainer} p-3`}>
        <table className="min-w-full divide-y divide-gray-200 ">
          {renderTableHead()}
          {renderTableRows()}
        </table>
      </div>
      {state.SnackbarFlag && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded">
          Invalid input.
          <button
            onClick={handleSnackbarClose}
            className="ml-2 bg-transparent border-0 text-white cursor-pointer"
          >
            X
          </button>
        </div>
      )}
    </>
  );
}

export default InvoiceGrid;
