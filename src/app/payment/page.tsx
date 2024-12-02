"use client";

import { User } from "@/main";
import { useState, useEffect } from "react";
import listPrice from "../../../../SPSS_BE/src/modules/payment/list_price.json"; // Import file JSON
import PaymentButton from "@/components/PaymentButton";

export default function MuaTrangIn() {
  const [soTrangCanMua, setSoTrangCanMua] = useState(0);
  const [tongTien, setTongTien] = useState("0");
  const [soTrangHienCo, setSoTrangHienCo] = useState(0); // Mặc định là 50, sẽ được cập nhật từ API
  const [selectedType, setSelectedType] = useState("type1");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("momo");

  // Hàm để lấy số trang hiện có từ API
  const fetchSoTrangHienCo = async () => {
    try {
      const userService = new User();

      // Lấy token và userId từ localStorage
      const token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        console.error("Token hoặc userId không tồn tại trong localStorage");
        return;
      }

      // Gọi API để lấy thông tin người dùng
      const data = await userService.getInfo(userId, token);
      console.log(data);

      if (data?.success && data?.data?.student?.currentFreePaper !== undefined) {
        // Gán giá trị số trang hiện có
        setSoTrangHienCo(data.data.student.boughtPaper + data.data.student.currentFreePaper);
      } else {
        console.error("Lỗi lấy dữ liệu người dùng:", data?.message || "Không rõ nguyên nhân");
      }
    } catch (error) {
      console.error("Có lỗi khi gọi API:", error);
    }
  };

  // Gọi API khi component mount
  useEffect(() => {
    fetchSoTrangHienCo();
  }, []);

  const handleSoTrangChange = (e: { target: { value: any } }) => {
    const soTrang = e.target.value;
    setSoTrangCanMua(soTrang);

    // Lấy giá dựa trên loại trang được chọn
    const donGia = listPrice[selectedType]?.price || 0;
    setTongTien(`${soTrang * donGia}`);
  };

  const handleTypeChange = (e: { target: { value: string } }) => {
    const type = e.target.value;
    setSelectedType(type);

    // Cập nhật lại tổng tiền khi đổi loại trang in
    const donGia = listPrice[type]?.price || 0;
    setTongTien(`${soTrangCanMua * donGia}`);
  };

  const handlePaymentMethodChange = (e: { target: { value: string } }) => {
    setSelectedPaymentMethod(e.target.value); // Cập nhật phương thức thanh toán
  };

  const handlePayClick = () => {
    console.log("Phương thức thanh toán đã chọn:", selectedPaymentMethod);
    // Thực hiện logic xử lý thanh toán
  };

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };


  return (
    <div className="flex flex-col items-center min-h-screen py-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Mua trang in</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-4">
          <label className="font-semibold">Số trang in hiện có:</label>
          <span className="ml-2 text-gray-600">{soTrangHienCo}</span>
        </div>
        <div className="mb-4">
          <label className="font-semibold">Loại trang in:</label>
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className="mt-2 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.keys(listPrice).map((type, index) => (
              <option key={type} value={type}>
                Combo {index + 1} - {formatNumber(listPrice[type].price)} đồng/{formatNumber(listPrice[type].amount)}trang
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="font-semibold">Số combo cần mua thêm:</label>
          <input
            type="number"
            value={soTrangCanMua}
            onChange={handleSoTrangChange}
            placeholder="VD: 10"
            className="mt-2 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="font-semibold mr-2">Tổng tiền:</label>
          <input
            type="text"
            value={tongTien.toLocaleString()}
            readOnly
            className="p-2 border border-gray-300 rounded w-full focus:outline-none"
          />
          <span className="ml-2">VND</span>
        </div>
        <p className="mb-4 font-semibold">Phương thức thanh toán</p>
        <div className="flex justify-around mb-6">
          {/* Các phương thức thanh toán */}
          <label className="flex flex-col items-center text-sm">
            <input type="radio" name="payment" value="momo"
              checked={selectedPaymentMethod === "momo"}
              onChange={handlePaymentMethodChange} />
            <img src="/images/momo.png" alt="MoMo" className="w-10 h-10 mt-2" />
            Momo
          </label>
          <label className="flex flex-col items-center text-sm">
            <input type="radio" name="payment" value="bank"
              onChange={handlePaymentMethodChange} />
            <img src="/images/vcb.png" alt="Ngân hàng" className="w-10 h-10 mt-2" />
            Ngân hàng
          </label>
          <label className="flex flex-col items-center text-sm">
            <input type="radio" name="payment" value="bkpay" />
            <img
              src="/images/bkpay.png"
              alt="BK Pay"
              className="w-10 h-10 mt-2"
              onChange={handlePaymentMethodChange}
            />
            BK Pay
          </label>
          <label className="flex flex-col items-center text-sm">
            <input type="radio" name="payment" value="tai-noi-in" />
            <img
              src="/images/cash.png"
              alt="Tại nơi in"
              className="w-10 h-10 mt-2"
              onChange={handlePaymentMethodChange}
            />
            Tại nơi in
          </label>
        </div>
        <PaymentButton selectedType={selectedType} soTrangCanMua={parseInt(soTrangCanMua, 10)} />
      </div>
      <a href="/" className="mt-6 text-blue-700 hover:underline">
        &lt;&lt; Quay về trang chủ
      </a>
    </div>
  );
}
