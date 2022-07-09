/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";

const Navbar = ({ title }) => {
  return (
    <nav
      className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start"
      navbar-scroll="true"
    >
      <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
        <nav>
          <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
            <li className="leading-normal text-size-sm">
              <a className="opacity-50 text-slate-700">Pages</a>
            </li>
            <li className="text-size-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']">
              {title}
            </li>
          </ol>
          <h6 className="mb-0 font-bold capitalize">{title}</h6>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
