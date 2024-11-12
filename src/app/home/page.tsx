// pages/Home.js
import React from "react";
import Link from 'next/link';

const Home = () => {
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-semibold text-blue-600 mb-2">
          Student Smart Printing Service
        </h2>
        <p className="text-lg text-gray-500 italic mb-6">
          Đăng nhập để sử dụng dịch vụ
        </p>
        <Link href="/login">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg">
            Đăng nhập ngay
          </button>
        </Link>
      </div>
      
      {/* Hình minh họa */}
      <div className="mt-10">
        <img
          src="/images/man_printer.png" // Đặt đường dẫn tới hình ảnh minh họa của bạn
          alt="Printing Illustration"
          className="w-full max-w-md"
        />
      </div>
    </div>
  );
};

export default Home;
