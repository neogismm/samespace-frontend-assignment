import React, { useState } from "react";
import SearchIcon from "./SearchIcon";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex mt-5 w-full px-2 relative">
      <input
        className="p-4 rounded-lg w-full pr-10 bg-white/10"
        placeholder="Search Song, Artist"
        value={query}
        onChange={handleInputChange}
      />
      <label className="absolute right-4 bottom-4">
        <SearchIcon />
      </label>
    </div>
  );
};

export default Search;