/* eslint-disable @next/next/no-img-element */
import React from "react";
import Content from "../components/Content";
import Footer from "../components/Footer";

const Gejala = () => {
  return (
    <Content title="Gejala">
      <div className="w-full px-6 py-6 mx-auto">
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <div className="flex justify-end px-4">
                  <a className="font-semibold leading-tight text-size-xs text-sky-400">
                    Tambah
                  </a>
                </div>
                <h6>Data Gejala</h6>
              </div>
              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead className="align-bottom">
                      <tr>
                        <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Kode
                        </th>
                        <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Nama
                        </th>
                        <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Bobot
                        </th>
                        <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <p className="mb-0 font-semibold leading-tight text-size-xs px-4">
                            G1
                          </p>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <p className="mb-0 font-semibold leading-tight text-size-xs">
                            Nama gejala
                          </p>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <p className="mb-0 font-semibold leading-tight text-size-xs">
                            3
                          </p>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <div className="flex flex-row justify-center items-center space-x-3">
                            <a className="font-semibold leading-tight text-size-xs text-orange-400">
                              Edit
                            </a>
                            <a className="font-semibold leading-tight text-size-xs text-fuchsia-400">
                              Hapus
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

export default Gejala;
