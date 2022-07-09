import Head from "next/head";
import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const Content = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>
          {title} - Sistem Pakar Identifikasi Tanaman Kakao Menggunakan Metode
          CBR dan KNN
        </title>
      </Head>
      <div className="m-0 font-sans antialiased font-normal text-size-base leading-default bg-gray-50 text-slate-500">
        <Sidebar />
        <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
          <Navbar title={title} />
          {children}
        </main>
      </div>
    </>
  );
};

export default Content;
