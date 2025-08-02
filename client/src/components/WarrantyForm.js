import React, { useState } from 'react';

function WarrantyForm({ onSubmit }) {
  const [productName, setProductName] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [warrantyPeriod, setWarrantyPeriod] = useState(''); // in months or years
  const [serialNumber, setSerialNumber] = useState('');
  const [errors, setErrors] = useState({});

  // Simple validation function
  const validate = () => {
    const newErrors = {};
    if (!productName.trim()) newErrors.productName = 'Product name is required';
    if (!purchaseDate) newErrors.purchaseDate = 'Purchase date is required';
    if (!warrantyPeriod.trim()) newErrors.warrantyPeriod = 'Warranty period is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    // Send form data to parent or API
    onSubmit({
      productName,
      purchaseDate,
      warrantyPeriod,
      serialNumber,
    });

    // Clear form
    setProductName('');
    setPurchaseDate('');
    setWarrantyPeriod('');
    setSerialNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Warranty Details</h2>

      <div className="mb-4">
        <label className="block font-semibold mb-1" htmlFor="productName">Product Name *</label>
        <input
          id="productName"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className={`w-full px-3 py-2 border rounded ${errors.productName ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="e.g., Samsung TV"
        />
        {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1" htmlFor="purchaseDate">Purchase Date *</label>
        <input
          id="purchaseDate"
          type="date"
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}
          className={`w-full px-3 py-2 border rounded ${errors.purchaseDate ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.purchaseDate && <p className="text-red-500 text-sm mt-1">{errors.purchaseDate}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1" htmlFor="warrantyPeriod">Warranty Period *</label>
        <input
          id="warrantyPeriod"
          type="text"
          value={warrantyPeriod}
          onChange={(e) => setWarrantyPeriod(e.target.value)}
          className={`w-full px-3 py-2 border rounded ${errors.warrantyPeriod ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="e.g., 1 year, 12 months"
        />
        {errors.warrantyPeriod && <p className="text-red-500 text-sm mt-1">{errors.warrantyPeriod}</p>}
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-1" htmlFor="serialNumber">Serial Number (optional)</label>
        <input
          id="serialNumber"
          type="text"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="Enter serial number"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition"
      >
        Submit
      </button>
    </form>
  );
}

export default WarrantyForm;
