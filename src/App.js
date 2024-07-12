import React, { useState } from "react";
import InvoiceForm from "./Components/InvoiceForm";
import InvoiceGrid from "./Components/InvoiceGrid";
import "./index.css";

function App() {
  const [invoices, setInvoices] = useState([]);

  const handleAddInvoice = (invoice) => {
    const newInvoice = { id: Date.now(), ...invoice };
    setInvoices([...invoices, newInvoice]);
  };
  const fields = [
    {
      name: "Quantity",
      accessor: "qty",
      editable: true,
    },
    {
      name: "Price",
      accessor: "price",
      editable: true,
    },
    {
      name: "Discount %",
      accessor: "discountPercentage",
      editable: true,
    },
    {
      name: "Discount",
      accessor: "discount",
      editable: false,
    },
    {
      name: "Tax %",
      accessor: "taxPercentage",
      editable: true,
    },
    {
      name: "Tax",
      accessor: "tax",
      editable: false,
    },
    {
      name: "Total Price",
      accessor: "totalPrice",
      editable: false,
    },
  ];
  return (
    <div className="max-w-[960px] mx-auto p-4 flex flex-col items-center justify-center gap-5 rounded-md shadow-sm bg-transparent">
      <div className="w-full border-1 bg-slate-200 rounded-lg shadow-lg">
        <div className="text-center text-gray-800 font-sans text-[2.5rem] font-bold mt-5 text-2xl">
          Harsh Invoicer
        </div>
        <br></br>
        <InvoiceForm handleAddInvoice={handleAddInvoice} fields={fields} />
      </div>{" "}
      <div className="w-full flex flex-col gap-5 bg-slate-200 rounded-lg shadow-lg justify-center py-2">
        <h1 className="text-center text-gray-800 font-sans text-[2.5rem] font-bold text-2xl">
          Invoices
        </h1>
        {invoices.length > 0 && (
          <InvoiceGrid
            invoices={invoices}
            setInvoices={setInvoices}
            fields={fields}
          />
        )}
      </div>
    </div>
  );
}

export default App;
