/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/google-font-display */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          content="GitHub : https://github.com/gusmanwijaya"
        />
        <meta
          property="og:title"
          content="Developer : Gusman Wijaya, S.Kom (https://gusmanwijaya.com)"
        />
        <meta
          property="og:description"
          content="Instagram : https://instagram.com/gusmanwijaya"
        />

        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/assets/img/apple-icon.png"
        />
        <link rel="icon" type="image/png" href="/assets/img/favicon.png" />

        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <link href="/assets/css/nucleo-icons.css" rel="stylesheet" />
        <link href="/assets/css/nucleo-svg.css" rel="stylesheet" />
        <link href="/assets/css/styles.css?v=1.0.3" rel="stylesheet" />
      </Head>
      <body className="text-slate-500 bg-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
