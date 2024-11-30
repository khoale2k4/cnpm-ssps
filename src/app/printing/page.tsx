"use client";
import { FileOperation, PrinterOperation, SystemConfiguration } from "@/main";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Modal } from "antd";
import Popup from "../../components/Popup";

export enum FileType {
    PDF = "application/pdf",
    DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    EXCEL = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
}

const getFileTypeName = (mimeType: string): string => {
    switch (mimeType) {
        case FileType.PDF:
            return "PDF File";
        case FileType.DOCX:
            return "Word Document";
        case FileType.EXCEL:
            return "Excel Spreadsheet";
        default:
            return "Unknown File Type";
    }
};

interface PrintDataI {
    fileId: number;
    pageSize: string;
    copies: number;
}

interface PrintFileDto {
    printDataList: PrintDataI[];
}

interface Printer {
    id: string,
    code: string
}

interface FileWithAttributes {
    id: number;
    file: File;
    paperSize: string;
    pageCount: number;
    printMode: string;
    printer: string;
    orientation: string;
    copies: string;
    uploadStatus?: "uploading" | "success" | "error";
    isAccepted: number;
    pageRange: string;
    errorMsg: string;
    serverData?: any;
    printerOptions: Printer[],
}

export interface SearchAvailableDto {
    A3Require: number
    A4Require: number
    A5Require: number
}

export default function FileUploader() {
    const [selectedFiles, setSelectedFiles] = useState<FileWithAttributes[]>([]);
    const [currentFileIndex, setCurrentFileIndex] = useState<number | null>(null);
    const [allowedFiles, setAllowedFiles] = useState<string[]>([]);
    const [searchAvailable, setSearchAvailable] = useState<SearchAvailableDto>({
        A3Require: 0,
        A4Require: 0,
        A5Require: 0
    });
    const [printerOptions, setPrinterOptions] = useState<Printer[]>([]);
    const [printerIndex, setPrinterIndex] = useState<number | null>(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupConfig, setPopupConfig] = useState({
        title: "",
        message: "",
        showRetry: false,
        onRetry: null,
    });

    const fetchConfig = async () => {
        try {
            const systemService = new SystemConfiguration();
            const token = localStorage.getItem("accessToken");
            const response = await systemService.getAllSystemConfiguration(token ?? ""); // Đổi URL thành API của bạn
            if (response?.success && response.data.length) {
                const config = response.data[0]; // Lấy phần data đầu tiên
                setAllowedFiles(config.allowedFiles); // Lưu danh sách file được phép
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Gọi API khi component được render
    useEffect(() => {
        fetchConfig();
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newFiles = Array.from(files).map((file) => ({
                id: 0,
                file,
                paperSize: "A4",
                printMode: "",
                printer: "",
                pageCount: 0,
                orientation: "",
                copies: "0",
                pageRange: "",
                uploadStatus: "uploading",
                errorMsg: "",
                printerOptions: [],
            }));
            setSelectedFiles([...selectedFiles, ...newFiles]);
            newFiles.forEach(async (file, index) => {
                await uploadFileToServer(file.file, selectedFiles.length + index);
                // console.log(file);
                // updateSearchAvailable(file.paperSize, file.pageCount, true);
            }
            );
        }
    };

    const handleSelectFile = (index: number) => {
        setCurrentFileIndex(index);
        handleAttributeChange("copies");
    };

    const handleRemoveFile = (index: number) => {
        const removedFile = selectedFiles[index];
        setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
        if (currentFileIndex === index) {
            setCurrentFileIndex(null);
        } else if (currentFileIndex && currentFileIndex > index) {
            setCurrentFileIndex(currentFileIndex - 1);
        }
    };

    const updateFileStatus = (
        id: number,
        index: number,
        status: "uploading" | "success" | "error",
        errorMsg: string,
        pageCount: number,
        serverData?: any,
    ) => {
        setSelectedFiles((prevFiles) =>
            prevFiles.map((file, i) =>
                i === index
                    ? {
                        ...file,
                        uploadStatus: status,
                        serverData: serverData || file.serverData,
                        errorMsg: errorMsg,
                        id: id,
                        pageCount: pageCount
                    }
                    : file
            )
        );
    };

    const getValidPrinterFiles = (files: FileWithAttributes[]) => {
        // Lấy danh sách máy in và file có status là success
        let printFileDto: PrintFileDto = {
            printDataList: []
        };


        for (const file of files) {
            printFileDto.printDataList.push({
                fileId: file.id,
                pageSize: file.paperSize,
                copies: Number(file.copies)
            })
        }
        return printFileDto;
    };

    const handleSendPrintData = async () => {
        // Lấy danh sách máy in và file hợp lệ
        const validPrinterFiles = getValidPrinterFiles(selectedFiles);

        if (validPrinterFiles.length === 0) {
            console.log("Không có file nào hợp lệ để in.");
            return;
        }

        const token = localStorage.getItem("accessToken");
        const printService = new PrinterOperation();
        const printerId = Number(printerOptions[printerIndex ?? 0].id);
        console.log(printerId);

        try {
            const response = await printService.printFileCheck(
                printerId, // Chỉ gửi ID của máy in hiện tại
                validPrinterFiles,
                token ?? "" // Token xác thực
            );

            const acceptedList = response?.data.acceptedList;
            const unAcceptedList = response?.data.unAcceptedList;

            // Cập nhật trạng thái dựa trên API response
            setSelectedFiles((prevFiles) =>
                prevFiles.map((file) => ({
                    ...file,
                    isAccepted: acceptedList.includes(file.id)
                        ? 1
                        : unAcceptedList.includes(file.id)
                            ? -1
                            : file.isAccepted,
                }))
            );

            if (unAcceptedList.length === 0) {
                // Không có file nào bị từ chối, gọi hàm printFile
                await printService.printFile(
                    printerId,
                    validPrinterFiles,
                    token ?? ""
                );
                setPopupConfig({
                    title: "Thành công",
                    message: "In file thành công.",
                    showRetry: false,
                    onRetry: null,
                });
                setIsPopupVisible(true);
            } else {
                setPopupConfig({
                    title: "Lỗi",
                    message: "Có file không thể in, bạn có muốn tiếp tục?",
                    showRetry: true,
                    onRetry: () => {
                        printFile();
                        console.log("Người dùng nhấn thử lại");
                        setIsPopupVisible(false); // Đóng popup sau khi nhấn "Thử lại"
                    },
                });
                setIsPopupVisible(true);
            }

            if (response?.success) {
                console.log(`Gửi dữ liệu in thành công cho máy in ID: ${printerId}`, response.data);
            } else {
                console.error(`Lỗi khi gửi dữ liệu in cho máy in ID: ${printerId}`, response?.message);
            }
        } catch (error) {
            console.error(`Lỗi kết nối khi gửi dữ liệu cho máy in ID: ${printerId}`, error);
        }
    };

    const printFile = async () => {
        const validPrinterFiles = getValidPrinterFiles(selectedFiles);

        if (validPrinterFiles.length === 0) {
            console.log("Không có file nào hợp lệ để in.");
            return;
        }

        const token = localStorage.getItem("accessToken");
        const printService = new PrinterOperation();
        const printerId = Number(printerOptions[printerIndex ?? 0].id);
        await printService.printFile(
            printerId,
            validPrinterFiles,
            token ?? ""
        );
    }

    const uploadFileToServer = async (file: File, index: number) => {
        try {
            // Cập nhật trạng thái "uploading"
            updateFileStatus(0, index, "uploading", "", 0);
            const fileService = new FileOperation();
            const token = localStorage.getItem("accessToken");

            const response = await fileService.uploadFile(file, token ?? "");
            console.log(response);
            if (response?.success) {
                // Cập nhật trạng thái và dữ liệu từ server
                updateFileStatus(response?.data.fileId, index, "success", response.data, response.data.pageCount);
                // console.log(selectedFiles[index]);
            } else {
                updateFileStatus(-1, index, "error", response?.message, 0);
                throw new Error(response?.message || "Upload failed");
            }
        } catch (error) {
            updateFileStatus(-1, index, "error", error, 0);
        }
    };

    const handleAttributeChange = (key) => (event) => {
        const value = event.target.value;
        setSelectedFiles((prevFiles) =>
            prevFiles.map((file, index) =>
                index === currentFileIndex
                    ? {
                        ...file,
                        [key]: value,
                        ...(key === "paperSize" || key === "copies" ? { printerOptions: [] } : {}),
                    }
                    : file
            )
        );
    };

    const transformPrinterData = (data) => {
        return data.map((printer) => ({
            id: printer.id,
            code: `${printer.location.building} ${printer.location.room}`, // Mã: building + room
        }));
    };

    // Hàm gọi API để lấy danh sách máy in
    const fetchAvailablePrinters = async () => {
        try {
            const printerService = new PrinterOperation();
            const printerAvailablePayload: SearchAvailableDto = calculatePageRequirements(selectedFiles);
            console.log(printerAvailablePayload);
            const token = localStorage.getItem("accessToken");
            const response = await printerService.searchAvailablePrinter(printerAvailablePayload, token ?? "");
            if (!response?.success) {
                throw new Error("Failed to fetch printers");
            }
            console.log(response);

            const data = await transformPrinterData(response.data);
            setPrinterOptions(data || []); // Giả định API trả về danh sách máy in trong `data.printers`
        } catch (error) {
            console.error(error.message);
            return [];
        }
    };

    const calculatePageRequirements = (selectedFiles: FileWithAttributes[]): SearchAvailableDto => {
        return selectedFiles.reduce(
            (totals, file) => {
                const { paperSize, pageCount, copies } = file;

                // Chỉ tính toán nếu trạng thái tải lên thành công
                if (file.uploadStatus === "success" && pageCount > 0) {
                    const totalPages = pageCount * parseInt(copies || "1", 10);

                    switch (paperSize) {
                        case "A3":
                            totals.A3Require += totalPages;
                            break;
                        case "A4":
                            totals.A4Require += totalPages;
                            break;
                        case "A5":
                            totals.A5Require += totalPages;
                            break;
                        default:
                            break;
                    }
                }

                return totals;
            },
            {
                A3Require: 0,
                A4Require: 0,
                A5Require: 0,
            } as SearchAvailableDto
        );
    };

    const paperSizeOptions = ["A3", "A4", "A5"];
    const printModeOptions = ["Dọc", "Ngang"];
    const orientationOptions = ["Portrait", "Landscape"];

    return (
        <div>
            <div className="p-6 flex">
                {/* Khung chỉnh sửa và tải file */}
                <div className="w-2/3 bg-white rounded-lg shadow-lg p-6 mr-4">
                    <div className="border-2 border-gray-300 rounded-lg p-4 mb-4">
                        <h2 className="text-xl font-bold mb-4">Tải tài liệu</h2>
                        <input type="file" multiple onChange={handleFileChange} />
                        <p className="mt-2 text-sm text-gray-600">
                            Chọn tập tin hoặc kéo thả tập tin tại đây
                        </p>
                    </div><div className="flex justify-center items-center flex-row">
                        <h1>Các loại file được phép upload</h1>
                        {allowedFiles.map((fileType, index) => (
                            <div
                                key={index} // Thêm thuộc tính key
                                className="bg-gray-200 rounded-lg p-2 m-1"
                            >
                                {getFileTypeName(fileType)}
                            </div>
                        ))}
                    </div>


                    {currentFileIndex !== null ? (
                        <div className="border-2 border-gray-300 rounded-lg p-4">
                            <h2 className="text-xl font-bold mb-4">
                                Chỉnh sửa thuộc tính: {selectedFiles[currentFileIndex].file.name}
                            </h2>
                            {selectedFiles[currentFileIndex].uploadStatus !== "error" ? (<div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium">Khổ giấy</label>
                                    <select
                                        value={selectedFiles[currentFileIndex].paperSize}
                                        onChange={handleAttributeChange("paperSize")}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    >
                                        <option value="" disabled>
                                            Chọn khổ giấy
                                        </option>
                                        {paperSizeOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Kiểu in</label>
                                    <select
                                        value={selectedFiles[currentFileIndex].printMode}
                                        onChange={handleAttributeChange("printMode")}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    >
                                        <option value="" disabled>
                                            Chọn kiểu in
                                        </option>
                                        {printModeOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Số bản in</label>
                                    <input
                                        type="text"
                                        value={selectedFiles[currentFileIndex].copies}
                                        onChange={handleAttributeChange("copies")}
                                        placeholder="VD: 1"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Giới hạn trang in</label>
                                    <input
                                        type="text"
                                        value={selectedFiles[currentFileIndex].pageRange}
                                        onChange={handleAttributeChange("pageRange")}
                                        placeholder="VD: 5-7, 9-11"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>) : (<p></p>)}
                        </div>
                    ) : (
                        <p className="text-gray-600">Chọn một tệp từ danh sách để chỉnh sửa.</p>
                    )}
                </div>

                {/* Danh sách file */}
                <div className="w-1/3 bg-gray-100 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Danh sách tệp</h2>
                    <ul className="space-y-2">
                        {selectedFiles.map((fileWithAttr, index) => (
                            <li
                                key={index}
                                className={`p-4 border rounded-lg flex justify-between items-center cursor-pointer ${currentFileIndex === index ? "bg-blue-100" : "bg-white"
                                    }`}
                                onClick={() => handleSelectFile(index)}
                            >
                                <div>
                                    <span className="truncate font-medium">{fileWithAttr.file.name}</span>
                                    <span className="block text-sm text-gray-600">
                                        {fileWithAttr.uploadStatus === "uploading"
                                            ? "Đang tải..."
                                            : fileWithAttr.uploadStatus === "success"
                                                ? "Tải lên thành công"
                                                : "Tải lên thất bại. Lỗi: " + fileWithAttr.errorMsg}
                                    </span>
                                    {/* Hiển thị trạng thái chấp nhận */}
                                    {fileWithAttr.isAccepted === 1 && (
                                        <span className="block text-sm text-green-500">Đã chấp nhận</span>
                                    )}
                                    {fileWithAttr.isAccepted === -1 && (
                                        <span className="block text-sm text-red-500">Không được chấp nhận</span>
                                    )}
                                    {fileWithAttr.isAccepted === 0 && (
                                        <span className="block text-sm text-gray-500">Chưa xác định</span>
                                    )}
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveFile(index);
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrashAlt />
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Các nút kiểm tra và gửi */}
                    <div className="mt-6 space-x-4">
                        <button
                            onClick={handleSendPrintData}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Gửi yêu cầu in
                        </button>

                        {isPopupVisible && (
                            <Popup
                                title={popupConfig.title}
                                message={popupConfig.message}
                                onClose={() => setIsPopupVisible(false)}
                                onRetry={popupConfig.onRetry}
                                showRetry={popupConfig.showRetry}
                            />
                        )}
                        <button
                            onClick={() => {
                                fetchAvailablePrinters()
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Tìm máy in
                        </button>

                        {printerOptions.length > 0 ? (
                            <div>
                                <label className="block text-sm font-medium">Máy in</label>
                                <select
                                    value={printerIndex ?? 0} // Giá trị hiện tại của máy in
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    onChange={(e) => setPrinterIndex(Number(e.target.value))} // Cập nhật printerIndex
                                >
                                    <option value="" disabled>
                                        {printerOptions.length ? "Chọn máy in" : "Không có máy in khả dụng"}
                                    </option>
                                    {printerOptions.map((printer, index) => (
                                        <option key={printer.id} value={index}>
                                            {printer.code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <p>Không có máy in khả dụng</p>
                        )}


                    </div>
                </div>
            </div>
            <a href="/" className="mt-6 text-blue-700 hover:underline">
                &lt;&lt; Quay về trang chủ
            </a>
        </div>
    );
}
