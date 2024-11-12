// src/app/layout.tsx

import './globals.css';
import Layout from '../components/Layout';
import SessionProviderWrapper from '../components/SessionProviderWrapper';

export const metadata = {
  title: 'Student Smart Printing Service',
  description: 'Dịch vụ in ấn thông minh cho sinh viên',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        {/* <SessionProviderWrapper> */}
          <Layout>{children}</Layout>
        {/* </SessionProviderWrapper> */}
      </body>
    </html>
  );
}
