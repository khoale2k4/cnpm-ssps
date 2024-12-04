"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@/main"; // Import class Auth từ main.ts
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function SSO() {
  const [username, setUsername] = useState<string>(""); // Tên tài khoản
  const [password, setPassword] = useState<string>(""); // Mật khẩu
  const [loading, setLoading] = useState<boolean>(false); // Trạng thái tải
  const [error, setErrorMessage] = useState<string | null>(null); // Lỗi nếu có
  const { setLoggedIn } = useAuth();
  const router = useRouter(); // Dùng để điều hướng

  const authService = new Auth(); // Tạo instance của Auth

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // Ngăn chặn reload trang
    setErrorMessage(""); // Xóa thông báo lỗi cũ
    setLoading(true); // Bắt đầu trạng thái tải

    try {
      // Gọi API đăng nhập từ class Auth
      const response = await authService.login({ username, password });
      console.log(response);
      if (response?.success) {
        // Nếu đăng nhập thành công
        console.log("Đăng nhập thành công:", response.data);
        setLoggedIn(true);

        // Lưu token hoặc thông tin người dùng vào localStorage/sessionStorage (nếu cần)
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("userId", response.data.user.student.id.toString());
        localStorage.setItem("user", JSON.stringify(response.data.user));

        const event = new Event("storage");
        window.dispatchEvent(event);


        // Điều hướng đến trang chính hoặc dashboard
        window.location.href = "/";
      } else {
        // Nếu đăng nhập thất bại
        setErrorMessage(
          response?.message || "Đăng nhập thất bại. Vui lòng thử lại."
        );
      }
    } catch (error) {
      // console.error("Lỗi khi gọi API:", error);
      setErrorMessage(
        "Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại."
      );
    } finally {
      setLoading(false); // Kết thúc trạng thái tải
    }
  };

  return (
    <div
      className="flex justify-center"
      style={{
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 mx-4 flex flex-col md:flex-row">
        {/* Cột trái: Biểu mẫu đăng nhập */}
        <section className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center items-center p-6 rounded-l-lg">
          <h2 className="text-xl font-bold text-red-600 border-b pb-4 mb-6">
            Nhập thông tin tài khoản của bạn
          </h2>
          {error && <p className="text-red-600 mb-4">{error}</p>}{" "}
          {/* Hiển thị lỗi */}
          <form className="w-full max-w-sm" onSubmit={handleLogin}>
            {/* Nhập tên tài khoản */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Tên tài khoản
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Nhập tên tài khoản"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            {/* Nhập mật khẩu */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* Nút đăng nhập */}
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
          {/* Link thay đổi mật khẩu */}
          {/* <div className="mt-4 text-sm text-gray-600">
            <p>
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Thay đổi mật khẩu?
              </Link>
            </p>
          </div> */}
        </section>

        {/* Cột phải: Lưu ý và hỗ trợ */}
        <section className="w-full md:w-1/2 px-4 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">Lưu ý</h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              Trang đăng nhập này cho phép đăng nhập một lần đến nhiều hệ thống
              web ở trường Đại học Bách Khoa Tp.HCM.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Vì lý do an ninh, bạn hãy thoát khỏi trình duyệt Web khi bạn kết
              thúc việc truy cập các dịch vụ đòi hỏi xác thực!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
