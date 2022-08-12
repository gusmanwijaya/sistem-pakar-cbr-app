/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import React from "react";
import Content from "../components/Content";
import Footer from "../components/Footer";
import { getAll } from "../services/dashboard";

const Dashboard = ({ data }) => {
  return (
    <>
      <Head>
        <title>
          Dashboard - Sistem Pakar Identifikasi Tanaman Kakao Menggunakan Metode
          CBR dan KNN
        </title>
      </Head>
      <Content>
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
                          Basis Kasus
                        </p>
                        <h5 className="mb-0 font-bold">
                          {data?.basisPengetahuan}{" "}
                          <span className="text-xs">data</span>
                        </h5>
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

          <Footer auth={false} />
        </div>
      </Content>
    </>
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
