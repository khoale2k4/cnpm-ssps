"use client";

import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const { isLoggedIn, setLoggedIn } = useAuth();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false); // Trạng thái hover
  const router = useRouter();

  useEffect(() => {
    // Hàm cập nhật trạng thái user từ localStorage
    const updateUserFromStorage = () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("accessToken");

      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        setUser(null);
      }
    };

    // Gọi hàm khi component được mount
    updateUserFromStorage();

    // Lắng nghe sự kiện storage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user" || e.key === "accessToken") {
        updateUserFromStorage();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    setLoading(false);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [setLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUser(null);
    router.push("/unauth");
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
      className="bg-white shadow-md px-0 py-0 flex items-center justify-between sticky top-0 z-10"
      style={{
        height: 60,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: "white",
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
          <h1 className="text-lg font-semibold fontsize-30" style={{ fontSize: 26 }}>
            TRƯỜNG ĐẠI HỌC BÁCH KHOA TP.HCM
          </h1>
          <p className="text-sm text-gray-500" style={{ fontSize: 20 }}>
            Student Smart Printing Service
          </p>
        </div>
      </div>
      <div
        className="relative flex items-center space-x-2"
        style={{ fontSize: 20 }}
      >
        {isLoggedIn && user ? (
          <>
            <span className="text-gray-600">Xin chào, {user.name}</span>
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <FaUserCircle className="text-3x1 text-gray-600 cursor-pointer" />
              {isHovered && (
                <div className="absolute top-10 right-0 bg-white shadow-lg p-4 rounded-md w-80 z-50">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Số điện thoại:</strong> {user.phone}</p>
                  <p><strong>Vai trò:</strong> {user.role}</p>
                  <p>
                    <strong>Giấy miễn phí:</strong> {user.student?.currentFreePaper}
                  </p>
                  <p>
                    <strong>Giấy đã mua:</strong> {user.student?.boughtPaper}
                  </p>
                </div>
              )}
            </div>
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
