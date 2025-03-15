import { useState } from "react";
import QRCode from "react-qr-code";
import "../App.css";

export default function QRCodeGenerator() {
  const [input, setInput] = useState("");
  const [qrCode, setQrCode] = useState("");

  function handleGenerateQrCode() {
    setQrCode(input.trim());
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">QR Code Generator</h1>

      {/* Input and Button Section */}
      <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Enter text to generate QR"
          className="border border-gray-300 rounded-lg p-2 w-full text-center focus:ring-2 focus:ring-blue-500"
        />
        <button
          disabled={!input.trim()}
          onClick={handleGenerateQrCode}
          className={`mt-4 px-4 py-2 w-full rounded-lg font-semibold transition text-center ${
            input.trim()
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          Generate
        </button>
      </div>

      {/* QR Code Section */}
      {qrCode && (
        <div className="mt-8 flex items-center justify-center bg-white p-6 shadow-lg rounded-lg">
          <QRCode value={qrCode} size={200} bgColor="#fff" />
        </div>
      )}
    </div>
  );
}
