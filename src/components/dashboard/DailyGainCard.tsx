import React from "react";
import { StockData } from "@/types/websocket";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
    stocks?: StockData[];
}

const DailyGainCard: React.FC<Props> = ({ stocks = [] }) => {
    // Default starting amount
    const startingBalance = 0;

    // Calculate total market value and weighted percent return
    let totalMarketValue = 0;
    let weightedPercentReturn = 0;
    const finalAmount = stocks.reduce(
        (acc, stock) => acc + stock.change * stock.quantity,
        0       
    );
    stocks.forEach(stock => {
        const stockValue = stock.quantity * stock.ltp;
        totalMarketValue += stockValue;
        weightedPercentReturn += stock.percentChange * stockValue;
    });

    // Avoid division by zero
    const totalPercentReturn = totalMarketValue > 0 
        ? (weightedPercentReturn / totalMarketValue) 
        : 0;

    // Calculate final amount after return
    const isLoss = finalAmount < startingBalance;
    const amountColor = isLoss ? "text-red-600" : "text-green-600";
    const Icon = isLoss ? TrendingDown : TrendingUp;

    return (
        <Card className="bg-gradient-to-r from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-lg rounded-xl p-6 md:p-8 lg:p-10 h-auto  ">
            <CardHeader className="text-lg md:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-200 text-center">
                Today's Gain
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-lg font-medium text-gray-600 dark:text-gray-300">
                    <Icon size={24} className={amountColor} />
                    <span className={amountColor}>{isLoss ? "Loss" : "Profit"}</span>
                </div>
                <div className={`text-3xl md:text-5xl lg:text-6xl font-bold  ${amountColor}`}>
                    {finalAmount.toFixed(2)} 
                </div>
                <div className={`text-lg md:text-2xl ${amountColor}`}>
                    {totalPercentReturn.toFixed(2)}% Return
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Based on today's trading data
                </span>
            </CardContent>
        </Card>
    );
};

export default DailyGainCard;
