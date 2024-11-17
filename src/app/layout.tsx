// src/app/layout.tsx

import "./globals.css";
import Layout from "../components/Layout";

export const metadata = {
  title: "SSPS",
  description: "Dịch vụ in ấn thông minh cho sinh viên",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* <SessionProviderWrapper> */}
        <Layout>{children}</Layout>
        {/* </SessionProviderWrapper> */}
      </body>
    </html>
  );
}
