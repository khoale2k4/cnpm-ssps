"use client"
import DataTable from '@/components/DataTable';
import SearchBar from '@/components/SearhBar';
import React, { useState } from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';

const ITEMS_PER_PAGE = 5;

function PaymentHistory() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const paymentHistory = [
        { pages: "10 trang", date: "22/09/2024", amount: "2000 đồng", status: "Đã thanh toán" },
        { pages: "20 trang", date: "21/09/2024", amount: "4000 đồng", status: "Đã thanh toán" },
        { pages: "50 trang", date: "21/09/2024", amount: "10000 đồng", status: "Đã thanh toán" },
        { pages: "30 trang", date: "21/09/2024", amount: "6000 đồng", status: "Thanh toán thất bại" },
        { pages: "100 trang", date: "21/09/2024", amount: "20000 đồng", status: "Đã thanh toán" },
        { pages: "20 trang", date: "21/09/2024", amount: "4000 đồng", status: "Đã thanh toán" },
        { pages: "50 trang", date: "21/09/2024", amount: "10000 đồng", status: "Đã thanh toán" },
        { pages: "30 trang", date: "21/09/2024", amount: "6000 đồng", status: "Thanh toán thất bại" },
        { pages: "20 trang", date: "21/09/2024", amount: "4000 đồng", status: "Đã thanh toán" },
        { pages: "50 trang", date: "21/09/2024", amount: "10000 đồng", status: "Đã thanh toán" },
        { pages: "30 trang", date: "21/09/2024", amount: "6000 đồng", status: "Thanh toán thất bại" },
        { pages: "50 trang", date: "21/09/2024", amount: "10000 đồng", status: "Đã thanh toán" },
        { pages: "30 trang", date: "21/09/2024", amount: "6000 đồng", status: "Thanh toán thất bại" },
        { pages: "100 trang", date: "21/09/2024", amount: "20000 đồng", status: "Đã thanh toán" },
        { pages: "50 trang", date: "21/09/2024", amount: "10000 đồng", status: "Đã thanh toán" },
        { pages: "30 trang", date: "21/09/2024", amount: "6000 đồng", status: "Thanh toán thất bại" },
        { pages: "100 trang", date: "21/09/2024", amount: "20000 đồng", status: "Đã thanh toán" },
        { pages: "20 trang", date: "21/09/2024", amount: "4000 đồng", status: "Đã thanh toán" },
        { pages: "50 trang", date: "21/09/2024", amount: "10000 đồng", status: "Đã thanh toán" },
        { pages: "30 trang", date: "21/09/2024", amount: "6000 đồng", status: "Thanh toán thất bại" },
        { pages: "30 trang", date: "21/09/2024", amount: "6000 đồng", status: "Thanh toán thất bại" },
        { pages: "100 trang", date: "21/09/2024", amount: "20000 đồng", status: "Đã thanh toán" },
        { pages: "30 trang", date: "21/09/2024", amount: "6000 đồng", status: "Thanh toán thất bại" },
        { pages: "100 trang", date: "21/09/2024", amount: "20000 đồng", status: "Đã thanh toán" },
        // ... thêm nhiều dữ liệu khác nếu cần
    ];

    const totalPages = Math.floor(paymentHistory.length / ITEMS_PER_PAGE);

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const printColumns = [
        { header: "Số trang", accessor: "pages" },
        { header: "Ngày in", accessor: "date" },
        { header: "Số lượng", accessor: "amount" },
        { header: "Trạng thái", accessor: "status" },
    ];


    // Lọc dữ liệu dựa trên từ khóa tìm kiếm
    const filteredData = paymentHistory.filter(item =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Đặt lại trang về 1 khi tìm kiếm
    };

    return (
        <div className="min-h-screen bg-blue-50 p-6">
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
        </div>
    );
}

export default PaymentHistory;
