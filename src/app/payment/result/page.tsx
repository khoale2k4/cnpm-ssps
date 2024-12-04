"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentResult() {
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Lấy các tham số từ URL
    const queryParams = new URLSearchParams(window.location.search);
    const resultCode = queryParams.get("resultCode");
    const message = queryParams.get("message");

    // Kiểm tra trạng thái giao dịch
    if (resultCode === "0") {
      setMessage("Thanh toán thành công! Cảm ơn bạn đã sử dụng dịch vụ.");
      setSuccess(true);

      // Cập nhật trạng thái của người dùng (nếu cần thiết)
      // Gửi API để cộng số trang in đã mua
      const updateUserStatus = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const userId = localStorage.getItem("userId");

          if (!token || !userId) {
            // console.error("Token hoặc userId không tồn tại.");
            return;
          }

          // Gọi API cập nhật số trang
          await fetch("/api/user/update-pages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userId,
              pages: queryParams.get("amount"), // Số trang mua
            }),
          });
        } catch (error) {
          // console.error("Cập nhật thất bại:", error);
        }
      };

      updateUserStatus();
    } else {
      setMessage(`Thanh toán thất bại: ${message || "Vui lòng thử lại sau."}`);
      setSuccess(false);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2
          className={`text-2xl font-bold ${
            success ? "text-green-500" : "text-red-500"
          }`}
        >
          {success ? "🎉 Thành công!" : "❌ Lỗi!"}
        </h2>
        <p className="mt-4 text-gray-700">{message}</p>
        <button
          onClick={() => router.push("/payment")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Về trang thanh toán
        </button>
      </div>
    </div>
  );
}
