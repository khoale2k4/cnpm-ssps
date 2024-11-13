import React from 'react';

interface Column<T> {
  header: string; // Tiêu đề cột
  accessor: keyof T; // Khóa của dữ liệu để truy cập
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[]; // Danh sách cấu trúc cột
  page: number;
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  children?: React.ReactNode;
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  page,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  children,
}: DataTableProps<T>) => {
  return (
    <div>
      {children}

      <table className="w-full text-left bg-white">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="border-b-2 p-4 font-medium">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.accessor as string} className="border-b p-4">
                  {item[column.accessor] as unknown as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4">
        <button
          className="text-blue-600"
          onClick={() => (window.location.href = "/")}
        >
          &lt;&lt; Quay về trang chủ
        </button>
        <div className="flex items-center space-x-4">
          <button
            className="bg-gray-200 px-4 py-2 rounded-lg"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Trang trước
          </button>
          <span className="font-medium">{page} / {totalPages}</span>
          <button
            className="bg-gray-200 px-4 py-2 rounded-lg"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Trang sau
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;