import React, { useState } from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import { register } from "../services/auth";
import Swal from "sweetalert2";

export default function SignUp() {
  const router = useRouter();

  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
  });

  const handleSimpan = async () => {
    if (form?.nama !== "" && form?.email !== "" && form?.password !== "") {
      const response = await register(form);
      if (response?.data?.statusCode === 201) {
        router.replace("/");
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: `${response?.data?.message || "Berhasil daftar!"}`,
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
        text: "Silahkan isi nama, email, dan password Anda.",
      });
    }
  };

  return (
    <>
      <Head>
        <title>
          Sign Up - Sistem Pakar Identifikasi Tanaman Kakao Menggunakan Metode
          CBR dan KNN
        </title>
      </Head>
      <div className="m-0 font-sans antialiased font-normal bg-white text-start text-size-base leading-default text-slate-500">
        <main className="mt-0 transition-all duration-200 ease-soft-in-out">
          <section className="min-h-screen mb-32">
            <div
              className="relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-center bg-cover min-h-50-screen rounded-xl"
              style={{
                backgroundImage: `url('/assets/img/curved-images/curved14.jpg')`,
              }}
            >
              <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-dark-gray opacity-60"></span>
              <div className="container z-10">
                <div className="flex flex-wrap justify-center -mx-3">
                  <div className="w-full max-w-full px-3 mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:w-5/12">
                    <h1 className="mt-12 mb-2 text-white">Selamat datang!</h1>
                    <p className="text-white">
                      Gunakan formulir luar biasa ini untuk masuk atau membuat
                      akun baru Anda secara gratis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
                <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                  <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                    <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                      <h5>Daftar dengan</h5>
                    </div>
                    <div className="flex-auto p-6">
                      <form role="form text-left">
                        <div className="mb-4">
                          <input
                            name="nama"
                            type="text"
                            className="text-size-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                            placeholder="Nama"
                            onChange={(event) =>
                              setForm({ ...form, nama: event.target.value })
                            }
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            name="email"
                            type="email"
                            className="text-size-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                            placeholder="Email"
                            onChange={(event) =>
                              setForm({ ...form, email: event.target.value })
                            }
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            name="password"
                            type="password"
                            className="text-size-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                            placeholder="Password"
                            onChange={(event) =>
                              setForm({ ...form, password: event.target.value })
                            }
                          />
                        </div>
                        <div className="text-center">
                          <button
                            onClick={handleSimpan}
                            type="button"
                            className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-size-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-dark-gray hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                          >
                            Daftar
                          </button>
                        </div>
                        <p className="mt-4 mb-0 leading-normal text-size-sm">
                          Sudah memiliki akun?{" "}
                          <button
                            type="button"
                            className="font-bold text-slate-700"
                            onClick={() => router.replace("/")}
                          >
                            Masuk
                          </button>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
}
