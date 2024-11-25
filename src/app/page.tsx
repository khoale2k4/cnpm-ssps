// src/app/home/mainpage.tsx

import React from "react";
import Link from "next/link";

export default function mainpage() {
  return (
    <div
      className="mainpage"
      style={{
        fontFamily: "Baloo Bhaina 2 Regular",
        padding: 100,
        display: "flex" /* Kích hoạt Flexbox */,
        flexDirection: "column" /* Sắp xếp các phần tử theo chiều dọc */,
        alignItems: "center" /* Căn giữa các phần tử theo chiều ngang */,
        textAlign: "center",
        gap: 70,
      }}
    >
      <div
        className="text"
        style={{
          fontSize: 40,
        }}
      >
        <h1 style={{ color: "#4441D8" }}>
          DỊCH VỤ SMART PRINTING CHO SINH VIÊN
        </h1>
      </div>
      <div className="button-container">
        <button className="btn">
          <div className="image">
            <img
              src="images\printer.jpg"
              alt="Printer"
              height={130}
              width={130}
            />
          </div>
          <Link href="/" className="navLink">
            IN TÀI LIỆU
          </Link>{" "}
        </button>
        <button className="btn">
          <div className="image">
            <img
              src="images\buypage.jpg"
              alt="Printer"
              height={130}
              width={130}
            />
          </div>
          <Link href="/about" className="navLink">
            MUA TRANG IN
          </Link>{" "}
        </button>
        <button className="btn">
          <div className="image">
            <img
              src="images\history.jpg"
              alt="Printer"
              height={130}
              width={130}
            />
          </div>
          <Link href="/contact" className="navLink">
            LỊCH SỬ IN
          </Link>{" "}
        </button>
        <button className="btn">
          <div className="image">
            <img
              src="images\history.jpg"
              alt="Printer"
              height={130}
              width={130}
            />
          </div>
          <Link href="/contact" className="navLink">
            <h2>
              LỊCH SỬ <p>THANH TOÁN</p>
            </h2>
          </Link>{" "}
        </button>
      </div>
    </div>
  );
}
