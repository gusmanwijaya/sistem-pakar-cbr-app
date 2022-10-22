/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import jwtDecode from "jwt-decode";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Content from "../../../components/Content";
import Footer from "../../../components/Footer";
import { getOneInformasi } from "../../../services/informasi";

const Detail = ({ oneData }) => {
  const API_IMAGE = process.env.NEXT_PUBLIC_API_IMAGE;
  const directory = "hama-penyakit";

  return (
    <>
      <Head>
        <title>
          Detail Informasi - Sistem Pakar Identifikasi Tanaman Kakao Menggunakan
          Metode CBR dan KNN
        </title>
      </Head>
      <Content>
        <div className="px-10 pb-6 mx-auto">
          <div className="max-w-6xl px-10 mx-auto">
            <Link href="/informasi">
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
            {oneData?.foto && (
              <>
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="block transition duration-200 ease-out transform hover:scale-110"
                  >
                    <img
                      className="object-cover w-full shadow-lg h-full rounded-3xl"
                      src={
                        oneData?.foto
                          ? `${API_IMAGE}/${directory}/${oneData?.foto}`
                          : "/assets/img/empty.svg"
                      }
                    />
                  </button>
                </div>
                <div className="flex items-center justify-start mt-4 mb-4"></div>
              </>
            )}

            <div className="mt-2">
              <span className="sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-transparent bg-gradient-cyan bg-clip-text">
                {oneData?.nama || "-"}
              </span>

              <div className="flex justify-start items-center mt-2">
                <p className="text-sm text-slate-400 font-bold">
                  Kode : {oneData?.kode || "-"}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg text-slate-700 mt-4 font-normal">
                Deskripsi :
              </h2>
            </div>
            <div className="max-w-4xl px-20 mx-auto text-base text-slate-700">
              <div>
                <p className="mt-4 text-justify">{oneData?.deskripsi || "-"}</p>
              </div>
            </div>
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
  if (users?.role !== "pakar" && users?.role !== "petani")
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };

  const response = await getOneInformasi(params?.id, token);

  return {
    props: {
      oneData: response?.data?.data || {},
    },
  };
}
