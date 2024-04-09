// useWebSocket 커스텀 훅 정의
import { useState, useEffect } from 'react';

export const useWebSocket = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    
    socket.onopen = () => {
      console.log('WebSocket 연결!');
    };

    socket.onclose = (error) => {
      setError(error);
    };

    socket.onerror = (error) => {
      setError(error);
    };

    socket.onmessage = (event) => {
      setData(event.data);
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return { data, error };
};

// WebSocket 주소 : ws://10.125.121.204:8080/ws/emul