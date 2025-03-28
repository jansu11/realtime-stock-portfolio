import React from "react"

interface OrderExitProps {
    price: number ; 
    quantity: number;
    onPriceChange: (value: number) => void;
    onQuantityChange: (value: number) => void;
    onClosePosition: () => void;
}

const OrderExit: React.FC<OrderExitProps> = ({price, quantity , onPriceChange, onQuantityChange, onClosePosition}) => {
    return (
    <div className="flex items-center space-x-2 bg-gray-900 text-white p-2 rounded-md">
      <button
        className="text-yellow-400 font-medium hover:text-yellow-300 transition duration-200"
        onClick={onClosePosition}
      >
        Close
        
      </button>
      <input
        type="number"
        className="bg-gray-800 px-2 py-1 rounded-md text-white w-20 text-right border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        value={price}
        onChange={(e) => onPriceChange(parseFloat(e.target.value) || 0)}
      />
      <input
        type="number"
        className="bg-gray-800 px-2 py-1 rounded-md text-white w-20 text-right border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        value={quantity}
        onChange={(e) => onQuantityChange(parseFloat(e.target.value) || 0)}
      />
    </div>
  );
};


export default OrderExit; 
