import React from "react";

const Popup = ({ title, message, onClose, onRetry, showRetry = false }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                <p className="text-sm mb-6">{message}</p>
                <div className="flex justify-end space-x-2">
                    
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Đóng
                    </button>
                    {showRetry && (
                        <button
                            onClick={onRetry}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Tiếp tục
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Popup;
