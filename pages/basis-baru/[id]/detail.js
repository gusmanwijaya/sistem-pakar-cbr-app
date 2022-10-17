import jwtDecode from "jwt-decode";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Content from "../../../components/Content";
import Footer from "../../../components/Footer";
import { getOne } from "../../../services/basis-baru";

const Detail = ({ oneData }) => {
  return (
    <>
      <Head>
        <title>
          Detail Basis Baru - Sistem Pakar Identifikasi Tanaman Kakao
          Menggunakan Metode CBR dan KNN
        </title>
      </Head>
      <Content>
        <div className="px-10 pb-6 mx-auto">
          <Link href="/basis-baru">
            <button type="button" className="mt-4 mx-2 space-x-1">
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
          <div className="border-t border-slate-200 my-6">
            <dl>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-slate-500">
                  Hama & Penyakit
                </dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                  <div>
                    <div className="font-medium">
                      Kode: {oneData?.detailPenyakit[0]?.kode}
                    </div>
                    <div className="text-sm opacity-50">
                      {oneData?.detailPenyakit[0]?.nama}
                    </div>
                  </div>
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-slate-500">Gejala</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                  <div className="flex flex-col space-y-4">
                    {oneData?.selectedGejala?.length > 0 &&
                      oneData?.selectedGejala?.map((value, index) => (
                        <div key={index}>
                          <div className="font-medium">Kode: {value?.kode}</div>
                          <div className="text-sm opacity-50">
                            {value?.nama}
                          </div>
                        </div>
                      ))}
                  </div>
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-slate-500">Solusi</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                  <div className="flex flex-col space-y-4">
                    {oneData?.detailSolusi?.length > 0 &&
                      oneData?.detailSolusi?.map((value, index) => (
                        <div key={index}>
                          <div className="font-medium">Kode: {value?.kode}</div>
                          <div className="text-sm opacity-50">
                            {value?.solusi}
                          </div>
                        </div>
                      ))}
                  </div>
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-slate-500">Pengguna</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                  {oneData?.user?.nama || "-"}
                </dd>
              </div>
              <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-slate-500">Status</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
                  {oneData?.isVerified === false
                    ? "Belum Diverifikasi"
                    : "Sudah Diverifikasi"}
                </dd>
              </div>
            </dl>
          </div>
          <Footer auth={false} />
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
    },
  };
}
