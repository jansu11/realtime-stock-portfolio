"use client";
import React from "react";
import { Chart } from "@/types";

interface Props {
  stockdata?: Chart;
}

const Graph: React.FC<Props> = ({ stockdata }) => {
  if (!stockdata) {
    return <div>Loading...</div>;
  }

  const liveValue = stockdata.ltp;
  const name = stockdata.symbol;

  return (
    <div className="relative rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800">
      {/* Responsive image with controlled aspect ratio */}
      <div className="w-full aspect-[4/3] sm:aspect-[16/9] relative">
        <img
          src={stockdata.imageUrl}
          alt={`${name} chart`}
          className="absolute top-0 left-0 w-full h-full object-contain"
        />
      </div>

      {/* Overlay content */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg flex items-center space-x-2">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-blink" />
        <div className="flex flex-col items-center text-sm">
          <p className="font-medium">{name}</p>
          <p className="font-bold">{liveValue.toFixed(2)}</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default Graph;
