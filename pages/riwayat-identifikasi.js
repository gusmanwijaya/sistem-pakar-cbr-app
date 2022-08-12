/* eslint-disable @next/next/no-img-element */
import jwtDecode from "jwt-decode";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Content from "../components/Content";
import Footer from "../components/Footer";
import {
  fetchRiwayatIdentifikasi,
  setPage,
} from "../redux/identifikasi/actions";
import { destroy } from "../services/identifikasi";

const RiwayatIdentifikasi = ({ users }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { allData, total_page, page } = useSelector(
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
          Riwayat Identifikasi - Sistem Pakar Identifikasi Tanaman Kakao
          Menggunakan Metode CBR dan KNN
        </title>
      </Head>
      <Content>
        {allData.length > 0 ? (
          <>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg mx-10 mt-4 mb-8">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      User
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Tanggal
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Hasil Penyakit
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Nilai Similarity
                    </th>
                    {users?.role === "pakar" && (
                      <th scope="col" className="py-3 px-6"></th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {allData.map((value, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {value?.user?.nama}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {value?.date}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {value?.processData[0]?.hamaPenyakit}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {value?.processData[0]?.similarityPersen}
                      </td>
                      {users?.role === "pakar" && (
                        <td className="py-4 px-6 text-center">
                          <div className="flex justify-center items-center">
                            <button
                              onClick={() => handleDelete(value?._id)}
                              type="button"
                              className="font-medium text-red-600 dark:text-red-500"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-700 dark:text-gray-400">
                Page{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {page}
                </span>{" "}
                /{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {total_page}
                </span>
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  onClick={handlePrevious}
                  disabled={page <= 1 ? true : false}
                  type="button"
                  className={`inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    page <= 1 && "cursor-not-allowed"
                  }`}
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
                  disabled={page === total_page ? true : false}
                  type="button"
                  className={`inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    page === total_page && "cursor-not-allowed"
                  }`}
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
          </div>
        )}

        <div className="py-8 px-5">
          <Footer auth={false} />
        </div>
      </Content>
    </>
  );
};

export default RiwayatIdentifikasi;

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

  return {
    props: {
      users,
    },
  };
}
