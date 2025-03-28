'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StockPosition, WatchlistStock, SectorLeader, TradeHistory } from '@/types';
import OrderExit  from '@/components/admin/OrderExit';

const AdminDashboard = () => {
  // Form States


  const [exitData, setExitData] = useState<{[key:string] : {price:number; quantity: number}}> ({});

  
  const [position, setPosition] = useState<Omit<StockPosition, '_id'>>({
    date: '',
    price: 0,
    quantity: 0,
    symbol: ''
  });

  const [watchlist, setWatchlist] = useState<Omit<WatchlistStock, '_id'>>({
    symbol: ''

  });

  const [sector, setSector] = useState<Omit<SectorLeader, '_id'>>({
    sectorName: ''
  });

  const [positions, setPositions] = useState<StockPosition[]>([]);
  const [watchlistStocks, setWatchlistStocks] = useState<WatchlistStock[]>([]);
  const [sectorLeaders, setSectorLeaders] = useState<SectorLeader[]>([]);
  
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
    fetchData();
  }, []);

    const fetchData = async (): Promise<void> => {
    try {
      const [positionsRes, watchlistRes, sectorsRes] = await Promise.all([
        fetch('http://localhost:8000/api/stocks/agg-position'),
        fetch('http://localhost:8000/api/stocks/watchlist'),
        fetch('http://localhost:8000/api/stocks/sector-leaders')
      ]);

      const [positionsData, watchlistData, sectorsData] = await Promise.all([
        positionsRes.json(),
        watchlistRes.json(),
        sectorsRes.json()
      ]);

      setPositions(positionsData);
      setWatchlistStocks(watchlistData);
      setSectorLeaders(sectorsData);
    } catch (error) {
      setMessage(`Error fetching data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

   const handleSubmit = async (
    type: 'position' | 'watchlist' | 'sector-leader',
    data: Omit<StockPosition | WatchlistStock | SectorLeader, '_id'>
  ): Promise<void> => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(`http://localhost:8000/api/stocks/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setMessage(`${type} added successfully!`);
        fetchData();
        
        // Reset form based on type
        if (type === 'position') {
          setPosition({ date: '', price: 0, quantity: 0, symbol: '' });
        } else if (type === 'watchlist') {
          setWatchlist({ symbol: '' });
        } else if (type === 'sector-leader') {
          setSector({ sectorName: '' });
        }
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    setLoading(false);
  };

    const handlePositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPosition(prev => ({
      ...prev,
      [name]: name === 'date' ? value : Number(value) || value
    }));
  };
  
    const handleWatchlistChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setWatchlist(prev => ({
        ...prev, [name]:value


      }))
    }

    const handleSectorLeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setSector(prev => ({
        ...prev, [name]:value
      }))
    }
    const handlePriceChange = (id: string, price: number) => {
      console.log(price,id)
    setExitData((prev) => ({
      ...prev,
      [id]: { ...prev[id], price},
    }));
    };


    const handleQuantityChange = (id: string, quantity: number) => {
      console.log(quantity,id)
      setExitData((prev) => ({
        ...prev,
        [id]: { ...prev[id], quantity },
      }));
    };

    const handleClosePosition = async (id: string, position_data: StockPosition) => {
      const exitPrice = exitData[id]?.price ?? 0;
      const exitQuantity = exitData[id]?.quantity ?? 0;


      console.log(`Closing position for ${id} at $${exitPrice} with ${exitQuantity} quantity`);

      // API call can be made here to close the position
      var trade_data:TradeHistory = {
        
        _id : position_data._id,
        symbol : position_data.symbol,
        purchase_price : position_data.price,
        quantity : exitQuantity,
        sell_price : exitPrice,
        exit_date  : new Date(),
        
      }

      console.log(trade_data)
      try{
        const response = await fetch('http://localhost:8000/api/stocks/close-position',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(trade_data)
          }
        );

        if (!response.ok){
          console.log('error')
          
        }

        const result = await response.json();
        console.log("Trade history saved", result)


      } catch (e) {

        console.log('error : ',e)
      }
      

      console.log(trade_data)

      // Remove the closed position from the list
    };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Stock Portfolio Admin</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="position">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="position">Position</TabsTrigger>
                <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
                <TabsTrigger value="sector">Sector</TabsTrigger>
              </TabsList>



              <TabsContent value="position">
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit('position', position);
                }}>
                  <Input
                    type="date"
                    name="date"
                    value={position.date}
                    onChange={handlePositionChange}
                    required
                  />
                  <Input
                    type="number"
                    name="price"
                    value={position.price || ''}
                    onChange={handlePositionChange}
                    placeholder="Price"
                    step="0.01"
                    required
                  />
                  <Input
                    type="number"
                    name="quantity"
                    value={position.quantity || ''}
                    onChange={handlePositionChange}
                    placeholder="Quantity"
                    required
                  />
                  <Input
                    type="text"
                    name="symbol"
                    value={position.symbol}
                    onChange={handlePositionChange}
                    placeholder="Symbol"
                    required
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Position'}
                  </Button>
                </form>
              </TabsContent>


              <TabsContent value="watchlist">
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit('watchlist', watchlist);
                }}>
                  <Input
                    type="text"
                    name="symbol"
                    value={watchlist.symbol}
                    onChange={handleWatchlistChange}
                    placeholder="Symbol"
                    required
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Watchlist'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="sector">
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit('sector-leader', sector);
                }}>
                  <Input
                    type="text"
                    name="sectorName"
                    value={sector.sectorName}
                    onChange={handleSectorLeaderChange}
                    placeholder="sector Name"
                    required
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Sector Leader'}
                  </Button>
                </form>
              </TabsContent>

            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Stock Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {positions.map((pos) => (
                    <TableRow key={pos._id}>
                      <TableCell>{pos.symbol}</TableCell>
                      <TableCell>${pos.price.toFixed(2)}</TableCell>
                      <TableCell>{pos.quantity}</TableCell>
                      <TableCell>
                        {
                          pos._id !== undefined && (
                            <OrderExit 
                              price={exitData[pos._id]?.price ?? pos.price.toFixed(2)}
                              quantity={exitData[pos._id]?.quantity ?? pos.quantity}
                              onPriceChange={(value) => {
                                 if(pos._id)
                                 {
                                  handlePriceChange(pos._id ,value)}
                              }}

                              onQuantityChange={(value) => 
                              {
                                if(pos._id)
                                  handleQuantityChange(pos._id, value )
                              }
                              }

                              onClosePosition={() => 
                              {
                                if(pos._id)
                                  handleClosePosition(pos._id, pos )}

                              }
                            />

                          )
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Watchlists</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {watchlistStocks.map((wl) => (
                    <TableRow key={wl._id}>
                      <TableCell>{wl.symbol}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sector Leader</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Symbol</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sectorLeaders.map((sl) => (
                    <TableRow key={sl._id}>
                      <TableCell>{sl.sectorName}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

        </div>

         {message && (
          <Alert>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};


export default AdminDashboard;