/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Content from "../../components/Content";
import Footer from "../../components/Footer";
import Pagination from "../../components/Pagination";
import {
  fetchAllHamaPenyakit,
  setPage,
  setKeyword,
} from "../../redux/hama-penyakit/actions";
import { destroy } from "../../services/hama-penyakit";
import SearchBox from "../../components/SearchBox";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";

const HamaPenyakit = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const API_IMAGE = process.env.NEXT_PUBLIC_API_IMAGE;
  const directory = "hama-penyakit";

  const { allData, keyword, page, total_page } = useSelector(
    (state) => state.hamaPenyakitReducers
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
          dispatch(fetchAllHamaPenyakit());
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

  const handleChangeSearchBox = (event) => {
    dispatch(setKeyword(event.target.value));
  };

  useEffect(() => {
    dispatch(fetchAllHamaPenyakit());
  }, [dispatch, page, keyword]);

  return (
    <Content title="Hama & Penyakit">
      <div className="w-full px-6 py-2 mx-auto">
        {allData.length > 0 ? (
          <div className="flex-none w-full max-w-full px-3">
            <div className="flex justify-between items-center px-4 mb-4">
              <SearchBox
                placeholder="Hama & penyakit"
                onChange={handleChangeSearchBox}
              />
              <Link href="/hama-penyakit/tambah">
                <button
                  type="button"
                  className="inline-block px-6 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-size-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-sky-500 text-sky-500 hover:border-sky-500 hover:bg-transparent hover:text-sky-500 hover:opacity-75 hover:shadow-none active:bg-sky-500 active:text-white active:hover:bg-transparent active:hover:text-sky-500"
                >
                  Tambah
                </button>
              </Link>
            </div>
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border pb-2 pt-1">
              <div className="flex-auto p-4">
                <div className="flex flex-wrap -mx-3">
                  {allData.length > 0 &&
                    allData.map((value, index) => (
                      <div
                        key={index}
                        className="w-full max-w-full px-3 mb-6 md:w-6/12 md:flex-none xl:mb-0 xl:w-3/12"
                      >
                        <div className="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                          <div className="relative">
                            <a className="block shadow-xl rounded-2xl">
                              <img
                                src={
                                  value?.foto
                                    ? `${API_IMAGE}/${directory}/${value?.foto}`
                                    : "/assets/img/empty.svg"
                                }
                                alt="img-blur-shadow"
                                className="max-w-full object-cover object-center shadow-soft-2xl rounded-2xl"
                              />
                            </a>
                          </div>
                          <div className="flex-auto px-1 pt-6">
                            <a>
                              <h5>{value?.nama}</h5>
                            </a>
                            <p className="mb-6 leading-normal text-size-sm truncate">
                              {value?.deskripsi}
                            </p>
                          </div>
                          <div className="flex flex-row justify-center items-center space-x-2 pb-8">
                            <Link href={`/hama-penyakit/${value?._id}/detail`}>
                              <button
                                type="button"
                                className="inline-block px-2 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-size-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-lime-500 text-lime-500 hover:border-lime-500 hover:bg-transparent hover:text-lime-500 hover:opacity-75 hover:shadow-none active:bg-lime-500 active:text-white active:hover:bg-transparent active:hover:text-lime-500"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </button>
                            </Link>
                            <Link href={`/hama-penyakit/${value?._id}/ubah`}>
                              <button
                                type="button"
                                className="inline-block px-2 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-size-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-orange-500 text-orange-500 hover:border-orange-500 hover:bg-transparent hover:text-orange-500 hover:opacity-75 hover:shadow-none active:bg-orange-500 active:text-white active:hover:bg-transparent active:hover:text-orange-500"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
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
                            </Link>
                            <button
                              onClick={() => handleDelete(value?._id)}
                              type="button"
                              className="inline-block px-2 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-size-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-fuchsia-500 text-fuchsia-500 hover:border-fuchsia-500 hover:bg-transparent hover:text-fuchsia-500 hover:opacity-75 hover:shadow-none active:bg-fuchsia-500 active:text-white active:hover:bg-transparent active:hover:text-fuchsia-500"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
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
                        </div>
                      </div>
                    ))}
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
              onClick={() => router.push("/hama-penyakit/tambah")}
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
  );
};

export default HamaPenyakit;

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
