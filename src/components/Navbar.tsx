// src/components/Navbar.tsx
"use client";

import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSession, signOut, signIn } from "next-auth/react";

const Navbar: React.FC = () => {
  //const { data: session } = useSession();
  return (
    <nav
      className="bg-white shadow-md px-0 py-0 flex items-center justify-between"
      style={{
        height: 60,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      }}
    >
      <div className="flex items-center space-x-3">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="logo"
          height={60}
          width={100}
        />
        <div>
          <h1
            className="text-lg font-semibold fontsize-30"
            style={{
              fontSize: 26,
            }}
          >
            TRƯỜNG ĐẠI HỌC BÁCH KHOA TP.HCM
          </h1>
          <p
            className="text-sm text-gray-500"
            style={{
              fontSize: 20,
            }}
          >
            Student Smart Printing Service
          </p>
        </div>
      </div>
      <div
        className="flex items-center space-x-2"
        style={{
          fontSize: 20,
        }}
      >
        {0 ? (
          <>
            <span className="text-gray-600">Xin chào, {"AHIHI123"}</span>
            <FaUserCircle className="text-3x1 text-gray-600" />
            <button
              onClick={() => signOut()}
              className="px-3 text-blue-500 hover:underline"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <span className="text-gray-600"></span>
            <FaUserCircle className="text-3x1 text-gray-600" />
            <button
              onClick={() => signIn()}
              className="text-blue-500 hover:underline"
            >
              Đăng nhập
            </button>
          </>
        )}
        <div />
      </div>
    </nav>
  );
};
export default Navbar;
