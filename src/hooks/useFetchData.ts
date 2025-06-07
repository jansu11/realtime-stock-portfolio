import { SectorLeader, StockPosition, WatchlistStock } from "@/types";
import { useState, useEffect } from "react";
import apiUrl from "@/config/api";

const API_URL = `${apiUrl}/api/stocks/`;

export const useFetchData = () => {
  const [stockPositions, setOrderPositions] = useState<StockPosition[]>([]);
  const [watchlist, setWatchlist] = useState<WatchlistStock[]>([]);
  const [sectorLeader, setSectorLeader] = useState<SectorLeader[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const positionsRes = await fetch(`${API_URL}/agg-position`);
      const positionsData = await positionsRes.json();
      setOrderPositions(positionsData);

      const leaderRes = await fetch(`${API_URL}/sector-leaders`);
      const leaderData = await leaderRes.json();
      setSectorLeader(leaderData);

      const watchlistRes = await fetch(`${API_URL}/watchlist`);
      const watchlistData = await watchlistRes.json();
      setWatchlist(watchlistData);
    } catch (error) {
      setError("Error fetching data");
      console.error("Error fetching API data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 20000); // Refresh every 100s
    return () => clearInterval(interval);
  }, []);

  return { stockPositions, sectorLeader, watchlist, loading, error };
};

