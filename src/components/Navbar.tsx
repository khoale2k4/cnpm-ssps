"use client";

import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const { isLoggedIn, setLoggedIn } = useAuth();
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const token = localStorage.getItem("accessToken");

    if (token && storedName) {
      setUserName(storedName);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      if (!token) {
        router.push("/unauth");
      }
    }
    setLoading(false); // Đã kiểm tra trạng thái xong
  }, [setLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setLoggedIn(false);
    setUserName(null);
  };

  if (loading) {
    return (
      <nav className="bg-white shadow-md px-0 py-0 flex items-center justify-between">
        <div className="text-gray-500">Đang tải...</div>
      </nav>
    );
  }

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
        {isLoggedIn && userName ? (
          <>
            <span className="text-gray-600">Xin chào, {userName}</span>
            <FaUserCircle className="text-3x1 text-gray-600" />
            <button
              onClick={handleLogout}
              className="px-3 text-blue-500 hover:underline"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <FaUserCircle className="text-3x1 text-gray-600" />
            <Link href="/auth/login" className="navLink">
              <button className="text-blue-500 hover:underline">
                Đăng nhập
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
