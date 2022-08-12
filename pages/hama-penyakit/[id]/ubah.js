/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import jwtDecode from "jwt-decode";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import Swal from "sweetalert2";
import Content from "../../../components/Content";
import Footer from "../../../components/Footer";
import { getOne, update } from "../../../services/hama-penyakit";
import { getForSelect as getForSelectSolusi } from "../../../services/solusi";

const Ubah = ({ oneData, params, dataSolusi }) => {
  const router = useRouter();
  const API_IMAGE = process.env.NEXT_PUBLIC_API_IMAGE;
  const directory = "hama-penyakit";

  const [form, setForm] = useState({
    kode: "",
    nama: "",
    deskripsi: "",
    solusi: "[]",
    foto: "",
    imagePreview: "",
  });

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

  const handleUploadPhoto = (event) => {
    const size = event?.target?.files[0]?.size;

    if (size > 3000000) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Maksimal size file adalah 3 MB`,
      });
    } else {
      setForm({
        ...form,
        foto: event.target.files[0],
        imagePreview: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSimpan = async () => {
    const formData = new FormData();
    formData.append("kode", form?.kode);
    formData.append("nama", form?.nama);
    formData.append("deskripsi", form?.deskripsi);
    formData.append("solusi", form?.solusi);
    formData.append("foto", form?.foto);

    const response = await update(params?.id, formData);
    if (response?.data?.statusCode === 200) {
      router.replace("/hama-penyakit");
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: `${response?.data?.message || "Berhasil mengubah data!"}`,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${response?.data?.message || "Nampaknya terjadi kesalahan!"}`,
      });
    }
  };

  useEffect(() => {
    if (Object.keys(oneData).length > 0) {
      // START: Solusi
      let _tempIdSol = [];
      let _idSolusi = [];
      let updateForShowValueSolusi = [];

      for (let index = 0; index < oneData?.solusi.length; index++) {
        const element = oneData?.solusi[index];
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
        kode: oneData?.kode || "",
        nama: oneData?.nama || "",
        deskripsi: oneData?.deskripsi || "",
        solusi: JSON.stringify(_tempIdSol) || "[]",
        imagePreview:
          oneData?.foto && oneData?.foto !== ""
            ? `${API_IMAGE}/${directory}/${oneData?.foto}`
            : "",
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          Ubah Hama Penyakit - Sistem Pakar Identifikasi Tanaman Kakao
          Menggunakan Metode CBR dan KNN
        </title>
      </Head>
      <Content>
        <div className="container pb-6">
          <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0">
            <Link href="/hama-penyakit">
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
                    htmlFor="kode"
                    className="block text-sm font-medium text-slate-400 mb-2"
                  >
                    Kode
                  </label>
                  <input
                    name="kode"
                    type="text"
                    className="cursor-not-allowed text-size-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    disabled={true}
                    value={form?.kode}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="nama"
                    className="block text-sm font-medium text-slate-400 mb-2"
                  >
                    Nama
                  </label>
                  <input
                    name="nama"
                    type="text"
                    className="text-size-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    onChange={(event) =>
                      setForm({ ...form, nama: event.target.value })
                    }
                    value={form?.nama}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="deskripsi"
                    className="block text-sm font-medium text-slate-400 mb-2"
                  >
                    Deskripsi
                  </label>
                  <textarea
                    name="deskripsi"
                    className="text-size-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    onChange={(event) =>
                      setForm({ ...form, deskripsi: event.target.value })
                    }
                    value={form?.deskripsi}
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
                <div className="mb-4">
                  {form?.imagePreview !== "" && (
                    <div className="flex justify-center mb-4">
                      <img
                        src={
                          form?.imagePreview !== ""
                            ? form?.imagePreview
                            : "/assets/img/empty.svg"
                        }
                        alt="Preview"
                        className="w-1/2 h-1/2 object-cover rounded-3xl"
                      />
                    </div>
                  )}
                  <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-slate-300 group">
                    <div className="flex flex-col items-center justify-center pt-7">
                      <svg
                        className="w-10 h-10 text-slate-400 group-hover:text-slate-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <p className="capitalize text-sm text-gray-400 group-hover:text-slate-600 pt-1 tracking-wider">
                        Pilih foto
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => handleUploadPhoto(event)}
                    />
                  </label>
                </div>
                <div className="text-center">
                  <button
                    onClick={handleSimpan}
                    type="button"
                    className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-dark-gray hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                  >
                    Ubah
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

export default Ubah;

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
  const responseSolusi = await getForSelectSolusi(token);

  return {
    props: {
      params,
      oneData: response?.data?.data || {},
      dataSolusi: responseSolusi?.data?.data || [],
    },
  };
}
