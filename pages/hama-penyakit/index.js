/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import Content from "../../components/Content";
import Footer from "../../components/Footer";

const HamaPenyakit = () => {
  return (
    <Content title="Hama & Penyakit">
      <div className="w-full px-6 py-2 mx-auto">
        <div className="flex-none w-full max-w-full px-3">
          <div className="flex justify-end items-center px-4 mb-4">
            <Link href="/hama-penyakit/tambah">
              <button
                type="button"
                className="inline-block px-6 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-size-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-sky-500 text-sky-500 hover:border-sky-500 hover:bg-transparent hover:text-sky-500 hover:opacity-75 hover:shadow-none active:bg-sky-500 active:text-white active:hover:bg-transparent active:hover:text-sky-500"
              >
                Tambah
              </button>
            </Link>
          </div>
          <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
            <div className="p-4 pb-0 mb-0 bg-white rounded-t-2xl">
              <h6 className="mb-1">Data Hama & Penyakit</h6>
            </div>
            <div className="flex-auto p-4">
              <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12">
                  <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                    <div className="relative">
                      <a className="block shadow-xl rounded-2xl">
                        <img
                          src="../assets/img/home-decor-1.jpg"
                          alt="img-blur-shadow"
                          className="max-w-full shadow-soft-2xl rounded-2xl"
                        />
                      </a>
                    </div>
                    <div className="flex-auto px-1 pt-6">
                      <a>
                        <h5>Modern</h5>
                      </a>
                      <p className="mb-6 leading-normal text-size-sm">
                        As Uber works through a huge amount of internal
                        management turmoil.
                      </p>
                    </div>
                    <div className="flex flex-row justify-center items-center space-x-2">
                      <Link href={`/hama-penyakit/621236716ab/ubah`}>
                        <button
                          type="button"
                          className="inline-block px-6 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-size-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-orange-500 text-orange-500 hover:border-orange-500 hover:bg-transparent hover:text-orange-500 hover:opacity-75 hover:shadow-none active:bg-orange-500 active:text-white active:hover:bg-transparent active:hover:text-orange-500"
                        >
                          Ubah
                        </button>
                      </Link>
                      <button
                        type="button"
                        className="inline-block px-6 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-size-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer auth={false} />
      </div>
    </Content>
  );
};

export default HamaPenyakit;
