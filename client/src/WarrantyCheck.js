import React, { useEffect, useState } from 'react';
import axios from 'axios';


import WarrantySearch from './components/WarrantySearch';
import ResultDisplay from './components/ResultDisplay';

const WarrantyCheck = () => {

  const [regNo, setRegNo] = useState('');
  const [brand, setBrand] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  

  const handleSearch = async () => {
    setError('');
    setResult(null);

    if (!regNo || !brand) {
      setError('Please enter both Registration Number and Brand.');
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/warranty?regNo=${regNo}&brand=${brand}`
      );
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching warranty data.');
    }
  };

  
  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg text-white font-sans">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        🔍 OneWarranty
      </h2>

      <WarrantySearch
        regNo={regNo}
        setRegNo={setRegNo}
        brand={brand}
        setBrand={setBrand}
        handleSearch={handleSearch}
        error={error}
      />

      <ResultDisplay result={result} />
    </div>
  );
};

export default WarrantyCheck;
