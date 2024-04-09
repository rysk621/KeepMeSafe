import { Line } from "react-chartjs-2";
import 'chart.js/auto';

import React, { useEffect, useState } from "react";

export default function LineChartForHeartBeat({ worker }) {

  const [chartData, setChartData] = useState({
    labels: [], // x축 레이블 초기화
    datasets: [
      {
        label: "Heartbeat",
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  });

  useEffect(() => {
    if (worker) {
      // const labels = worker.list.map(item => new Date(item.regidate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
      // const heartbeats = worker.list.map(item => item.heartbeat);

      // 새로운 데이터로부터 라벨과 데이터 포인트를 생성
      const labels = worker.list.map(item =>
        new Date(item.regidate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
      const heartbeats = worker.list.map(item => item.heartbeat);

      // 새 데이터를 현재 데이터에 추가
      let updatedLabels = [...chartData.labels, ...labels];
      let updatedHeartbeats = [...chartData.datasets[0].data, ...heartbeats];

      // 데이터 포인트의 개수가 20개를 초과하면 가장 오래된 데이터를 제거
      if (updatedLabels.length > 20) {
        updatedLabels = updatedLabels.slice(updatedLabels.length - 20);
        updatedHeartbeats = updatedHeartbeats.slice(updatedHeartbeats.length - 20);
      }

      setChartData({
        labels: updatedLabels,
        datasets: [
          {
            label: "Heartbeat",
            data: updatedHeartbeats,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      });
    }
  }, [worker]); // workerData가 변경될 때마다 이 useEffect가 실행됩니다.

  return <Line data={chartData} />;
}

