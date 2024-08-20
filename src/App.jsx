import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';

function App() {
  const [text, setText] = useState('');
  const [color, setColor] = useState('#000000');
  const [logo, setLogo] = useState(null);
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState('L');
  const [showQR, setShowQR] = useState(false);

  const handleGenerateQR = () => {
    if (text.trim()) {
      setShowQR(true);
    } else {
      setShowQR(false);
    }
  };

  const handleDownload = () => {
    const qrCodeElement = document.getElementById('qr-code');
    html2canvas(qrCodeElement).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'qrcode.png';
      link.click();
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-500 to-blue-500 p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-10 border-t-8 border-t-teal-600">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
          QR Code Generator
        </h1>
        <div className="space-y-8">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
            className="w-full p-4 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label className="block text-gray-700 text-lg font-semibold mb-2">
                QR Code Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-12 p-1 border border-gray-300 rounded-lg cursor-pointer shadow-md focus:ring-2 focus:ring-teal-600"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#000000"
                  className="flex-1 p-4 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 text-lg font-semibold mb-2">
                QR Code Size
              </label>
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                placeholder="256"
                className="w-full p-4 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 text-lg font-semibold mb-2">
                Error Level
              </label>
              <select
                value={errorLevel}
                onChange={(e) => setErrorLevel(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="L">Low</option>
                <option value="M">Medium</option>
                <option value="Q">Quartile</option>
                <option value="H">High</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-2">
              Upload Logo (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogo(URL.createObjectURL(e.target.files[0]))}
              className="w-full p-4 border border-gray-300 rounded-xl bg-gray-50 cursor-pointer"
            />
          </div>
          <button
            onClick={handleGenerateQR}
            className="w-full py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:from-teal-500 hover:to-blue-500 transition duration-300"
          >
            Generate QR Code
          </button>
          {showQR && text && (
            <div className="mt-8 text-center">
              <div id="qr-code" className="relative mx-auto inline-block p-4 bg-white rounded-xl shadow-lg">
                <QRCode
                  value={text}
                  size={size}
                  bgColor="#ffffff"
                  fgColor={color}
                  level={errorLevel}
                />
                {logo && (
                  <img
                    src={logo}
                    alt="logo"
                    className="absolute inset-0 mx-auto my-auto w-16 h-16 border-4 border-white rounded-full"
                  />
                )}
              </div>
              <button
                onClick={handleDownload}
                className="mt-6 py-3 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:from-green-500 hover:to-emerald-500 transition duration-300"
              >
                Download QR Code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
