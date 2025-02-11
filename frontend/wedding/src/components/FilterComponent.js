


import React from "react";

const FilterComponent = ({ categories, cities, onFilterChange }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg mb-6 shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Filter Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Service Type Dropdown */}
        <select
          className="p-3 bg-gray-900 border border-gray-600 rounded-lg text-white"
          onChange={(e) => onFilterChange("category", e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Location Dropdown */}
        <select
          className="p-3 bg-gray-900 border border-gray-600 rounded-lg text-white"
          onChange={(e) => onFilterChange("city", e.target.value)}
        >
          <option value="">All Cities</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* Price Range Dropdown */}
        <select
          className="p-3 bg-gray-900 border border-gray-600 rounded-lg text-white"
          onChange={(e) => onFilterChange("price", e.target.value)}
        >
          <option value="">All Price Ranges</option>
          <option value="0-500">₹0 - ₹500</option>
          <option value="500-1000">₹500 - ₹1000</option>
          <option value="1000-2000">₹1000 - ₹2000</option>
          <option value="2000-5000">₹2000 - ₹5000</option>
          <option value="5000-10000">₹5000 - ₹10000</option>
          <option value="10000-20000">₹10000 - ₹20000</option>
          <option value="20000-50000">₹20000 - ₹50000</option>
          <option value="50000-100000">₹50000 - ₹100000</option>
          <option value="100000-200000">₹100000 - ₹200000</option>
        </select>
      </div>
    </div>
  );
};

export default FilterComponent;
