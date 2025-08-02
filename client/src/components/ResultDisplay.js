import React from 'react';

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  return (
    <div className="bg-gray-800 rounded-md p-6 shadow-inner mt-6 text-white">
      <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        📋 Warranty Details
      </h3>
      <p className="mb-2">
        <span className="font-semibold">Reg No:</span> {result.regNo}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Brand:</span> {result.brand}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Model:</span> {result.model}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Purchase Date:</span>{' '}
        {new Date(result.purchaseDate).toLocaleDateString()}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Warranty Expires On:</span>{' '}
        {new Date(result.warrantyExpiresOn).toLocaleDateString()}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Status:</span>{' '}
        <span
          className={
            result.isExpired ? 'text-red-500 font-bold' : 'text-green-400 font-bold'
          }
        >
          {result.isExpired ? 'Expired' : 'Active'}
        </span>
      </p>
    </div>
  );
};

export default ResultDisplay;
