/* eslint-disable @next/next/no-img-element */
import jwtDecode from "jwt-decode";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Content from "../components/Content";
import Footer from "../components/Footer";

const HasilIdentifikasi = ({ users }) => {
  const router = useRouter();
  const [payload, setPayload] = useState({
    _id: "",
    user: "",
    date: "",
    selectedGejala: [],
    allPenyakitnGejala: [],
    processData: [],
    detailPenyakit: [],
    detailSolusi: [],
    responseHasil: [],
  });
  const [toggleHasilPerhitungan, setToggleHasilPerhitungan] = useState(false);
  const API_IMAGE = process.env.NEXT_PUBLIC_API_IMAGE;
  const directory = "hama-penyakit";

  useEffect(() => {
    if (payload?._id === "") {
      const dataLocal = JSON.parse(localStorage.getItem("process"));
      setPayload({
        ...payload,
        _id: dataLocal?._id,
        user: dataLocal?.user,
        date: dataLocal?.date,
        selectedGejala: dataLocal?.selectedGejala,
        allPenyakitnGejala: dataLocal?.allPenyakitnGejala,
        processData: dataLocal?.processData,
        detailPenyakit: dataLocal?.detailPenyakit,
        detailSolusi: dataLocal?.detailSolusi,
        responseHasil: dataLocal?.responseHasil,
      });
    }
  }, [payload]);

  return (
    <>
      <Head>
        <title>
          Hasil Identifikasi - Sistem Pakar Identifikasi Tanaman Kakao
          Menggunakan Metode CBR dan KNN
        </title>
      </Head>
      <Content>
        {payload?.processData[0]?.similarity < 0.5 ? (
          <div className="flex flex-col justify-center items-center pt-[40px]">
            <img
              src="/assets/img/empty.svg"
              alt="Empty"
              className="w-1/2 h-1/2 object-cover"
            />
            <p className="text-slate-700 font-medium mt-4 mb-8 mx-[180px] text-center">
              Gejala yang dipilih tidak didapati kemiripannya terhadap basis
              kasus maka sistem pakar akan memperbaiki/mencari hasil solusi
              identifikasi yang tepat!
            </p>
            <button
              onClick={() => router.replace("/dashboard")}
              type="button"
              className="inline-block px-6 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-size-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-sky-500 text-sky-500 hover:border-sky-500 hover:bg-transparent hover:text-sky-500 hover:opacity-75 hover:shadow-none active:bg-sky-500 active:text-white active:hover:bg-transparent active:hover:text-sky-500"
            >
              Dashboard
            </button>
          </div>
        ) : (
          <div className="mx-10">
            <div
              className="p-4 mb-8 border border-blue-300 rounded-lg bg-blue-50 dark:bg-blue-300"
              role="alert"
            >
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 mr-2 text-blue-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Info</span>
                <h3 className="text-lg font-medium text-blue-900">
                  Hasil identifikasi dengan metode CBR & KNN
                </h3>
              </div>
              <div className="mt-2 mb-4 text-sm text-blue-900">
                Menurut hasil analisa, Anda terserang : <br />{" "}
                <span className="font-bold uppercase">
                  {payload?.detailPenyakit?.map((value, index) => (
                    <div key={index}>
                      - {value?.nama}
                      <br />
                    </div>
                  ))}
                </span>{" "}
                {payload?.processData[0]?.similarity > 0.5 && (
                  <p className="mt-3">
                    Dengan nilai analisa sebesar :{" "}
                    <span className="font-bold uppercase">
                      {payload?.processData[0]?.similarityPersen}
                    </span>
                  </p>
                )}
              </div>
              <div className="mt-2 mb-4 text-sm text-blue-900">
                {payload?.detailPenyakit?.map((valueDetailPenyakit, index) => (
                  <div key={index}>
                    {valueDetailPenyakit?.foto && (
                      <div>
                        Gambar dari{" "}
                        <span className="font-bold uppercase">
                          {valueDetailPenyakit?.nama}
                        </span>{" "}
                        <img
                          src={`${API_IMAGE}/${directory}/${valueDetailPenyakit?.foto}`}
                          alt="Detail Penyakit"
                          className="object-cover my-3 rounded-xl w-44 h-w-44"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-2 mb-4 text-sm text-blue-900">
                {payload?.responseHasil?.map(
                  (valueResponseHasil, indexResponse) => (
                    <div key={indexResponse}>
                      Solusi{" "}
                      <span className="font-bold uppercase">
                        {valueResponseHasil?.hamaPenyakit?.nama}
                      </span>{" "}
                      : <br />
                      <div>
                        {valueResponseHasil?.solusi?.map(
                          (valueSolusi, index) => (
                            <span key={index} className="font-bold uppercase">
                              {index + 1}. {valueSolusi?.kode} -{" "}
                              {valueSolusi?.solusi}
                              <br />
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="flex justify-between">
                {users?.role === "pakar" && (
                  <button
                    onClick={() =>
                      setToggleHasilPerhitungan(!toggleHasilPerhitungan)
                    }
                    type="button"
                    className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-800 dark:hover:bg-blue-900"
                  >
                    <svg
                      aria-hidden="true"
                      className="-ml-0.5 mr-2 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Hasil perhitungan
                  </button>
                )}
                <p className="text-sm italic text-slate-400">{payload?.date}</p>
              </div>
            </div>

            <div
              className={
                !toggleHasilPerhitungan
                  ? "hidden transform transition-all ease-in duration-500"
                  : "block transform transition-all ease-in duration-500"
              }
            >
              {payload?.processData?.length > 0 && (
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-8">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-base font-semibold text-center text-slate-900 bg-white dark:text-white dark:bg-slate-800">
                      Hasil Perhitungan
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="py-3 px-6">
                          No
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Nama Penyakit
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Hasil (Dalam Persen)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {payload?.processData?.map((value, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {index + 1}
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {value?.hamaPenyakit}
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {value?.similarityPersen}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {payload?.selectedGejala?.length > 0 && (
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-8">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-base font-semibold text-center text-slate-900 bg-white dark:text-white dark:bg-slate-800">
                      Gejala Yang Dipilih
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="py-3 px-6">
                          No
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Kode
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Nama Gejala
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {payload?.selectedGejala?.map((value, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {index + 1}
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {value?.kode}
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-900 max-w-md dark:text-white">
                            {value?.nama}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {payload?.allPenyakitnGejala.length > 0 && (
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-8">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-base font-semibold text-center text-slate-900 bg-white dark:text-white dark:bg-slate-800">
                      Basis Kasus
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="py-3 px-6">
                          No
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Penyakit
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Gejala
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {payload?.allPenyakitnGejala.map((value, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="py-4 px-6 font-medium text-gray-900 dark:text-white align-text-top">
                            {index + 1}
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-900 dark:text-white align-text-top">
                            {value?.hamaPenyakit?.nama}
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-900 max-w-xl dark:text-white">
                            {value?.gejala.length > 0 &&
                              value?.gejala.map((valGejala, indexValGejala) => (
                                <p key={indexValGejala} className="border-b">
                                  {valGejala?.nama}
                                </p>
                              ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {payload?.allPenyakitnGejala.length > 0 && (
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-8">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-base font-semibold text-center text-slate-900 bg-white dark:text-white dark:bg-slate-800">
                      Case Memory
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="py-3 px-6">
                          Kasus
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Kasus Baru
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Kasus Lama
                        </th>
                        <th scope="col" className="py-3 px-6">
                          F(T/Si)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {payload?.allPenyakitnGejala.map((value, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="py-4 px-6 font-medium text-gray-900 dark:text-white align-text-top">
                            KB-{value?.hamaPenyakit?.kode}
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-900 dark:text-white align-text-top">
                            {payload?.selectedGejala?.length > 0 &&
                              payload?.selectedGejala?.map(
                                (valueSelectedGejala, indexSelectedGejala) => (
                                  <p
                                    key={indexSelectedGejala}
                                    className="border-b"
                                  >
                                    {valueSelectedGejala?.nama || "-"}
                                  </p>
                                )
                              )}
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-900 dark:text-white align-text-top">
                            {value?.gejala?.length > 0 &&
                              value?.gejala?.map((valueGejala, indexGejala) => (
                                <p key={indexGejala} className="border-b">
                                  {valueGejala?.nama || "-"}{" "}
                                  <strong>({valueGejala?.bobot})</strong>
                                </p>
                              ))}
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-900 dark:text-white align-text-top">
                            {value?.gejala?.length > 0 &&
                              value?.gejala?.map((valueGejala, indexGejala) => (
                                <p key={indexGejala} className="border-b">
                                  {payload?.selectedGejala?.length > 0 &&
                                  payload?.selectedGejala
                                    ?.map((valueSelectedGejala) =>
                                      valueSelectedGejala?._id ===
                                      valueGejala?._id
                                        ? 1
                                        : 0
                                    )
                                    ?.includes(1)
                                    ? 1
                                    : 0}
                                </p>
                              ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {payload?.processData.length > 0 && (
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-8">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-base font-semibold text-center text-slate-900 bg-white dark:text-white dark:bg-slate-800">
                      Hasil Perhitungan Similarity Value
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="py-3 px-6">
                          No
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Kasus
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Jumlah Gejala Sama
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Jumlah Gejala Kasus
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Jumlah Gejala Dipilih
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Bobot Gejala Sama
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Bobot Gejala Kasus
                        </th>
                        <th scope="col" className="py-3 px-6">
                          Hasil
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {payload?.processData.map((value, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {index + 1}
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {value?.hamaPenyakit}
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {value?.jumlahGejalaSama}
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {value?.jumlahGejalaKasus}
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {value?.jumlahGejalaDipilih}
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {value?.bobotGejalaSama}
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {value?.bobotGejalaKasus}
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {value?.similarity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="pb-10">
              <Footer auth={false} />
            </div>
          </div>
        )}
      </Content>
    </>
  );
};

export default HasilIdentifikasi;

export async function getServerSideProps({ req }) {
  const { token, process } = req.cookies;
  if (!token)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  if (!process)
    return {
      redirect: {
        destination: "/identifikasi",
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
