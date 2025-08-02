import React, { useState } from 'react';
import allBrands from '../data/AllBrands';
import brandLinks from '../data/BrandLinks';

const ROWS = 8;
const BRANDS_PER_ROW = 23;

const SupportBrand = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBrands = allBrands.filter((brand) =>
    brand.trim().toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  // Split into chunks of 15 per row
  const chunkedBrands = [];
  for (
    let i = 0;
    i < filteredBrands.length && chunkedBrands.length < ROWS;
    i += BRANDS_PER_ROW
  ) {
    chunkedBrands.push(filteredBrands.slice(i, i + BRANDS_PER_ROW));
  }

  const isSearching = searchTerm.trim().length > 0;

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Brands We Support</h3>

          {/* Search box */}
          <div className="ml-4 w-1/2">
            <input
              type="text"
              placeholder="Search Brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
            />
          </div>
        </div>

        <br />

        {/* Animated or static rows */}
        <div className="space-y-6">
          {chunkedBrands.map((row, index) => (
            <div
              key={index}
              className={`overflow-hidden whitespace-nowrap relative w-full h-10`}
            >
              <div
                className={`inline-flex gap-6 min-w-full ${
                  isSearching
                    ? ''
                    : index % 2 === 1
                    ? 'animate-marquee-reverse'
                    : 'animate-marquee'
                }`}
              >
                
               {[ ...row].map((brand, i) => {
  const brandKey = brand.trim().toLowerCase();
  const redirectUrl = brandLinks[brandKey] || brandLinks[brand]; // fallback check

  return (
    <div
      key={`${brand}-${i}`}
      onClick={() => {
        if (redirectUrl) {
          window.open(redirectUrl, '_blank'); // opens in new tab
        } else {
          alert(`No warranty page found for ${brand}`);
        }
      }}
      className="cursor-pointer px-4 py-2 bg-gray-800 hover:bg-indigo-600 rounded-xl text-sm font-medium shadow transition hover:scale-105 hover:ring-2 hover:ring-indigo-400 "
    >
      {brand}
    </div>
  );
})}

              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default SupportBrand;
