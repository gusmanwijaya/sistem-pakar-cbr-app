/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Content from "../components/Content";
import Footer from "../components/Footer";
import { getAll } from "../services/dashboard";

const Dashboard = ({ data }) => {
  return (
    <Content title="Dashboard">
      <div className="w-full px-6 py-6 mx-auto">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans font-semibold leading-normal text-size-sm">
                        Hama & Penyakit
                      </p>
                      <h5 className="mb-0 font-bold">
                        {data?.hamaPenyakit}{" "}
                        <span className="text-xs">data</span>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-fuchsia">
                      <i className="ni ni-money-coins text-size-lg relative top-3.5 text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans font-semibold leading-normal text-size-sm">
                        Gejala
                      </p>
                      <h5 className="mb-0 font-bold">
                        {data?.gejala} <span className="text-xs">data</span>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-fuchsia">
                      <i className="ni ni-world text-size-lg relative top-3.5 text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans font-semibold leading-normal text-size-sm">
                        Solusi
                      </p>
                      <h5 className="mb-0 font-bold">
                        {data?.solusi} <span className="text-xs">data</span>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-fuchsia">
                      <i className="ni ni-paper-diploma text-size-lg relative top-3.5 text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-full px-3 sm:w-1/2 sm:flex-none xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                  <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p className="mb-0 font-sans font-semibold leading-normal text-size-sm">
                        Hasil Identifikasi
                      </p>
                      <h5 className="mb-0 font-bold">-</h5>
                    </div>
                  </div>
                  <div className="px-3 text-right basis-1/3">
                    <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-fuchsia">
                      <i className="ni ni-cart text-size-lg relative top-3.5 text-white"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap mt-6 -mx-3">
          <div className="w-full px-3 mb-6 lg:mb-0 lg:w-7/12 lg:flex-none">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap -mx-3">
                  <div className="max-w-full px-3 lg:w-1/2 lg:flex-none">
                    <div className="flex flex-col h-full">
                      <p className="pt-2 mb-1 font-semibold">
                        Dibuat oleh{" "}
                        <a
                          href="https://gusmanwijaya.com"
                          type="button"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          Lovida Royani
                        </a>
                      </p>
                      <h5 className="font-bold">Sistem Pakar</h5>
                      <p className="mb-12">
                        Sistem pakar untuk mengidentifikasi hama dan penyakit
                        pada tanaman kakao menggunakan metode Case Based
                        Reasoning (CBR) dan Algoritma K-Nearst Neighbor (KNN).
                      </p>
                    </div>
                  </div>
                  <div className="max-w-full px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 lg:flex-none">
                    <div className="h-full bg-gradient-fuchsia rounded-xl">
                      <img
                        src="/assets/img/shapes/waves-white.svg"
                        className="absolute top-0 hidden w-1/2 h-full lg:block"
                        alt="waves"
                      />
                      <div className="relative flex items-center justify-center h-full">
                        <img
                          className="relative z-20 w-full rounded-xl"
                          src="/assets/img/kakao.jpeg"
                          alt="rocket"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-full px-3 lg:w-5/12 lg:flex-none">
            <div className="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border p-4">
              <div
                className="relative h-full overflow-hidden bg-cover rounded-xl"
                style={{ backgroundImage: `url('/assets/img/kakao-2.jpeg')` }}
              >
                <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-dark-gray opacity-80"></span>
                <div className="relative z-10 flex flex-col flex-auto h-full p-4">
                  <h5 className="pt-2 mb-6 font-bold text-white">
                    Menu identifikasi
                  </h5>
                  <p className="text-white">
                    Silahkan pilih menu identifikasi untuk melakukan
                    identifikasi terhadap gejala yang Anda alami & hasil
                    identifikasi dapat dilihat pada menu hasil identifikasi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap my-6 -mx-3">
          <div className="w-full max-w-full px-3 mt-0 mb-6 md:mb-0 md:flex-none lg:flex-none">
            <div className="border-black/12.5 shadow-soft-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
              <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
                <div className="flex flex-wrap mt-0 -mx-3">
                  <div className="flex-none w-7/12 max-w-full px-3 mt-0 lg:w-1/2 lg:flex-none">
                    <h6>History hasil identifikasi</h6>
                    <p className="mb-0 leading-normal text-size-sm">
                      <i className="fa fa-check text-cyan-500"></i>
                      Terdapat<span className="ml-1 font-semibold">
                        30
                      </span>{" "}
                      data pengguna yang telah melakukan identifikasi.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-auto p-6 px-0 pb-2">
                <div className="overflow-x-auto">
                  <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead className="align-bottom">
                      <tr>
                        <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-size-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                          Pengguna
                        </th>
                        <th className="px-6 py-3 pl-2 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-size-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                          Tanggal
                        </th>
                        <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-size-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                          Hama & Penyakit
                        </th>
                        <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-size-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                          Gejala
                        </th>
                        <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-size-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                          Solusi
                        </th>
                        <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-size-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                          Similiarity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                          <div className="flex px-2 py-1">
                            <div>
                              <img
                                src="/assets/img/kakao.jpeg"
                                className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-size-sm h-9 w-9 rounded-xl"
                                alt="xd"
                              />
                            </div>
                            <div className="flex flex-col justify-center">
                              <h6 className="mb-0 leading-normal text-size-sm">
                                Gusman Wijaya, S.Kom
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-size-sm whitespace-nowrap">
                          <span className="font-semibold leading-tight text-size-xs">
                            10-7-2022
                          </span>
                        </td>
                        <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-size-sm whitespace-nowrap">
                          <span className="font-semibold leading-tight text-size-xs">
                            Penggerek Buah
                          </span>
                        </td>
                        <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-size-sm whitespace-nowrap">
                          <span className="font-semibold leading-tight text-size-xs">
                            G1,G2
                          </span>
                        </td>
                        <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-size-sm whitespace-nowrap">
                          <span className="font-semibold leading-tight text-size-xs">
                            S3, S24, S25
                          </span>
                        </td>
                        <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-size-sm whitespace-nowrap">
                          <span className="font-semibold leading-tight text-size-xs">
                            0.92 (92%)
                          </span>
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

export default Dashboard;

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  if (!token)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const response = await getAll(token);

  return {
    props: {
      data: response?.data?.data || {},
    },
  };
}
