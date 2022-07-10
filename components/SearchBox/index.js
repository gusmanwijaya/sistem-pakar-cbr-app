import React from "react";

const SearchBox = ({ placeholder, onChange }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-slate-500 dark:text-slate-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <input
        onChange={(event) => onChange(event)}
        name="search-box"
        type="text"
        id="search-box"
        className="bg-transparent border border-fuchsia-500 text-slate-500 text-sm rounded-lg block w-80 pl-10 p-2.5"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBox;
