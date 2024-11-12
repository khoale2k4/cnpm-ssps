// src/components/Navbar.tsx
"use client"; // Add this line

import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";

const Navbar: React.FC = () => {
  // const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src="/images/logo.png" alt="Logo" className="h-12 w-12" />
        <div>
          <h1 className="text-lg font-semibold">TRƯỜNG ĐẠI HỌC BÁCH KHOA TP.HCM</h1>
          <p className="text-sm text-gray-500">Student Smart Printing Service</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {
        /* {session ? (
          <>
            <span className="text-gray-600">Xin chào, {session.user?.name}</span>
            <FaUserCircle className="text-2xl text-gray-600" />
            <button onClick={() => signOut()} className="text-blue-500 hover:underline">
              Đăng xuất
            </button>
          </>
        ) :  */
        (
          <>
            <span className="text-gray-600">Đăng nhập</span>
            <FaUserCircle className="text-2xl text-gray-600" />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
