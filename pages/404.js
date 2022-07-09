import React from "react";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.back();
    }, 5000);
  }, [router]);

  return (
    <>
      <Head>
        <title>
          Error 404 Not Found - Sistem Pakar Identifikasi Tanaman Kakao
          Menggunakan Metode CBR dan KNN
        </title>
      </Head>
      <section className="h-screen flex flex-col items-center justify-center">
        <Image
          src="/assets/img/404.svg"
          width={450}
          height={450}
          alt="404 - Not Found"
        />
        <h1 className="text-xl lg:text-3xl font-bold text-transparent bg-gradient-cyan bg-clip-text text-center">
          Opps! Kami kehilangan kamu. <br />{" "}
          <span className="text-base lg:text-xl text-slate-500 font-light">
            Halaman tidak ditemukan.
          </span>{" "}
        </h1>
      </section>
    </>
  );
}
