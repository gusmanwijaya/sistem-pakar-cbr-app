/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import jwtDecode from "jwt-decode";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Content from "../../components/Content";
import Footer from "../../components/Footer";
import Pagination from "../../components/Pagination";
import { fetchAllGejala, setPage } from "../../redux/gejala/actions";
import { destroy } from "../../services/gejala";

const Gejala = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { allData, page, total_page } = useSelector(
    (state) => state.gejalaReducers
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
          dispatch(fetchAllGejala());
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
    dispatch(fetchAllGejala());
  }, [dispatch, page]);

  return (
    <>
      <Head>
        <title>
          Gejala - Sistem Pakar Identifikasi Tanaman Kakao Menggunakan Metode
          CBR dan KNN
        </title>
      </Head>
      <Content>
        <div className="w-full px-6 py-6 mx-auto">
          {allData.length > 0 ? (
            <>
              <div className="flex justify-end items-center px-4 mb-4">
                <button
                  onClick={() => router.replace("/gejala/tambah")}
                  type="button"
                  className="inline-block px-6 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-size-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-sky-500 text-sky-500 hover:border-sky-500 hover:bg-transparent hover:text-sky-500 hover:opacity-75 hover:shadow-none active:bg-sky-500 active:text-white active:hover:bg-transparent active:hover:text-sky-500"
                >
                  Tambah
                </button>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="flex-none w-full max-w-full px-3">
                  <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                    <div className="flex-auto px-0 pt-0 pb-2">
                      <div className="p-0 overflow-x-auto">
                        <table className="items-center w-full mb-0 align-top border-slate-200 text-slate-500">
                          <thead className="align-bottom">
                            <tr>
                              <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-slate-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                Kode
                              </th>
                              <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-slate-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                Nama
                              </th>
                              <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-slate-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                                Bobot
                              </th>
                              <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-slate-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {allData.map((value, index) => (
                              <tr key={index}>
                                <td className="p-2 align-middle bg-transparent border-b shadow-transparent">
                                  <p className="mb-0 font-semibold leading-tight text-size-xs px-4">
                                    {value?.kode}
                                  </p>
                                </td>
                                <td className="p-2 align-middle bg-transparent border-b shadow-transparent max-w-md">
                                  <p className="mb-0 font-semibold leading-tight text-size-xs">
                                    {value?.nama}
                                  </p>
                                </td>
                                <td className="p-2 align-middle bg-transparent border-b shadow-transparent">
                                  <p className="mb-0 font-semibold leading-tight text-size-xs">
                                    {value?.bobot}
                                  </p>
                                </td>
                                <td className="p-2 align-middle bg-transparent border-b shadow-transparent">
                                  <div className="flex flex-row justify-center items-center space-x-3">
                                    <button
                                      onClick={() =>
                                        router.replace(
                                          `/gejala/${value?._id}/ubah`
                                        )
                                      }
                                      type="button"
                                      className="font-semibold leading-tight text-size-xs text-orange-400"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                        />
                                      </svg>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDelete(value?._id)}
                                      className="font-semibold leading-tight text-size-xs text-fuchsia-400"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Pagination
                      page={page}
                      handleNext={handleNext}
                      handlePrevious={handlePrevious}
                      disabledPrevious={page <= 1 ? true : false}
                      disabledNext={page === total_page ? true : false}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <img
                src="/assets/img/empty.svg"
                alt="Empty"
                className="w-1/2 h-1/2 object-cover"
              />
              <p className="font-bold text-transparent bg-gradient-cyan bg-clip-text mb-4">
                Oops, nampaknya data masih kosong!
              </p>
              <button
                onClick={() => router.replace("/gejala/tambah")}
                type="button"
                className="inline-block px-6 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-size-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-sky-500 text-sky-500 hover:border-sky-500 hover:bg-transparent hover:text-sky-500 hover:opacity-75 hover:shadow-none active:bg-sky-500 active:text-white active:hover:bg-transparent active:hover:text-sky-500"
              >
                Tambah
              </button>
            </div>
          )}
          <Footer auth={false} />
        </div>
      </Content>
    </>
  );
};

export default Gejala;

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
  if (users?.role !== "pakar")
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };

  return {
    props: {},
  };
}
