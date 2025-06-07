import React  from "react";
import { StockData } from "@/types/websocket";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
    stocks ?: StockData[];

}

const ValuationCard:React.FC<Props> = ({stocks}) => {
    if (!stocks){
        return (<div className="text-red-900">"No position "</div>)
    }
    var totalinvestment =  0;
    var totalMarketValue = 0;
    console.log(stocks)

    stocks.forEach(stock => {
        totalMarketValue = totalMarketValue + (stock.quantity * stock.ltp);
        totalinvestment = totalinvestment + (stock.quantity * stock.price);

    })

    const isProfit =  (totalMarketValue > totalinvestment )
    const color = isProfit ? 'text-green-500' : 'text-red:700'




    return (
        <div>
            <Card className="bg-gradient-to-r from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-lg rounded-xl  h-72 ">
                <CardHeader className="text-2xl font-bold ">
                    <span>Portfolio Summary</span>
                    <div className={`flex  justify-center  ${color}`}>
                         {isProfit ? <TrendingUp className="m-1"/>  : <TrendingDown className="m-1"/>} {isProfit ? " Profit" : " Loss"}</div>
                </CardHeader>
                <CardContent>
                    <div className="text-6xl font-bold">
                        {isProfit ? <span className={`${color}`}> +{(totalMarketValue - totalinvestment).toFixed(2)}</span> 
                        : <span className={`${color}`}> -{(totalMarketValue - totalinvestment).toFixed(2)}</span>}

                    </div>

                    <div className="p-2">
                        Total Investment : <span className=" dark:text-gray-300 text-gray-800 text-lg">Rs {totalinvestment}</span>
                    </div>
                    <div className="p-2">
                        Market Value : <span className="dark:text-gray-300 text-lg text-gray-800">Rs {totalMarketValue}</span> 
                    </div>


                </CardContent>


            </Card>

        </div>
    )

}

export default ValuationCard