import React from "react";

const Footer = ({ auth = true }) => {
  return auth ? (
    <footer className="py-12">
      <div className="container">
        <div className="flex flex-wrap -mx-3">
          <div className="w-8/12 max-w-full px-3 mx-auto mt-1 text-center flex-0">
            <p className="mb-0 text-slate-400">
              Copyright ©{new Date().getFullYear()} oleh{" "}
              <a
                href="https://gusmanwijaya.com"
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-slate-700"
              >
                Informatika UNIB
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  ) : (
    <footer className="pt-4">
      <div className="w-full px-6 mx-auto">
        <div className="flex flex-wrap items-center -mx-3 lg:justify-between">
          <div className="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
            <div className="leading-normal text-center text-size-sm text-slate-500 lg:text-left">
              Copyright ©{new Date().getFullYear()} oleh{" "}
              <a
                href="https://gusmanwijaya.com"
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-slate-700"
              >
                Informatika UNIB
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
