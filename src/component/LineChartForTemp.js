import { Line } from "react-chartjs-2";
import 'chart.js/auto';

import { useEffect, useState } from "react";

export default function LineChartForTemp({ worker }) {

  const [chartData, setChartData] = useState({
    labels: [], // x축 레이블 초기화
    datasets: [
      {
        label: "Temperature",
        data: [],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: "outTemp",
        data: [],
        borderColor: 'rgb(153, 204, 102)',
        backgroundColor: 'rgba(153, 204, 102, 0.5)',
      }
    ],
  });

  useEffect(() => {
    if (worker) {
      const labels = worker.list.map(item => new Date(item.regidate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
      const temperatures = worker.list.map(item => item.temperature);
      const outTemps = worker.list.map(item => item.outTemp);
    
          // 새 데이터를 현재 데이터에 추가
          let updatedLabels = [...chartData.labels, ...labels];
          let updatedTemperatures = [...chartData.datasets[0].data, ...temperatures];
          let updatedOutTemps = [...chartData.datasets[1].data, ...outTemps];
    
          // 데이터 포인트의 개수가 20개를 초과하면 가장 오래된 데이터를 제거
          if (updatedLabels.length > 20) {
            updatedLabels = updatedLabels.slice(updatedLabels.length - 20);
            updatedTemperatures = updatedTemperatures.slice(updatedTemperatures.length - 20);
            updatedOutTemps = updatedOutTemps.slice(updatedOutTemps.length - 20);
          }
    
          setChartData({
            labels: updatedLabels,
            datasets: [
              {
                label: "Tempereature",
                data: updatedTemperatures,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
              },
              {
                label: "outTemp",
                data: updatedOutTemps,
                borderColor: 'rgb(153, 204, 102)',
                backgroundColor: 'rgba(153, 204, 102, 0.5)',
              },
            ],
          });
        }
      }, [worker]); // workerData가 변경될 때마다 이 useEffect가 실행됩니다.
    
      return <Line data={chartData} />;
    }
    

    