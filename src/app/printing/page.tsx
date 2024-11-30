"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTrashAlt } from 'react-icons/fa';

export default function MuaTrangIn() {
    const [selectedPaperSize, setSelectedPaperSize] = useState('');
    const [selectedPrintMode, setSelectedPrintMode] = useState('');
    const [selectedPrinter, setSelectedPrinter] = useState('');
    const [selectedOrientation, setSelectedOrientation] = useState('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const handleSelectChange = (setter: React.Dispatch<React.SetStateAction<string>>) => {
        return (event: React.ChangeEvent<HTMLSelectElement>) => {
            setter(event.target.value);
        };
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setSelectedFiles(Array.from(files));
        }
    };

    const handleRemoveFile = (fileName: string) => {
        setSelectedFiles(selectedFiles.filter(file => file?.name !== fileName));
    };

    const handleSubmit = async () => {
        setShowModal(true);
    };

    const paperSizeOptions = [
        { value: "A4", label: "A4" },
        { value: "A3", label: "A3" },
        { value: "A2", label: "A2" },
        { value: "A1", label: "A1" },
    ];
    const printModeOptions = [
        { value: "Horizontal", label: "Dọc" },
        { value: "Vertical", label: "Ngang" },
    ];
    const printerOptions = [
        { value: "H1-321", label: "H1-321" },
        { value: "H6-213", label: "H6-213" },
        { value: "H7-315", label: "H7-315" },
    ];
    const orientationOptions = [
        { value: "Portrait", label: "Portrait" },
        { value: "Landscape", label: "Landscape" },
    ];

    const renderSelect = (label: string, options: { value: string, label: string }[], selectedValue: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void) => (
        <div className="p-2 m-1">
            <label className="block text-sm font-medium">{label}</label>
            <select
                value={selectedValue}
                onChange={onChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                disabled={label === 'Số trang in cần dùng' || label === 'Số trang in hiện có'}
            >
                <option value="" disabled>Chọn {label.toLowerCase()}</option>
                {options.map(option => (
                    <option value={option.value} key={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="min-h-screen p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold m-2 text-blue-700">In tài liệu</h1>
            </div>
            <div className="flex flex-row items-center justify-center">
                <div className="max-w-4xl mr-4 bg-white rounded-lg shadow-lg p-6 basis-2/3">
                    <div className="border-2 border-gray-300 rounded-lg p-4 w-full flex flex-col">
                        <div>
                            <span className="text-xl font-bold">Tải tài liệu</span>
                        </div>
                        <div className="border-2 border-gray-300 rounded-lg p-4 w-3/4 self-center">
                            <input type="file" multiple
                                onChange={handleFileChange} />
                            <p>Chọn tập tin hoặc kéo thả tập tin tại đây</p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center">
                        <div className="bg-gray-200 rounded-lg p-2 m-1">
                            <p>PDF</p>
                        </div>
                        <div className="bg-gray-200 rounded-lg p-2 m-1">
                            <p>DOCX</p>
                        </div>
                        <div className="bg-gray-200 rounded-lg p-2 m-1">
                            <p>TXT</p>
                        </div>
                        <div>
                            <p>&lt;100MB</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="p-2">
                            {renderSelect('Khổ giấy', paperSizeOptions, selectedPaperSize, handleSelectChange(setSelectedPaperSize))}
                            {renderSelect('Kiểu in', printModeOptions, selectedPrintMode, handleSelectChange(setSelectedPrintMode))}
                            <div className="p-2 m-1">
                                <label className="block text-sm font-medium">Số bản in</label>
                                <input
                                    type="text"
                                    placeholder="VD: 1"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            {renderSelect('Máy in', printerOptions, selectedPrinter, handleSelectChange(setSelectedPrinter))}
                        </div>

                        <div className="p-2">
                            {renderSelect('Khổ', orientationOptions, selectedOrientation, handleSelectChange(setSelectedOrientation))}
                            <div className="p-2 m-1">
                                <label className="block text-sm font-medium">Giới hạn trang in</label>
                                <input
                                    type="text"
                                    placeholder="VD: 5-7, 9-11"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="p-2 m-1">
                                <label className="block text-sm font-medium">Số trang in cần dùng</label>
                                <input type="text" value="50" disabled
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200" />
                            </div>
                            <div className="p-2 m-1">
                                <label className="block text-sm font-medium">Số trang in hiện có</label>
                                <input type="text" value="100" disabled
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200" />
                            </div>
                        </div>
                    </div>
                </div>
                {selectedFiles.length > 0 &&
                    <div className="max-w-4xl ml-4 bg-white rounded-lg shadow-lg p-6 basis-1/3">
                        <div className="">
                            {selectedFiles.map((file, index) => (
                                <div key={file.name || index} className="flex align-center items-center justify-center">
                                    <div className="p-3">
                                        <span className="font-bold">{file?.name}</span> <br />
                                        <span className="font-bold text-blue-500 ">Tải lên thành công</span>
                                    </div>
                                    <div className="p-3">
                                        <button onClick={() => handleRemoveFile(file?.name)} className="text-red-500 hover:text-red-700">
                                            <FaTrashAlt className="w-6 h-6 " />
                                        </button>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                }

            </div>
            <div className="flex justify-center">
                <div className="mt-6">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        <span className="text-lg">Gửi yêu cầu in</span>
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 flex flex-col items-center max-w-md">
                        <h2 className="text-lg font-semibold text-blue-600">Thông báo</h2>
                        <p>Gửi tài liệu in thành công. Vui lòng kiểm tra lịch sử in để nhận tài liệu khi tài liệu đã được in ra.</p>
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={() => { setShowModal(false); router.push('/'); }}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Quay về trang chủ
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <a href="/" className="mt-6 text-blue-700 hover:underline">
                    &lt;&lt; Quay về trang chủ
                </a>
            </div>

        </div>
    );
}
