/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import Swal from "sweetalert2";
import Content from "../../../components/Content";
import Footer from "../../../components/Footer";
import { getOne, revisi } from "../../../services/basis-baru";
import { getForSelect as getForSelectHamaPenyakit } from "../../../services/hama-penyakit";
import { getForSelect as getForSelectGejala } from "../../../services/gejala";
import { getForSelect as getForSelectSolusi } from "../../../services/solusi";
import Head from "next/head";

const Revisi = ({
  oneData,
  params,
  dataHamaPenyakit,
  dataGejala,
  dataSolusi,
}) => {
  const router = useRouter();

  const [form, setForm] = useState({
    hamaPenyakit: "",
    gejala: "[]",
    solusi: "[]",
  });

  const handleSimpan = async () => {
    const response = await revisi(params?.id, form);
    if (response?.data?.statusCode === 200) {
      router.replace("/basis-baru");
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: `${response?.data?.message || "Berhasil melakukan revisi data!"}`,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${response?.data?.message || "Nampaknya terjadi kesalahan!"}`,
      });
    }
  };

  let _tempForOptionsGejala = [];

  for (let index = 0; index < dataGejala.length; index++) {
    const element = dataGejala[index];
    _tempForOptionsGejala.push({
      label: `${element?.kode} - ${element?.nama}`,
      value: element?._id,
    });
  }

  const optionsGejala = _tempForOptionsGejala;

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

  let _tempForOptionsSolusi = [];

  for (let index = 0; index < dataSolusi.length; index++) {
    const element = dataSolusi[index];
    _tempForOptionsSolusi.push({
      label: `${element?.kode} - ${element?.solusi}`,
      value: element?._id,
    });
  }

  const optionsSolusi = _tempForOptionsSolusi;

  const [showValueSolusi, setShowValueSolusi] = useState([]);

  const handleMultipleSelectSolusi = (data) => {
    setShowValueSolusi(data);
    let _tempSolusi = [];

    if (data.length > 0) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        _tempSolusi.push(element?.value);
      }

      if (_tempSolusi.length > 0) {
        setForm({ ...form, solusi: JSON.stringify(_tempSolusi) });
      }
    } else {
      setForm({ ...form, solusi: "[]" });
    }
  };

  useEffect(() => {
    if (Object.keys(oneData).length > 0) {
      // START: Gejala
      let _tempIdGej = [];
      let _idGejala = [];
      let updateForShowValueGejala = [];

      for (let index = 0; index < oneData?.selectedGejala.length; index++) {
        const element = oneData?.selectedGejala[index];
        _idGejala.push(element?._id);
      }

      if (_idGejala.length > 0) {
        for (let index = 0; index < optionsGejala.length; index++) {
          const element = optionsGejala[index];
          for (let index2 = 0; index2 < _idGejala.length; index2++) {
            const element2 = _idGejala[index2];
            if (element?.value === element2) {
              updateForShowValueGejala.push({
                label: element?.label,
                value: element?.value,
              });
            }
          }
        }

        if (updateForShowValueGejala.length > 0) {
          setShowValueGejala(updateForShowValueGejala);

          for (
            let index = 0;
            index < updateForShowValueGejala.length;
            index++
          ) {
            const element = updateForShowValueGejala[index];
            _tempIdGej.push(element?.value);
          }
        }
      }
      // END: Gejala

      // START: Solusi
      let _tempIdSol = [];
      let _idSolusi = [];
      let updateForShowValueSolusi = [];

      for (let index = 0; index < oneData?.detailSolusi.length; index++) {
        const element = oneData?.detailSolusi[index];
        _idSolusi.push(element?._id);
      }

      if (_idSolusi.length > 0) {
        for (let index = 0; index < optionsSolusi.length; index++) {
          const element = optionsSolusi[index];
          for (let index2 = 0; index2 < _idSolusi.length; index2++) {
            const element2 = _idSolusi[index2];
            if (element?.value === element2) {
              updateForShowValueSolusi.push({
                label: element?.label,
                value: element?.value,
              });
            }
          }
        }

        if (updateForShowValueSolusi.length > 0) {
          setShowValueSolusi(updateForShowValueSolusi);

          for (
            let index = 0;
            index < updateForShowValueSolusi.length;
            index++
          ) {
            const element = updateForShowValueSolusi[index];
            _tempIdSol.push(element?.value);
          }
        }
      }
      // END: Solusi

      setForm({
        ...form,
        hamaPenyakit: oneData?.hamaPenyakit || "",
        gejala: JSON.stringify(_tempIdGej) || "[]",
        solusi: JSON.stringify(_tempIdSol) || "[]",
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          Revisi Basis Baru - Sistem Pakar Identifikasi Tanaman Kakao
          Menggunakan Metode CBR dan KNN
        </title>
      </Head>
      <Content>
        <div className="container pb-6">
          <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0">
            <Link href="/basis-baru">
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
                    disabled={true}
                    name="hamaPenyakit"
                    className="text-size-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow cursor-not-allowed"
                    onChange={(event) =>
                      setForm({ ...form, hamaPenyakit: event.target.value })
                    }
                  >
                    <option value="">-Pilih-</option>
                    {dataHamaPenyakit.length > 0 &&
                      dataHamaPenyakit.map((value, index) =>
                        value?._id.toString() ===
                        oneData?.detailPenyakit[0]?._id.toString() ? (
                          <option
                            selected={true}
                            key={index}
                            value={value?._id}
                          >
                            {value?.kode} - {value?.nama}
                          </option>
                        ) : (
                          <option key={index} value={value?._id}>
                            {value?.kode} - {value?.nama}
                          </option>
                        )
                      )}
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
                <div className="mb-4">
                  <label
                    htmlFor="solusi"
                    className="block text-sm font-medium text-slate-400 mb-2"
                  >
                    Solusi
                  </label>
                  <MultiSelect
                    options={optionsSolusi}
                    value={showValueSolusi}
                    onChange={(event) => handleMultipleSelectSolusi(event)}
                    labelledBy="Pilih"
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={handleSimpan}
                    type="button"
                    className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-dark-gray hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                  >
                    Revisi
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

export default Revisi;

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
  const responseHamaPenyakit = await getForSelectHamaPenyakit(token);
  const responseGejala = await getForSelectGejala(token);
  const responseSolusi = await getForSelectSolusi(token);

  return {
    props: {
      params,
      oneData: response?.data?.data || {},
      dataHamaPenyakit: responseHamaPenyakit?.data?.data || [],
      dataGejala: responseGejala?.data?.data || [],
      dataSolusi: responseSolusi?.data?.data || [],
    },
  };
}
