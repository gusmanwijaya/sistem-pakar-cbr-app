/* eslint-disable @next/next/no-img-element */
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Content from "../../components/Content";
import Footer from "../../components/Footer";
import { create } from "../../services/basis-kasus";
import { MultiSelect } from "react-multi-select-component";
import { getForSelect as getForSelectHamaPenyakit } from "../../services/hama-penyakit";
import { getForSelect as getForSelectGejala } from "../../services/gejala";
import Head from "next/head";

const Tambah = ({ dataHamaPenyakit, dataGejala }) => {
  const router = useRouter();

  let _tempForOptionsGejala = [];

  for (let index = 0; index < dataGejala.length; index++) {
    const element = dataGejala[index];
    _tempForOptionsGejala.push({
      label: `${element?.kode} - ${element?.nama}`,
      value: element?._id,
    });
  }

  const optionsGejala = _tempForOptionsGejala;

  const [form, setForm] = useState({
    hamaPenyakit: "",
    gejala: "[]",
  });
  const [showValueGejala, setShowValueGejala] = useState([]);

  const handleMultipleSelectGejala = (data) => {
    setShowValueGejala(data);
    let _tempGejala = [];

    if (data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        _tempGejala.push(element?.value);
      }

      if (_tempGejala.length > 0) {
        setForm({ ...form, gejala: JSON.stringify(_tempGejala) });
      }
    } else {
      setForm({ ...form, gejala: "[]" });
    }
  };

  const handleSimpan = async () => {
    if (form?.hamaPenyakit !== "" && form?.gejala !== "[]") {
      const response = await create(form);
      if (response?.data?.statusCode === 201) {
        router.replace("/basis-kasus");
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: `${response?.data?.message || "Berhasil menambahkan data!"}`,
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
        text: `Silahkan isi form yang ada.`,
      });
    }
  };

  return (
    <>
      <Head>
        <title>
          Tambah Basis Kasus - Sistem Pakar Identifikasi Tanaman Kakao
          Menggunakan Metode CBR dan KNN
        </title>
      </Head>
      <Content>
        <div className="container pb-6">
          <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0">
            <Link href="/basis-kasus">
              <button type="button" className="my-4 mx-2 space-x-1">
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
            </Link>
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-6">
                <div className="mb-4">
                  <label
                    htmlFor="hamaPenyakit"
                    className="block text-sm font-medium text-slate-400 mb-2"
                  >
                    Hama & Penyakit
                  </label>
                  <select
                    name="hamaPenyakit"
                    className="text-size-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    onChange={(event) =>
                      setForm({ ...form, hamaPenyakit: event.target.value })
                    }
                  >
                    <option value="">-Pilih-</option>
                    {dataHamaPenyakit.length > 0 &&
                      dataHamaPenyakit.map((value, index) => (
                        <option key={index} value={value?._id}>
                          {value?.kode} - {value?.nama}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="gejala"
                    className="block text-sm font-medium text-slate-400 mb-2"
                  >
                    Gejala
                  </label>
                  <MultiSelect
                    options={optionsGejala}
                    value={showValueGejala}
                    onChange={(event) => handleMultipleSelectGejala(event)}
                    labelledBy="Pilih"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleSimpan}
                    className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-dark-gray hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                  >
                    Tambah
                  </button>
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

export default Tambah;

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

  const responseHamaPenyakit = await getForSelectHamaPenyakit(token);
  const responseGejala = await getForSelectGejala(token);

  return {
    props: {
      dataHamaPenyakit: responseHamaPenyakit?.data?.data || [],
      dataGejala: responseGejala?.data?.data || [],
    },
  };
}
