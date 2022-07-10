import React from "react";

const Pagination = ({
  page,
  handlePrevious,
  handleNext,
  disabledPrevious,
  disabledNext,
}) => {
  return (
    <div className="btn-group">
      <button
        className="inline-block px-6 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-size-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft text-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500 disabled:cursor-not-allowed"
        onClick={handlePrevious}
        disabled={disabledPrevious}
      >
        «
      </button>
      <button className="inline-block px-6 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-size-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500">
        Page {page}
      </button>
      <button
        className="inline-block px-6 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-size-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft text-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500 disabled:cursor-not-allowed"
        onClick={handleNext}
        disabled={disabledNext}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
