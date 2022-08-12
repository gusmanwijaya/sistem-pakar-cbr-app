/* eslint-disable @next/next/no-img-element */
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Content from "../components/Content";
import Footer from "../components/Footer";
import { getPertanyaan, processIdentifikasi } from "../services/identifikasi";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Head from "next/head";

const Identifikasi = ({ dataPertanyaan }) => {
  const router = useRouter();

  const [checkboxValue, setCheckboxValue] = useState([]);

  const handleChange = (event) => {
    // Destructuring
    const { value, checked } = event.target;

    // Case 1 : The user checks the box
    if (checked) {
      setCheckboxValue([...checkboxValue, value]);
    }

    // Case 2  : The user unchecks the box
    else {
      setCheckboxValue(checkboxValue.filter((result) => result !== value));
    }
  };

  const handleProses = async () => {
    if (checkboxValue.length > 0) {
      const form = {
        idSelectedGejala: JSON.stringify(checkboxValue),
      };
      const response = await processIdentifikasi(form);
      if (response?.data?.statusCode === 201) {
        Cookies.set("process", true);
        localStorage.setItem("process", JSON.stringify(response?.data?.data));
        router.replace("/hasil-identifikasi");
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: `${
            response?.data?.message || "Berhasil melakukan identifikasi!"
          }`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response?.data?.message || "Nampaknya terjadi kesalahan!"}`,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Silahkan pilih gejala yang Anda alami",
      });
    }
  };

  useEffect(() => {
    Cookies.remove("process");
    localStorage.clear();
  }, []);

  return (
    <>
      <Head>
        <title>
          Identifikasi - Sistem Pakar Identifikasi Tanaman Kakao Menggunakan
          Metode CBR dan KNN
        </title>
      </Head>
      <Content>
        {dataPertanyaan.length > 0 ? (
          <>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg mx-10">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-400">
                  <tr>
                    <th scope="col" className="p-4"></th>
                    <th scope="col" className="py-3 px-6 text-center">
                      Silahkan pilih gejala yang Anda alami
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataPertanyaan.map((value, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4 w-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            name="idSelectedGejala"
                            onChange={(event) => handleChange(event)}
                            value={value?._id}
                          />
                          <label
                            htmlFor="checkbox-table-search-1"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {value?.nama || "-"}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mx-10">
              <button
                onClick={handleProses}
                type="button"
                className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-dark-gray hover:border-slate-700 hover:bg-slate-700 hover:text-white"
              >
                Proses
              </button>
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
              Oops, nampaknya pertanyaan masih kosong!
            </p>
          </div>
        )}

        <div className="py-8">
          <Footer auth={false} />
        </div>
      </Content>
    </>
  );
};

export default Identifikasi;

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

  const response = await getPertanyaan(token);

  return {
    props: {
      dataPertanyaan: response?.data?.data || [],
    },
  };
}
