/* eslint-disable @next/next/no-img-element */
import jwtDecode from "jwt-decode";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Content from "../../../components/Content";
import Footer from "../../../components/Footer";
import { getOne } from "../../../services/kasus-baru";

const Detail = ({ oneData, users }) => {
  const router = useRouter();
  const API_IMAGE = process.env.NEXT_PUBLIC_API_IMAGE;
  const directory = "hama-penyakit";

  return (
    <>
      <Head>
        <title>
          Detail Basis Baru - Sistem Pakar Identifikasi Tanaman Kakao
          Menggunakan Metode CBR dan KNN
        </title>
      </Head>
      <Content>
        <div className="mx-10">
          <button
            onClick={() => router.replace("/kasus-baru")}
            type="button"
            className="my-4 mx-2 space-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs">Kembali</span>
          </button>

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
                Detail riwayat identifikasi dengan metode CBR & KNN
              </h3>
            </div>

            <div className="mt-2 mb-4 text-sm text-blue-900">
              Menurut hasil analisa, Anda terserang : <br />{" "}
              <span className="font-bold uppercase">
                {oneData?.detailPenyakit?.map((value, index) => (
                  <div key={index}>
                    - {value?.nama}
                    <br />
                  </div>
                ))}
              </span>{" "}
              <p className="mt-3">
                Dengan nilai analisa sebesar :{" "}
                <span className="font-bold uppercase">
                  {oneData?.processData[0]?.similarityPersen}
                </span>
              </p>
            </div>
            <div className="mt-2 mb-4 text-sm text-blue-900">
              {oneData?.detailPenyakit?.map((valueDetailPenyakit, index) => (
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
              <div>
                Solusi : <br />
                <div>
                  {oneData?.detailSolusi?.map((valueSolusi, index) => (
                    <span key={index} className="font-bold uppercase">
                      {index + 1}. {valueSolusi?.kode} - {valueSolusi?.solusi}
                      <br />
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <p className="text-sm italic text-slate-400">{oneData?.date}</p>
            </div>
          </div>

          {oneData?.selectedGejala.length > 0 && (
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
                  {oneData?.selectedGejala.map((value, index) => (
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

          {users?.role === "pakar" && (
            <>
              {oneData?.allPenyakitnGejala.length > 0 && (
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
                      {oneData?.allPenyakitnGejala.map((value, index) => (
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

              {oneData?.allPenyakitnGejala.length > 0 && (
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
                      {oneData?.allPenyakitnGejala.map((value, index) => (
                        <tr
                          key={index}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="py-4 px-6 font-medium text-gray-900 dark:text-white align-text-top">
                            KB-{value?.hamaPenyakit?.kode}
                          </td>
                          <td className="py-4 px-6 font-medium text-gray-900 dark:text-white align-text-top">
                            {oneData?.selectedGejala?.length > 0 &&
                              oneData?.selectedGejala?.map(
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
                                  {oneData?.selectedGejala?.length > 0 &&
                                  oneData?.selectedGejala
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

              {oneData?.processData.length > 0 && (
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
                      {oneData?.processData.map((value, index) => (
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
            </>
          )}

          <div className="pb-10">
            <Footer auth={false} />
          </div>
        </div>
      </Content>
    </>
  );
};

export default Detail;

export async function getServerSideProps({ req, params }) {
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

  const response = await getOne(params?.id, token);

  return {
    props: {
      oneData: response?.data?.data || {},
      users,
    },
  };
}
