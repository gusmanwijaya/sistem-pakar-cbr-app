/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const router = useRouter();

  const [users, setUsers] = useState({
    _id: "",
    nama: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const payload = jwtDecode(token);
      setUsers({
        ...users,
        _id: payload?._id,
        nama: payload?.nama,
        email: payload?.email,
        role: payload?.role,
      });
    }
  }, []);

  const handleSignOut = () => {
    Cookies.remove("process");
    Cookies.remove("token");
    localStorage.clear();
    sessionStorage.clear();
    router.replace("/");
  };

  return (
    <aside className="max-w-62.5 ease-nav-brand z-990 fixed inset-y-0 my-4 ml-4 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent">
      <div className="h-19.5">
        <i className="absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden"></i>
        <a className="block px-8 py-6 m-0 text-size-sm whitespace-nowrap text-slate-700">
          <img
            src="/assets/img/logo-ct.png"
            className="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8"
            alt="main_logo"
          />
          <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">
            Sistem Pakar Metode CBR
          </span>
        </a>
      </div>

      <hr className="h-px mt-0 bg-transparent bg-gradient-horizontal-dark" />

      <div className="items-center block w-auto min-h-screen overflow-auto h-sidenav grow basis-full">
        <ul className="flex flex-col pl-0 mb-0">
          <li className="mt-0.5 w-full">
            <a
              className={
                router.pathname === "/dashboard"
                  ? "py-2.7 shadow-soft-xl text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors cursor-pointer"
                  : "py-2.7 text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors cursor-pointer"
              }
              type="button"
              onClick={() => router.replace("/dashboard")}
            >
              <div
                className={
                  router.pathname === "/dashboard"
                    ? "bg-gradient-fuchsia shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5"
                    : "shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5"
                }
              >
                <svg
                  width="12px"
                  height="12px"
                  viewBox="0 0 45 40"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>shop</title>
                  <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g
                      transform="translate(-1716.000000, -439.000000)"
                      fill="#FFFFFF"
                      fillRule="nonzero"
                    >
                      <g transform="translate(1716.000000, 291.000000)">
                        <g transform="translate(0.000000, 148.000000)">
                          <path
                            className={
                              router.pathname === "/dashboard"
                                ? "opacity-60"
                                : "fill-slate-800 opacity-60"
                            }
                            d="M46.7199583,10.7414583 L40.8449583,0.949791667 C40.4909749,0.360605034 39.8540131,0 39.1666667,0 L7.83333333,0 C7.1459869,0 6.50902508,0.360605034 6.15504167,0.949791667 L0.280041667,10.7414583 C0.0969176761,11.0460037 -1.23209662e-05,11.3946378 -1.23209662e-05,11.75 C-0.00758042603,16.0663731 3.48367543,19.5725301 7.80004167,19.5833333 L7.81570833,19.5833333 C9.75003686,19.5882688 11.6168794,18.8726691 13.0522917,17.5760417 C16.0171492,20.2556967 20.5292675,20.2556967 23.494125,17.5760417 C26.4604562,20.2616016 30.9794188,20.2616016 33.94575,17.5760417 C36.2421905,19.6477597 39.5441143,20.1708521 42.3684437,18.9103691 C45.1927731,17.649886 47.0084685,14.8428276 47.0000295,11.75 C47.0000295,11.3946378 46.9030823,11.0460037 46.7199583,10.7414583 Z"
                          ></path>
                          <path
                            className={
                              router.pathname === "/dashboard"
                                ? ""
                                : "fill-slate-800"
                            }
                            d="M39.198,22.4912623 C37.3776246,22.4928106 35.5817531,22.0149171 33.951625,21.0951667 L33.92225,21.1107282 C31.1430221,22.6838032 27.9255001,22.9318916 24.9844167,21.7998837 C24.4750389,21.605469 23.9777983,21.3722567 23.4960833,21.1018359 L23.4745417,21.1129513 C20.6961809,22.6871153 17.4786145,22.9344611 14.5386667,21.7998837 C14.029926,21.6054643 13.533337,21.3722507 13.0522917,21.1018359 C11.4250962,22.0190609 9.63246555,22.4947009 7.81570833,22.4912623 C7.16510551,22.4842162 6.51607673,22.4173045 5.875,22.2911849 L5.875,44.7220845 C5.875,45.9498589 6.7517757,46.9451667 7.83333333,46.9451667 L19.5833333,46.9451667 L19.5833333,33.6066734 L27.4166667,33.6066734 L27.4166667,46.9451667 L39.1666667,46.9451667 C40.2482243,46.9451667 41.125,45.9498589 41.125,44.7220845 L41.125,22.2822926 C40.4887822,22.4116582 39.8442868,22.4815492 39.198,22.4912623 Z"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Dashboard
              </span>
            </a>
          </li>

          {users?.role === "pakar" && (
            <>
              <li className="mt-0.5 w-full">
                <a
                  className={
                    router.pathname === "/hama-penyakit"
                      ? "py-2.7 shadow-soft-xl text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors cursor-pointer"
                      : "py-2.7 text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors cursor-pointer"
                  }
                  type="button"
                  onClick={() => router.replace("/hama-penyakit")}
                >
                  <div
                    className={
                      router.pathname === "/hama-penyakit"
                        ? "bg-gradient-fuchsia shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5"
                        : "shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5"
                    }
                  >
                    <svg
                      width="12px"
                      height="12px"
                      viewBox="0 0 42 42"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>office</title>
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          transform="translate(-1869.000000, -293.000000)"
                          fill="#FFFFFF"
                          fillRule="nonzero"
                        >
                          <g transform="translate(1716.000000, 291.000000)">
                            <g transform="translate(153.000000, 2.000000)">
                              <path
                                className={
                                  router.pathname === "/hama-penyakit"
                                    ? "opacity-60"
                                    : "fill-slate-800 opacity-60"
                                }
                                d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                              ></path>
                              <path
                                className={
                                  router.pathname === "/hama-penyakit"
                                    ? ""
                                    : "fill-slate-800"
                                }
                                d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                    Hama & Penyakit
                  </span>
                </a>
              </li>

              <li className="mt-0.5 w-full">
                <a
                  className={
                    router.pathname === "/gejala"
                      ? "py-2.7 shadow-soft-xl text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors cursor-pointer"
                      : "py-2.7 text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors cursor-pointer"
                  }
                  type="button"
                  onClick={() => router.replace("/gejala")}
                >
                  <div
                    className={
                      router.pathname === "/gejala"
                        ? "bg-gradient-fuchsia shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5"
                        : "shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5"
                    }
                  >
                    <svg
                      width="12px"
                      height="12px"
                      viewBox="0 0 43 36"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>credit-card</title>
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          transform="translate(-2169.000000, -745.000000)"
                          fill="#FFFFFF"
                          fillRule="nonzero"
                        >
                          <g transform="translate(1716.000000, 291.000000)">
                            <g transform="translate(453.000000, 454.000000)">
                              <path
                                className={
                                  router.pathname === "/gejala"
                                    ? "opacity-60"
                                    : "fill-slate-800 opacity-60"
                                }
                                d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                              ></path>
                              <path
                                className={
                                  router.pathname === "/gejala"
                                    ? ""
                                    : "fill-slate-800"
                                }
                                d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                    Gejala
                  </span>
                </a>
              </li>

              <li className="mt-0.5 w-full">
                <a
                  className={
                    router.pathname === "/solusi"
                      ? "py-2.7 shadow-soft-xl text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors cursor-pointer"
                      : "py-2.7 text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors cursor-pointer"
                  }
                  type="button"
                  onClick={() => router.replace("/solusi")}
                >
                  <div
                    className={
                      router.pathname === "/solusi"
                        ? "bg-gradient-fuchsia shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5"
                        : "shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5"
                    }
                  >
                    <svg
                      width="12px"
                      height="12px"
                      viewBox="0 0 42 42"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>box-3d-50</title>
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          transform="translate(-2319.000000, -291.000000)"
                          fill="#FFFFFF"
                          fillRule="nonzero"
                        >
                          <g transform="translate(1716.000000, 291.000000)">
                            <g transform="translate(603.000000, 0.000000)">
                              <path
                                className={
                                  router.pathname === "/solusi"
                                    ? "opacity-60"
                                    : "fill-slate-800 opacity-60"
                                }
                                d="M22.7597136,19.3090182 L38.8987031,11.2395234 C39.3926816,10.9925342 39.592906,10.3918611 39.3459167,9.89788265 C39.249157,9.70436312 39.0922432,9.5474453 38.8987261,9.45068056 L20.2741875,0.1378125 L20.2741875,0.1378125 C19.905375,-0.04725 19.469625,-0.04725 19.0995,0.1378125 L3.1011696,8.13815822 C2.60720568,8.38517662 2.40701679,8.98586148 2.6540352,9.4798254 C2.75080129,9.67332903 2.90771305,9.83023153 3.10122239,9.9269862 L21.8652864,19.3090182 C22.1468139,19.4497819 22.4781861,19.4497819 22.7597136,19.3090182 Z"
                              ></path>
                              <path
                                className={
                                  router.pathname === "/solusi"
                                    ? ""
                                    : "fill-slate-800"
                                }
                                d="M23.625,22.429159 L23.625,39.8805372 C23.625,40.4328219 24.0727153,40.8805372 24.625,40.8805372 C24.7802551,40.8805372 24.9333778,40.8443874 25.0722402,40.7749511 L41.2741875,32.673375 L41.2741875,32.673375 C41.719125,32.4515625 42,31.9974375 42,31.5 L42,14.241659 C42,13.6893742 41.5522847,13.241659 41,13.241659 C40.8447549,13.241659 40.6916418,13.2778041 40.5527864,13.3472318 L24.1777864,21.5347318 C23.8390024,21.7041238 23.625,22.0503869 23.625,22.429159 Z"
                              ></path>
                              <path
                                className={
                                  router.pathname === "/solusi"
                                    ? ""
                                    : "fill-slate-800"
                                }
                                d="M20.4472136,21.5347318 L1.4472136,12.0347318 C0.953235098,11.7877425 0.352562058,11.9879669 0.105572809,12.4819454 C0.0361450918,12.6208008 6.47121774e-16,12.7739139 0,12.929159 L0,30.1875 L0,30.1875 C0,30.6849375 0.280875,31.1390625 0.7258125,31.3621875 L19.5528096,40.7750766 C20.0467945,41.0220531 20.6474623,40.8218132 20.8944388,40.3278283 C20.963859,40.1889789 21,40.0358742 21,39.8806379 L21,22.429159 C21,22.0503869 20.7859976,21.7041238 20.4472136,21.5347318 Z"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                    Solusi
                  </span>
                </a>
              </li>

              <li className="mt-0.5 w-full">
                <a
                  className={
                    router.pathname === "/basis-kasus"
                      ? "py-2.7 shadow-soft-xl text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors cursor-pointer"
                      : "py-2.7 text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors cursor-pointer"
                  }
                  type="button"
                  onClick={() => router.replace("/basis-kasus")}
                >
                  <div
                    className={
                      router.pathname === "/basis-kasus"
                        ? "bg-gradient-fuchsia shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5"
                        : "shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5"
                    }
                  >
                    <svg
                      width="12px"
                      height="12px"
                      viewBox="0 0 40 40"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>settings</title>
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <g
                          transform="translate(-2020.000000, -442.000000)"
                          fill="#FFFFFF"
                          fillRule="nonzero"
                        >
                          <g transform="translate(1716.000000, 291.000000)">
                            <g transform="translate(304.000000, 151.000000)">
                              <polygon
                                className={
                                  router.pathname === "/basis-kasus"
                                    ? ""
                                    : "fill-slate-800 opacity-60"
                                }
                                points="18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667"
                              ></polygon>
                              <path
                                className={
                                  router.pathname === "/basis-kasus"
                                    ? ""
                                    : "fill-slate-800 opacity-60"
                                }
                                d="M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z"
                              ></path>
                              <path
                                className={
                                  router.pathname === "/basis-kasus"
                                    ? ""
                                    : "fill-slate-800"
                                }
                                d="M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                    Basis Kasus
                  </span>
                </a>
              </li>
            </>
          )}

          <li className="mt-0.5 w-full">
            <a
              className={
                router.pathname === "/identifikasi"
                  ? "py-2.7 shadow-soft-xl text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors cursor-pointer"
                  : "py-2.7 text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors cursor-pointer"
              }
              type="button"
              onClick={() => router.replace("/identifikasi")}
            >
              <div
                className={
                  router.pathname === "/identifikasi"
                    ? "bg-gradient-fuchsia shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5"
                    : "shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill={
                    router.pathname === "/identifikasi"
                      ? "#FFFFFF"
                      : "currentColor"
                  }
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Identifikasi
              </span>
            </a>
          </li>

          {users?.role === "petani" && (
            <li className="mt-0.5 w-full">
              <a
                className={
                  router.pathname === "/informasi"
                    ? "py-2.7 shadow-soft-xl text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors cursor-pointer"
                    : "py-2.7 text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors cursor-pointer"
                }
                type="button"
                onClick={() => router.replace("/informasi")}
              >
                <div
                  className={
                    router.pathname === "/informasi"
                      ? "bg-gradient-fuchsia shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5"
                      : "shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={
                      router.pathname === "/informasi"
                        ? "#FFFFFF"
                        : "currentColor"
                    }
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                  Informasi
                </span>
              </a>
            </li>
          )}

          <li className="w-full mt-4">
            <h6 className="pl-6 ml-2 font-bold leading-tight uppercase text-size-xs opacity-60">
              Pengaturan
            </h6>
          </li>

          {users?.role === "pakar" && (
            <li className="mt-0.5 w-full">
              <a
                className={
                  router.pathname === "/pengguna"
                    ? "py-2.7 shadow-soft-xl text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors cursor-pointer"
                    : "py-2.7 text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors cursor-pointer"
                }
                type="button"
                onClick={() => router.replace("/pengguna")}
              >
                <div
                  className={
                    router.pathname === "/pengguna"
                      ? "bg-gradient-fuchsia shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5"
                      : "shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill={
                      router.pathname === "/pengguna"
                        ? "#FFFFFF"
                        : "currentColor"
                    }
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                  Pengguna
                </span>
              </a>
            </li>
          )}

          <li className="mt-0.5 w-full">
            <a
              className={
                router.pathname === "/ganti-password"
                  ? "py-2.7 shadow-soft-xl text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors cursor-pointer"
                  : "py-2.7 text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors cursor-pointer"
              }
              onClick={() => router.replace("/ganti-password")}
            >
              <div
                className={
                  router.pathname === "/ganti-password"
                    ? "bg-gradient-fuchsia shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5"
                    : "shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill={
                    router.pathname === "/ganti-password"
                      ? "#FFFFFF"
                      : "currentColor"
                  }
                >
                  <path
                    fillRule="evenodd"
                    d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Ganti Password
              </span>
            </a>
          </li>

          <li className="mt-0.5 w-full">
            <a
              className="py-2.7 text-size-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors cursor-pointer"
              onClick={handleSignOut}
            >
              <div className="shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                Keluar
              </span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
