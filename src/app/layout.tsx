// src/app/layout.tsx

import './globals.css';
import Layout from '../components/Layout';

export const metadata = {
  title: 'SSPS',
  description: 'Dịch vụ in ấn thông minh cho sinh viên',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body>
        {/* <SessionProviderWrapper> */}
        <Layout>{children}</Layout>
        {/* </SessionProviderWrapper> */}
      </body>
    </html>
  );
}
