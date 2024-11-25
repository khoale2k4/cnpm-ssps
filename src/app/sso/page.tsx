import React from "react";

export default function SSO() {
  return (
    <div
      className="flex justify-center"
      style={{
        marginTop: 0,
        marginBottom: 0,
      }}
    >
      <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 mx-4 flex flex-col md:flex-row">
        {/* Left Column: Login Form */}
        <section className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center items-center p-6 rounded-l-lg">
          <h2 className="text-xl font-bold text-red-600 border-b pb-4 mb-6">
            Nhập thông tin tài khoản của bạn
          </h2>
          <form className="w-full max-w-sm">
            {/* Username Input */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Tên tài khoản
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Nhập tên tài khoản"
              />
            </div>
            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Mật khẩu
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Nhập mật khẩu"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition"
            >
              Đăng nhập
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-600">
            <p>
              <a href="#" className="text-blue-600 hover:underline">
                Thay đổi mật khẩu?
              </a>
            </p>
          </div>
        </section>

        {/* Right Column: Language, Notes, and Support */}
        <section className="w-full md:w-1/2 px-4 flex flex-col justify-center">
          {/* Language Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-2">Ngôn ngữ</h3>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Tiếng Việt
              </button>
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
                English
              </button>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-3">Lưu ý</h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              Trang đăng nhập này cho phép đăng nhập một lần đến nhiều hệ thống
              web ở trường Đại học Bách Khoa Tp.HCM. Điều này có nghĩa là bạn
              chỉ đăng nhập một lần cho những hệ thống web đã đăng ký với hệ
              thống xác thực quản lý truy cập tập trung.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Vì lý do an ninh, bạn hãy thoát khỏi trình duyệt Web khi bạn kết
              thúc việc truy cập các dịch vụ đòi hỏi xác thực!
            </p>
          </div>

          {/* Support Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-3">
              Hỗ trợ kỹ thuật
            </h3>
            <ul className="text-gray-600 leading-relaxed">
              <li>
                <span className="font-bold">Email: </span>
                <a
                  href="mailto:support@hcmut.edu.vn"
                  className="text-blue-600 hover:underline"
                >
                  support@hcmut.edu.vn
                </a>
              </li>
              <li>
                <span className="font-bold">Điện thoại: </span>
                (84-8) 38647256 - 5200
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
