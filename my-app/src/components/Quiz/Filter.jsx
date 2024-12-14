import React from "react";

const Filters = ({ filters, setFilters }) => {
  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  return (
    <div className="p-4">
      <select
        onChange={(e) => handleFilterChange("board", e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Boards</option>
        <option value="CBSE">CBSE</option>
        <option value="RBSE">RBSE</option>
      </select>

      <select
        onChange={(e) => handleFilterChange("class", e.target.value)}
        className="p-2 border rounded ml-2"
      >
        <option value="">All Classes</option>
        <option value="10">Class 10</option>
        <option value="11">Class 11</option>
      </select>

      <select
        onChange={(e) => handleFilterChange("subject", e.target.value)}
        className="p-2 border rounded ml-2"
      >
        <option value="">All Subjects</option>
        <option value="Physics">Physics</option>
        <option value="Geography">Geography</option>
      </select>
    </div>
  );
};

export default Filters;
