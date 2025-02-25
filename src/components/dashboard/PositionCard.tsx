
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { StockData } from "@/types/websocket";

interface Props {
    position?: StockData;
}

const PositionCard: React.FC<Props> = ({ position }) => {
    if (!position) {
        return <div className="text-red-500 text-center font-medium">No positions available</div>;
    }

    const profit = position.totalQuantity * (position.ltp - position.avgPrice);
    const marketValue = position.totalQuantity * position.ltp;
    const investment = position.totalQuantity * position.avgPrice;
    const isProfit = profit >= 0;

    return (
        <TableRow className="border-b dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
            <TableCell className="px-6 py-3 md:text-xl font-medium text-gray-900 dark:text-gray-200">{position.symbol}</TableCell>
            <TableCell className="px-6 py-3 md:text-xl  text-gray-700 dark:text-gray-300">{position.totalQuantity.toLocaleString()}</TableCell>
            <TableCell className={`px-6 py-3 md:text-xl  font-medium ${position.avgPrice < position.ltp ? 'text-green-600' : 'text-red-600'}`}>
                Rs {position.avgPrice.toLocaleString()}
            </TableCell>
            <TableCell className="px-6 py-3 md:text-xl  text-gray-800 dark:text-gray-300">Rs {position.ltp.toLocaleString()}</TableCell>
            <TableCell className={`px-6 py-3  md:text-xl font-semibold ${marketValue > investment ? "text-green-600" : "text-red-600"}`}>
                Rs {marketValue.toLocaleString()}
            </TableCell>
            <TableCell className="px-6 py-3 md:text-xl  text-gray-800 dark:text-gray-300">Rs {investment.toLocaleString()}</TableCell>
            <TableCell className={`px-6 py-3 md:text-xl  font-semibold ${isProfit ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                Rs {isProfit ? '+' : ''}{profit.toLocaleString()}
            </TableCell>
        </TableRow>
    );
};

export default PositionCard;
