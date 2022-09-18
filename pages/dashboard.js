/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import jwtDecode from "jwt-decode";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Content from "../components/Content";
import Footer from "../components/Footer";
import {
  fetchRiwayatIdentifikasi,
  setPage,
} from "../redux/identifikasi/actions";
import { getAll } from "../services/dashboard";
import { destroy } from "../services/identifikasi";

const Dashboard = ({ data, users }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { allData, total_page, page, total_data } = useSelector(
    (state) => state.identifikasiReducers
  );

  const handlePrevious = () => {
    dispatch(setPage(page <= 1 ? 1 : page - 1));
  };

  const handleNext = () => {
    dispatch(setPage(page === total_page ? total_page : page + 1));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus data?",
      text: "Data yang telah dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#cb0c9f",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await destroy(id);
        if (response?.data?.statusCode === 200) {
          Swal.fire({
            icon: "success",
            title: "Sukses",
            text: `${response?.data?.message || "Berhasil menghapus data!"}`,
          });
          dispatch(
            fetchRiwayatIdentifikasi(users?.role === "petani" ? users?._id : "")
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${
              response?.data?.message || "Nampaknya terjadi kesalahan!"
            }`,
          });
        }
      }
    });
  };

  useEffect(() => {
    dispatch(
      fetchRiwayatIdentifikasi(users?.role === "petani" ? users?._id : "")
    );
  }, [dispatch, users?._id, users?.role, page]);

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
                            src="/assets/img/3.jpeg"
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
                  style={{ backgroundImage: `url('/assets/img/1.jpeg')` }}
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
                    <p className="text-white">
                      Jika ingin konsultasi lebih lanjut hubungi email ini :{" "}
                      <br />
                      <a href="mailto:agustinzarkani@gmail.com">
                        agustinzarkani@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {total_data > 0 && (
              <div className="w-full max-w-full px-3 my-6">
                <div className="border-black/12.5 shadow-soft-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                  <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
                    <h6>Riwayat Identifikasi</h6>
                    <p className="mb-0 leading-normal text-size-sm">
                      <i className="fa fa-check text-cyan-500"></i>
                      Pengguna sudah menggunakan sistem sebanyak
                      <span className="ml-1 font-semibold">
                        {total_data} kali
                      </span>
                    </p>
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
                              Hasil Penyakit
                            </th>
                            <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-size-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                              Nilai Similarity
                            </th>
                            <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-size-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {allData.map((value, index) => (
                            <tr key={index}>
                              <td className="p-2 leading-normal text-center align-middle bg-transparent text-size-sm whitespace-nowrap">
                                <span className="font-semibold leading-tight text-size-xs">
                                  {value?.user?.nama}
                                </span>
                              </td>
                              <td className="p-2 leading-normal text-center align-middle bg-transparent text-size-sm whitespace-nowrap">
                                <span className="font-semibold leading-tight text-size-xs">
                                  {value?.date}
                                </span>
                              </td>
                              <td className="p-2 leading-normal text-center align-middle bg-transparent text-size-sm whitespace-nowrap">
                                <span className="font-semibold leading-tight text-size-xs">
                                  {value?.detailPenyakit?.nama}
                                </span>
                              </td>
                              <td className="p-2 leading-normal text-center align-middle bg-transparent text-size-sm whitespace-nowrap">
                                <span className="font-semibold leading-tight text-size-xs">
                                  {value?.processData[0]?.similarityPersen}
                                </span>
                              </td>
                              <td className="leading-normal text-center align-middle bg-transparent text-size-sm whitespace-nowrap">
                                <div className="flex flex-row space-x-2 justify-center items-center">
                                  <button
                                    onClick={() =>
                                      router.replace(
                                        `/riwayat-identifikasi/detail/${value?._id}`
                                      )
                                    }
                                    type="button"
                                    className="font-semibold leading-tight text-size-xs text-blue-500"
                                  >
                                    Detail
                                  </button>
                                  {users?.role === "pakar" && (
                                    <button
                                      onClick={() => handleDelete(value?._id)}
                                      type="button"
                                      className="font-semibold leading-tight text-size-xs text-red-500"
                                    >
                                      Hapus
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center mt-4">
                  <span className="text-sm text-gray-700 dark:text-gray-400">
                    Page{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {page}
                    </span>{" "}
                    dari{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {total_page}
                    </span>
                  </span>
                  <div className="inline-flex mt-2 xs:mt-0">
                    <button
                      onClick={handlePrevious}
                      type="button"
                      className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <svg
                        aria-hidden="true"
                        className="mr-2 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Prev
                    </button>
                    <button
                      onClick={handleNext}
                      type="button"
                      className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Next
                      <svg
                        aria-hidden="true"
                        className="ml-2 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
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

  const users = jwtDecode(token);
  if (users?.role !== "pakar" && users?.role !== "petani")
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };

  const response = await getAll(token);

  return {
    props: {
      users,
      data: response?.data?.data || {},
    },
  };
}
