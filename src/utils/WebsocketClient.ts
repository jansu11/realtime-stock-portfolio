// utils/WebSocketClient.ts

import { WebSocketMessage } from "../types/websocket";

export class WebSocketClient {
  private socket: WebSocket | null = null;
  private url: string;
  private listeners: ((message: WebSocketMessage) => void)[] = [];

  constructor(url: string) {
    this.url = url;
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log("WebSocket connected");
    };

    this.socket.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        this.listeners.forEach((callback) => callback(data));
      } catch (error) {
        console.error("Invalid WebSocket message format", error);
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected, retrying in 3s...");
      setTimeout(() => this.connect(), 3000);
    };
  }

  sendMessage(message: WebSocketMessage) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  addListener(callback: (message: WebSocketMessage) => void) {
    this.listeners.push(callback);
  }
}
