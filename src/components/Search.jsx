import React, { useState } from "react";
import SearchIcon from "./SearchIcon";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <form className="flex mt-5 w-full relative" onSubmit={(e) => e.preventDefault()}>
      <input
        className="border p-2 rounded-lg w-full pr-10"
        placeholder="Search Song, Artist"
        value={query}
        onChange={handleInputChange}
      />
      <label className="absolute right-0 pt-2 pr-2">
        <SearchIcon />
      </label>
    </form>
  );
};

export default Search;