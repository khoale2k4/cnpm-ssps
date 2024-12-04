"use client";

import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { User } from "@/main";

const Navbar: React.FC = () => {
  const { isLoggedIn, setLoggedIn } = useAuth();
  const [user, setUser] = useState<any | null>(null);
  const [userInfo, setUserInfo] = useState<any | null>(null); // Thông tin từ API
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Lấy user từ localStorage
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");

    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log(parsedUser);
      setUser(parsedUser);
      setLoggedIn(true);

      // Gọi API lấy thông tin người dùng
      const fetchUserInfo = async () => {
        try {
          const userService = new User();
          const response = await userService.getInfo(parsedUser.ssoId, token);
          console.log(response);

          if (response?.success) {
            const data = await response.data;
            setUserInfo(data);
          } else {
            // console.error("Failed to fetch user info");
          }
        } catch (error) {
          // console.error("Error fetching user info:", error);
        }
      };

      fetchUserInfo();
    } else {
      setLoggedIn(false);
      setUser(null);
    }

    setLoading(false);
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
              {isHovered && userInfo && (
                <div className="absolute top-10 right-0 bg-white shadow-lg p-4 rounded-md w-80 z-50">
                  <p><strong>Email:</strong> {userInfo.email}</p>
                  <p><strong>Số điện thoại:</strong> {userInfo.phone}</p>
                  <p><strong>Vai trò:</strong> {userInfo.role}</p>
                  <p>
                    <strong>Giấy miễn phí:</strong> {userInfo.student.currentFreePaper}
                  </p>
                  <p>
                    <strong>Giấy đã mua:</strong> {userInfo.student.boughtPaper}
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
