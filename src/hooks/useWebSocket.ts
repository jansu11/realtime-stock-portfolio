// hooks/useWebSocket.ts

import { useEffect, useState, useCallback } from "react";
import { WebSocketMessage, IndexData, StockData } from "../types/websocket";
import { useFetchData } from "./useFetchData";
// Type guard to check if data has the expected properties

export const useWebSocket = (url: string) => {
  const [data, setData] = useState<WebSocketMessage | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isError, setIsError] = useState(false);

  const connect = useCallback(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      setIsConnected(true);
      setIsError(false);
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      try {
        // Parse the incoming message
        const parsedData: WebSocketMessage = JSON.parse(event.data)[0];
        // Use the type guard to check if the data is valid
          // If valid, update the state
        setData(parsedData)
        } catch (error) {

        console.error("Invalid WebSocket message format", error);
      }
    };

    socket.onerror = (error) => {
      setIsError(true);
      console.error("WebSocket error", error);
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket disconnected, retrying...");
      setTimeout(connect, 3000); // Reconnect after 3 seconds
    };

    return socket;
  }, [url]);

  useEffect(() => {
    const socket = connect();

    return () => {
      socket.close();
    };
  }, [connect]);

  return { data, isConnected, isError };
};
