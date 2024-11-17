// src/app/home/page.tsx
import React from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { Container } from "postcss";

function guest() {
  return (
    <div
      className="user flex items-center justify-center"
      style={{
        padding: 40,
        alignItems: "center" /* Căn giữa theo chiều dọc (nếu cần) */,
        justifyContent: "center" /* Căn giữa theo chiều ngang (nếu cần) */,
        gap: 200 /* Khoảng cách giữa các phần tử con */,
      }}
    >
      <div
        className="login_now"
        style={{
          display: "flex" /* Sử dụng Flexbox */,
          flexDirection: "column" /* Sắp xếp các phần tử theo chiều dọc */,
          //alignItems: "center"; /* Căn giữa các phần tử theo chiều ngang */
          gap: 60 /* Khoảng cách giữa các phần tử con */,
          //height: 100, /* Chiều cao toàn màn hình */
          //justify-content: "center",
        }}
      >
        <div
          className="text-container"
          style={{
            textAlign: "left",
            color: "#0D99FF",
            fontFamily: "Finger Paint",
          }}
        >
          <h2 style={{ fontSize: "64x" }}>Student Smart</h2>{" "}
          <div style={{ fontSize: "64px" }}>
            {" "}
            Printing Service <span style={{ fontSize: "26px" }}>
              by HCMUT
            </span>{" "}
          </div>{" "}
        </div>

        <div
          className="login_now items-center"
          style={{
            display: "flex" /* Kích hoạt Flexbox */,
            flexDirection: "column" /* Sắp xếp các phần tử theo chiều dọc */,
            alignItems: "center" /* Căn giữa các phần tử theo chiều ngang */,
            textAlign: "center",
            fontSize: 26,
          }}
        >
          <p>Đăng nhập để sử dụng dịch vụ</p>
          <Link href="./home/login" className="navLink">
            <button className="login-button">Đăng nhập ngay</button>
          </Link>
        </div>
      </div>
      <div className="image">
        <img
          src="images\man_printer.png"
          alt="Printer"
          height={500}
          width={500}
        />
      </div>
    </div>
  );
}

export default guest;
