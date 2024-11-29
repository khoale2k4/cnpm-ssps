// src/components/Navbar.tsx
"use client";

import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";

const Navbar: React.FC = () => {
  //const session = useSession();
  const session = 0;
  const isSSO = 1;
  return isSSO ? (
    <>
      {
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
            {session ? (
              <>
                <span className="text-gray-600">Xin chào, {"AHIHI123"}</span>
                <FaUserCircle className="text-3x1 text-gray-600" />
                <button
                  //onClick={() => signOut()}
                  className="px-3 text-blue-500 hover:underline"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <span className="text-gray-600"></span>
                <FaUserCircle className="text-3x1 text-gray-600" />
                <button className="text-blue-500 hover:underline">
                  <Link href="/auth/login" className="navLink">
                    <h2>Đăng nhập</h2>
                  </Link>
                </button>
              </>
            )}
            <div />
          </div>
        </nav>
      }
    </>
  ) : (
    <>
      {
        <nav className="w-full bg-blue-900 text-white py-4">
          <div className="container mx-auto flex items-center justify-center">
            <img
              src="/images/logo.png"
              alt="BK Logo"
              className="w-50 h-20 mr-4"
            />
            <h1 className="text-4xl font-bold">
              HCMUT – DỊCH VỤ XÁC THỰC TẬP TRUNG
            </h1>
          </div>
        </nav>
      }
    </>
  );
};
export default Navbar;
