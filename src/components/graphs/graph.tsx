"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "@/types";

import Image from 'next/image'
interface Props {
    stockdata?: Chart

}

const Graph:React.FC<Props> = ({stockdata}) => {

  if (!stockdata) {
    return <div>Loading...</div>; // Handle undefined data gracefully
  }

    const liveValue = stockdata.ltp
    const name = stockdata.symbol 



    return(
        <div className="m-2 p-2 relative">
            <img src={`${stockdata.imageUrl}`} alt="Logo" className="h-full" />


                  {/* Overlay Content */}
            <div className="absolute top-0 left-1/4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg flex items-center space-x-2">
                {/* Blinking Dot */}
                <div className="w-6 h-6 bg-green-500 rounded-full animate-blink"></div>
                {/* Name & Value */}
                <div className="h-16 w-32 flex flex-col justify-center items-center">
                <p className="text-xl font-semibold">{name}</p>
                <p className="text-xl font-bold">{liveValue.toFixed(2)}</p>
                </div>
            </div>

            <style jsx>{`
                @keyframes blink {
                0% { opacity: 1; }
                50% { opacity: 0; }
                100% { opacity: 1; }
                }
                .animate-blink {
                animation: blink 1s infinite;
                }
            `}</style>
        </div>
    )
    

}

export default Graph
