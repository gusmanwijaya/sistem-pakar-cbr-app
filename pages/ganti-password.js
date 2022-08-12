import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Content from "../components/Content";
import Footer from "../components/Footer";
import { ubahPassword } from "../services/auth";

const GantiPassword = ({ users }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleSimpan = async () => {
    const response = await ubahPassword(users?._id, form);
    if (response?.data?.statusCode === 200) {
      Cookies.remove("token");
      router.replace("/");
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: `${response?.data?.message || "Berhasil ubah password!"}`,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${response?.data?.message || "Nampaknya terjadi kesalahan!"}`,
      });
    }
  };

  return (
    <>
      <Head>
        <title>
          Ganti Password - Sistem Pakar Identifikasi Tanaman Kakao Menggunakan
          Metode CBR dan KNN
        </title>
      </Head>
      <Content>
        <div className="container pb-6">
          <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0">
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="flex-auto p-6">
                <div className="mb-4">
                  <label
                    htmlFor="oldPassword"
                    className="block text-sm font-medium text-slate-400 mb-2"
                  >
                    Password saat ini
                  </label>
                  <input
                    name="oldPassword"
                    type={"password"}
                    className="text-size-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    onChange={(event) =>
                      setForm({ ...form, oldPassword: event.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-slate-400 mb-2"
                  >
                    Password baru
                  </label>
                  <input
                    type={"password"}
                    name="newPassword"
                    className="text-size-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    onChange={(event) =>
                      setForm({ ...form, newPassword: event.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="confirmNewPassword"
                    className="block text-sm font-medium text-slate-400 mb-2"
                  >
                    Konfirmasi password baru
                  </label>
                  <input
                    type={"password"}
                    name="confirmNewPassword"
                    className="text-size-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    onChange={(event) =>
                      setForm({
                        ...form,
                        confirmNewPassword: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleSimpan}
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

export default GantiPassword;

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

  return {
    props: {
      users,
    },
  };
}
