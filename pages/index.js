import React, { useState } from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { login } from "../services/auth";
import Cookies from "js-cookie";

export default function SignIn() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleMasuk = async () => {
    if (form?.email !== "" && form?.password !== "") {
      const response = await login(form);
      if (response?.data?.statusCode === 200) {
        Cookies.set("token", response?.data?.data?.token);
        router.push("/dashboard");
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: `${response?.data?.message || "Berhasil login!"}`,
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
        text: "Silahkan isi email dan password Anda.",
      });
    }
  };

  return (
    <>
      <Head>
        <title>
          Sign In - Sistem Pakar Identifikasi Tanaman Kakao Menggunakan Metode
          CBR dan KNN
        </title>
      </Head>
      <div className="m-0 font-sans antialiased font-normal bg-white text-start text-size-base leading-default text-slate-500">
        <main className="mt-0 transition-all duration-200 ease-soft-in-out">
          <section>
            <div className="relative flex items-center p-0 overflow-hidden bg-center bg-cover min-h-75-screen">
              <div className="container z-10">
                <div className="flex flex-wrap mt-0 -mx-3">
                  <div className="flex flex-col w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-6/12 lg:w-5/12 xl:w-4/12">
                    <div className="relative flex flex-col min-w-0 mt-32 break-words bg-transparent border-0 shadow-none rounded-2xl bg-clip-border">
                      <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
                        <h3 className="relative z-10 font-bold text-transparent bg-gradient-cyan bg-clip-text">
                          Selamat datang
                        </h3>
                        <p className="mb-0">
                          Masukkan email dan password anda untuk masuk
                        </p>
                      </div>
                      <div className="flex-auto p-6">
                        <form role="form">
                          <label className="mb-2 ml-1 font-bold text-size-xs text-slate-700">
                            Email
                          </label>
                          <div className="mb-4">
                            <input
                              name="email"
                              type="email"
                              className="focus:shadow-soft-primary-outline text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                              placeholder="Email"
                              onChange={(event) =>
                                setForm({ ...form, email: event.target.value })
                              }
                            />
                          </div>
                          <label className="mb-2 ml-1 font-bold text-size-xs text-slate-700">
                            Password
                          </label>
                          <div className="mb-4">
                            <input
                              name="password"
                              type="password"
                              className="focus:shadow-soft-primary-outline text-size-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                              placeholder="Password"
                              onChange={(event) =>
                                setForm({
                                  ...form,
                                  password: event.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="text-center">
                            <button
                              type="button"
                              className="inline-block w-full px-6 py-3 mt-6 mb-0 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer shadow-soft-md bg-x-25 bg-150 leading-pro text-size-xs ease-soft-in tracking-tight-soft bg-gradient-cyan hover:scale-102 hover:shadow-soft-xs active:opacity-85"
                              onClick={handleMasuk}
                            >
                              Masuk
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="p-6 px-1 pt-0 text-center bg-transparent border-t-0 border-t-solid rounded-b-2xl lg:px-2">
                        <p className="mx-auto mb-6 leading-normal text-size-sm">
                          Tidak punya akun?{" "}
                          <button
                            onClick={() => router.push("/sign-up")}
                            type="button"
                            className="relative z-10 font-semibold text-transparent bg-gradient-cyan bg-clip-text"
                          >
                            Daftar
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full max-w-full px-3 lg:flex-0 shrink-0 md:w-6/12">
                    <div className="absolute top-0 hidden w-3/5 h-full -mr-32 overflow-hidden -skew-x-10 -right-40 rounded-bl-xl md:block">
                      <div
                        className="absolute inset-x-0 top-0 z-0 h-full -ml-16 bg-cover skew-x-10"
                        style={{
                          backgroundImage: `url('/assets/img/curved-images/curved6.jpg')`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  if (token)
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
