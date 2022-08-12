import React from "react";
import Sidebar from "../Sidebar";

const Content = ({ title, children }) => {
  return (
    <>
      <div className="m-0 font-sans antialiased font-normal text-size-base leading-default bg-gray-50 text-slate-500">
        <Sidebar />
        <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200 py-8">
          {children}
        </main>
      </div>
    </>
  );
};

export default Content;
