// pages/mua-trang-in.js
"use client"
import { useState } from 'react';

export default function MuaTrangIn() {
  const [soTrangCanMua, setSoTrangCanMua] = useState('');
  const [tongTien, setTongTien] = useState('0');
  const donGia = 200; // Đơn giá 200 đồng/trang

  const handleSoTrangChange = (e: { target: { value: any; }; }) => {
    const soTrang = e.target.value;
    setSoTrangCanMua(soTrang);
    setTongTien(`${soTrang * donGia}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-50 py-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Mua trang in</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-4">
          <label className="font-semibold">Số trang in hiện có:</label>
          <span className="ml-2 text-gray-600">50</span>
        </div>
        <div className="mb-4">
          <label className="font-semibold">Số trang in cần mua thêm:</label>
          <input
            type="number"
            value={soTrangCanMua}
            onChange={handleSoTrangChange}
            placeholder="VD: 100"
            className="mt-2 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p className="mb-4 text-gray-600">Đơn giá: 200 đồng/trang</p>
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
          <label className="flex flex-col items-center text-sm">
            <input type="radio" name="payment" value="momo" />
            <img src="/images/momo.png" alt="MoMo" className="w-10 h-10 mt-2" />
            Momo
          </label>
          <label className="flex flex-col items-center text-sm">
            <input type="radio" name="payment" value="bank" />
            <img src="/images/vcb.png" alt="Ngân hàng" className="w-10 h-10 mt-2" />
            Ngân hàng
          </label>
          <label className="flex flex-col items-center text-sm">
            <input type="radio" name="payment" value="bkpay" />
            <img src="/images/bkpay.png" alt="BK Pay" className="w-10 h-10 mt-2" />
            BK Pay
          </label>
          <label className="flex flex-col items-center text-sm">
            <input type="radio" name="payment" value="tai-noi-in" />
            <img src="/images/cash.png" alt="Tại nơi in" className="w-10 h-10 mt-2" />
            Tại nơi in
          </label>
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
          Thanh toán
        </button>
      </div>
      <a href="/" className="mt-6 text-blue-700 hover:underline">
        &lt;&lt; Quay về trang chủ
      </a>
    </div>
  );
}
