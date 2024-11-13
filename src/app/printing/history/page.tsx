"use client"
import DataTable from "@/components/DataTable";
import SearchBar from "@/components/SearhBar";
import { useState } from "react";

export default function LichSuIn() {
    const [page, setPage] = useState(1);
    const totalPages = 5;

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const data = [
        { file: "Giaitich3.pdf", date: "22/09/2024", location: "H1-321", status: "Chưa in" },
        { file: "Giaitich4.pdf", date: "21/09/2024", location: "H6-213", status: "Đã in" },
        { file: "Giaitich4.pdf", date: "21/09/2024", location: "H6-213", status: "Đã in" },
        { file: "Giaitich3.pdf", date: "22/09/2024", location: "H1-321", status: "Chưa in" },
        { file: "Giaitich4.pdf", date: "21/09/2024", location: "H6-213", status: "Đã in" },
        { file: "Giaitich3.pdf", date: "22/09/2024", location: "H1-321", status: "Chưa in" },
        { file: "Giaitich4.pdf", date: "21/09/2024", location: "H6-213", status: "Đã in" },
        { file: "Giaitich4.pdf", date: "21/09/2024", location: "H6-213", status: "Đã in" },
        { file: "Giaitich3.pdf", date: "22/09/2024", location: "H1-321", status: "Chưa in" },
        { file: "Giaitich4.pdf", date: "21/09/2024", location: "H6-213", status: "Đã in" },
        { file: "Giaitich4.pdf", date: "21/09/2024", location: "H6-213", status: "Đã in" },
        { file: "Giaitich4.pdf", date: "21/09/2024", location: "H6-213", status: "Đã in" },
        { file: "Giaitich3.pdf", date: "22/09/2024", location: "H1-321", status: "Chưa in" },
        { file: "Giaitich4.pdf", date: "21/09/2024", location: "H6-213", status: "Đã in" },
        { file: "Giaitich3.pdf", date: "22/09/2024", location: "H1-321", status: "Chưa in" },
        { file: "Giaitich4.pdf", date: "21/09/2024", location: "H6-213", status: "Đã in" },
        { file: "Giaitich4.pdf", date: "21/09/2024", location: "H6-213", status: "Đã in" },
        { file: "Giaitich4.pdf", date: "21/09/2024", location: "H6-213", status: "Đã in" },
        { file: "Giaitich4.pdf", date: "21/09/2024", location: "H6-213", status: "Đã in" },
        { file: "Giaitich3.pdf", date: "22/09/2024", location: "H1-321", status: "Chưa in" },
        { file: "Giaitich4.pdf", date: "21/09/2024", location: "H6-213", status: "Đã in" },
        { file: "Giaitich3.pdf", date: "22/09/2024", location: "H1-321", status: "Chưa in" },
        { file: "Giaitich4.pdf", date: "21/09/2024", location: "H6-213", status: "Đã in" },
        { file: "Giaitich4.pdf", date: "21/09/2024", location: "H6-213", status: "Đã in" },
        { file: "Giaitich4.pdf", date: "21/09/2024", location: "H6-213", status: "Đã in" },
        { file: "Giaitich4.pdf", date: "21/09/2024", location: "H6-213", status: "Đã in" },
    ];

    const printColumns = [
        { header: "File in", accessor: "file" },
        { header: "Ngày in", accessor: "date" },
        { header: "Nơi nhận", accessor: "location" },
        { header: "Trạng thái", accessor: "status" },
    ];

    return (
        <div className="min-h-screen bg-blue-50 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-blue-600 mb-4">Lịch sử in</h1>

                <SearchBar children={undefined} />

                <DataTable
                    data={data.slice(page * 5, (page + 1) * 5)}
                    columns={printColumns}
                    page={page}
                    totalPages={totalPages}
                    handlePreviousPage={handlePreviousPage}
                    handleNextPage={handleNextPage}
                />
            </div>
        </div>
    );
}
