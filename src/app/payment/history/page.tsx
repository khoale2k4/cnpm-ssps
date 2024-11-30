"use client";
import DataTable from "@/components/DataTable";
import SearchBar from "@/components/SearhBar";
import { Payment } from "@/main";
import React, { useState, useEffect } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";

const ITEMS_PER_PAGE = 5;

function PaymentHistory() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [paymentHistory, setPaymentHistory] = useState<any[]>([]); // Store fetched payment history
    const [loading, setLoading] = useState<boolean>(false); // Handle loading state
    const [error, setError] = useState<string | null>(null); // Handle error state

    // Fetch payment history data from API
    useEffect(() => {
        const fetchPaymentHistory = async () => {
          setLoading(true); // Start loading
    
          const paymentService = new Payment();
          try {
            const token = localStorage.getItem("accessToken");
            const studentId = Number(localStorage.getItem("userId"));
            const response = await paymentService.getStudentPayment(studentId, token ?? "");
    
            if (response == undefined || !response.success) {
              throw new Error("Failed to fetch payment history");
            }
    
            // Lấy dữ liệu và thực hiện chuyển đổi
            const data = response.data.map((item: any) => ({
              ...item,
              dateTime: new Date(item.dateTime).toLocaleString('vi-VN', {
                weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
              }),
              value: Number(item.value).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
              })
            }));
    
            setPaymentHistory(data); // Set payment history data
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false); // End loading
          }
        };
    
        fetchPaymentHistory();
      }, []);

    const totalPages = Math.ceil(paymentHistory.length / ITEMS_PER_PAGE);

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const printColumns = [
        { header: "Mã giao dịch", accessor: "transactionId" },
        { header: "Ngày thanh toán", accessor: "dateTime" },
        { header: "Số trang", accessor: "numberOfPages" },
        { header: "Số tiền", accessor: "value" },
        // { header: "Trạng thái", accessor: "status" },
    ];

    // Lọc dữ liệu dựa trên từ khóa tìm kiếm
    const filteredData = paymentHistory.filter((item) =>
        Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Đặt lại trang về 1 khi tìm kiếm
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-blue-600 mb-4">Lịch sử thanh toán</h1>

                <SearchBar
                    value={searchTerm}
                    onChange={handleSearchChange} // Thêm hàm xử lý thay đổi
                />

                <DataTable
                    data={filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)}
                    columns={printColumns}
                    page={currentPage}
                    totalPages={totalPages}
                    handlePreviousPage={goToPreviousPage}
                    handleNextPage={goToNextPage}
                />
            </div>
    );
}

export default PaymentHistory;
