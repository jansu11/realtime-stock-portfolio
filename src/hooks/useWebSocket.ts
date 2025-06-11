// hooks/useWebSocket.ts
import { useEffect, useState, useCallback, useRef } from "react";
import { WebSocketMessage } from "@/types/websocket";

export const useWebSocket = (url: string) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [data, setData] = useState<WebSocketMessage | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isError, setIsError] = useState(false);

  const connect = useCallback(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      setIsError(false);
      console.log("✅ WebSocket connected");
    };

    socket.onmessage = (event) => {
      try {
        const parsedData: WebSocketMessage = JSON.parse(event.data);
        setData(parsedData);
      } catch (error) {
        console.error("❌ Invalid WebSocket message format", error);
      }
    };

    socket.onerror = (error) => {
      setIsError(true);
      console.error("🚨 WebSocket error", error);
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.warn("🔌 WebSocket disconnected, retrying...");
      setTimeout(connect, 3000);
    };
  }, [url]);

  useEffect(() => {
    connect();

    return () => {
      socketRef.current?.close();
    };
  }, [connect]);

  return { data, isConnected, isError };
};
