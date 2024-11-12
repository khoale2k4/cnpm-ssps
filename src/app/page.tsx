// src/app/page.tsx
import Link from 'next/link';


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-50">
      <div className="flex flex-col items-center justify-center mt-16 bg-white p-8 rounded-lg shadow-md border border-gray-300">
        <img src="/images/logo.png" alt="Logo" className="h-20 mb-6" />
        <h2 className="text-lg font-semibold mb-2 text-center">Đăng nhập bằng tài khoản của bạn trên:</h2>
        <div className="w-full border-t border-gray-300 my-4"></div>
        <button className="flex items-center justify-center w-full px-4 py-2 mb-3 bg-white border border-gray-300 rounded hover:bg-gray-100">
          <img src="/images/logo.png" alt="HCMUT logo" className="h-6 w-6 mr-2" />
          <span>Tài khoản HCMUT (HCMUT account)</span>
        </button>
        <button className="flex items-center justify-center w-full px-4 py-2 mb-3 bg-white border border-gray-300 rounded hover:bg-gray-100">
          <span>Admin</span>
        </button>
        <div className="w-full border-t border-gray-300 mt-4"></div>
      </div>
    </div>
  );
}