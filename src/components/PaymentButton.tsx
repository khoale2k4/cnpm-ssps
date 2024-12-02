import React, { useState } from "react";

interface PaymentButtonProps {
  selectedType: string;
  soTrangCanMua: number;
  onClick: () => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ selectedType, soTrangCanMua, onClick }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    const studentId = localStorage.getItem("userId");
    if (!studentId) {
      alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/v1/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: parseInt(studentId, 10), // Chuyển studentId từ string sang số
          comboType: selectedType,
          numberCombo: soTrangCanMua,
        }),
      });
      console.log(response);

      const data = await response.json();
      if (data.payUrl) {
        // Chuyển hướng đến payUrl
        window.location.href = data.payUrl;
      } else {
        alert(data.message || "Đã xảy ra lỗi trong quá trình thanh toán.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Không thể thực hiện thanh toán.");
    } finally {
      setLoading(false);
      setShowConfirmation(false);
    }
  };

  return (
    <div>
      {/* Nút thanh toán */}
      <button
        onClick={() => setShowConfirmation(true)}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Thanh toán
      </button>

      {/* Popup xác nhận */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-lg font-semibold">Xác nhận thanh toán</h2>
            <p className="mt-2 text-sm text-gray-600">
              Bạn có chắc chắn muốn tiếp tục thanh toán với combo{" "}
              <strong>{selectedType.split("type")[1]}</strong> với số lượng{" "}
              <strong>{soTrangCanMua}</strong> không?
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-200"
              >
                Hủy
              </button>
              <button
                onClick={handlePayment}
                disabled={loading}
                className={`px-4 py-2 ${
                  loading ? "bg-blue-300" : "bg-blue-500"
                } text-white rounded hover:bg-blue-600 transition duration-200`}
              >
                {loading ? "Đang xử lý..." : "Tiếp tục"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentButton;
