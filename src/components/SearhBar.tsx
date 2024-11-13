import React from "react";
import { FaFilter, FaSearch } from "react-icons/fa";

interface SearchBarProps {
    value: string; // Giá trị từ khóa tìm kiếm
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Hàm xử lý sự kiện thay đổi
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <div className="flex items-center space-x-4 mb-4">
            <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-lg">
                <FaFilter className="mr-2 text-gray-600" /> Lọc kết quả
            </button>
            <div className="relative flex-grow">
                <input
                    type="text"
                    placeholder="Tìm kiếm"
                    value={value} // Gán giá trị từ props
                    onChange={onChange} // Gán hàm xử lý thay đổi từ props
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
            </div>
        </div>
    );
}

export default SearchBar;