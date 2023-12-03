import React from "react";

const SearchInput = ({ searchTerm, handleSearchTerm }) => {
  return (
    <input
      className="p-2 border border-gray-300 rounded-md"
      type="text"
      placeholder="검색"
      onChange={handleSearchTerm}
      value={searchTerm}
    />
  );
};

export default SearchInput;
