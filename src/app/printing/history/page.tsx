"use client";

import DataTable from "@/components/DataTable";
import SearchBar from "@/components/SearhBar";
import { HistoryOperation, PrinterOperation } from "@/main";
import { useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface PrintingHistory {
    file: string;
    date: string;
    location: string;
    status: string;
}

export default function LichSuIn() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]); // Dữ liệu lấy từ API
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang
    const studentId = 1;

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const printColumns = [
        { header: "File in", accessor: "file" },
        { header: "Ngày in", accessor: "date" },
        { header: "Nơi nhận", accessor: "location" },
    ];

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setPage(1); // Đặt lại trang về 1 khi tìm kiếm
    };

    // Hàm fetch dữ liệu từ API
    const fetchPrintingHistory = async () => {
        try {
            const printService = new HistoryOperation();
            const printerService = new PrinterOperation();
    
            const token = localStorage.getItem("accessToken");
            const studentId = Number(localStorage.getItem("userId"));
            const response = await printService.getPrintingStudentHistory(studentId, token ?? "");
            console.log(response);
    
            if (response?.success && response?.data) {
                const result = response.data; 
    
                const formattedData = await Promise.all(result.map(async (item: any) => {
                    const printerResponse = await printerService.searchPrinter({
                        "criteria": [
                            {
                                "field": "id",
                                "operator": "=",
                                "value": item.printerId  
                            }
                        ],
                        "addition": {}
                    }, token);
    
                    let location = `Máy in ${item.printerId}`; 
    
                    if (printerResponse?.success && printerResponse?.data && printerResponse.data.length > 0) {
                        const printerLocation = printerResponse.data[0]?.location;
                        if (printerLocation) {
                            location = `${printerLocation.building} ${printerLocation.room}`;
                        }
                    }
    
                    return {
                        file: item.filename,
                        date: new Date(item.date).toLocaleString('vi-VN', {
                            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        }),
                        location,
                    };
                }));
    
                setData(formattedData); 
            } else {
                // console.error("Không thể lấy dữ liệu:", response?.message);
            }
        } catch (error) {
            // console.error("Lỗi khi fetch dữ liệu:", error);
        }
    };
    


    // Lọc dữ liệu dựa trên `searchTerm`
    const filteredData = data.filter((item: PrintingHistory) =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Tính toán dữ liệu hiển thị trên mỗi trang
    const itemsPerPage = 5;
    const paginatedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    const calculatedTotalPages = Math.ceil(filteredData.length / itemsPerPage);

    useEffect(() => {
        setTotalPages(calculatedTotalPages);
    }, [filteredData]);

    // Gọi fetch dữ liệu khi component mount
    useEffect(() => {
        fetchPrintingHistory();
    }, []);

    return (
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-blue-600 mb-4">Lịch sử in</h1>

                <SearchBar
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

                <DataTable
                    data={paginatedData} // Hiển thị dữ liệu đã lọc và phân trang
                    columns={printColumns}
                    page={page}
                    totalPages={totalPages}
                    handlePreviousPage={handlePreviousPage}
                    handleNextPage={handleNextPage}
                />
        </div>
    );
}