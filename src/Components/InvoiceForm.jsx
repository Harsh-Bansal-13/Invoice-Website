import React from "react";
import { useState } from "react";
import { isValidData } from "../helper/functions";

function InvoiceForm({ handleAddInvoice, fields }) {
  const [formData, setFormData] = useState({
    qty: 0,
    price: 0,
    discountPercentage: 0,
    discount: 0,
    taxPercentage: 0,
    tax: 0,
    totalPrice: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidData(formData)) return;

    handleAddInvoice(formData);
    setFormData({
      qty: 0,
      price: 0,
      discountPercentage: 0,
      discount: 0,
      taxPercentage: 0,
      tax: 0,
      totalPrice: 0,
    });
  };

  const handleChange = (event) => {
    const { id, value } = event.target;

    const newFormData = { ...formData, [id]: value };

    const amount = parseFloat(newFormData.price) * parseFloat(newFormData.qty);

    const newDiscount = (
      (amount * parseFloat(newFormData.discountPercentage)) /
      100
    ).toFixed(2);

    const newTax = (
      (amount * parseFloat(newFormData.taxPercentage)) /
      100
    ).toFixed(2);

    const newTotalPrice = (
      amount -
      parseFloat(newDiscount) +
      parseFloat(newTax)
    ).toFixed(2);

    setFormData({
      ...newFormData,
      discount: newDiscount,
      tax: newTax,
      totalPrice: newTotalPrice,
    });
  };

  const backgroundColor = isValidData(formData)
    ? "bg-green-500"
    : "bg-gray-300";
  const hoverBackgroundColor = isValidData(formData)
    ? "hover:bg-green-600"
    : "hover:bg-gray-300";

  return (
    <form onSubmit={handleSubmit}>
      <div className="felx flex-col items-center justify-center p-6">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center p-6 w-full ">
          {fields.map((field) => (
            <div className="w-full flex flex-col gap-2 " key={field.accessor}>
              <label className="flex mb-1 text-gray-700 items-center ">
                {field.name}
              </label>
              <input
                id={field.accessor}
                disabled={
                  field.accessor === "totalPrice" ||
                  field.accessor === "discount" ||
                  field.accessor === "tax"
                }
                type="number"
                value={formData[field.accessor]}
                onChange={handleChange}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className={`w-full py-2 mt-4 text-white rounded-lg ${backgroundColor} ${hoverBackgroundColor}`}
        >
          Add Invoice
        </button>
      </div>
    </form>
  );
}

export default InvoiceForm;
