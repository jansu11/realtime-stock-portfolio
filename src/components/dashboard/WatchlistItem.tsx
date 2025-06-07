import React from "react";

 interface WatchlistItem {
  symbol: string;
  volume: number;
  ltp: number; // Last Traded Price
  percentChange: number;
  high: number;
  low: number;
  open: number;
  lastTradedVolume: number;
  lastTradedTime: string; // Timestamp of the last traded time
  change: number;
  previousClose: number;
}

interface Props {
    stock?:WatchlistItem
}
const WatchlistItem:React.FC<Props> = ({ stock }) => {

        if(!stock) {
            return (<div> the watch list is empty</div>)
        }

    return(

        <div className="flex  justify-between items-center p-3 border rounded-lg dark:border-gray-700 dark:bg-gray-800 ">
            <span className="font-semibold dark:text-white">{stock.symbol}</span>
            <div className="flex items-center gap-4">
            <span className="dark:text-gray-300">{stock.ltp.toFixed(1)} Rs</span>
            <span className={`${stock.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                 {stock.percentChange >= 0 ? '+' : ''}{stock.change.toFixed(1)} Rs
            </span>
            </div>
        </div>
    )

}

export default WatchlistItem