import { Line } from "react-chartjs-2";
import 'chart.js/auto';

import { useEffect, useState } from "react";

// import { UseFetchData } from "./UseFetchData";
// import { realDataForLineChart } from "../sample/realDataForLineChart";
// import UseLogFetchData from "./UseLogFetchData";

// Line Chart with sample data
// export default function LineChartForAll() {
//     const [sampleData, setSamleData] = useState(realDataForLineChart)

//     const data = {
//         labels : sampleData.map(xColumn => xColumn.time),
//         datasets : [
//             {
//                 label : "Heartbeat",
//                 data : sampleData.map(yColumn => yColumn.heartbeat),
//                 borderColor: 'rgb(255, 153, 153)', 
//                 backgroundColor: 'rgba(255, 153, 153, 0.5)'
//             },
//             {
//                 label : "Temperature",
//                 data : sampleData.map(yColumn => yColumn.temp),
//                 borderColor: 'rgb(102, 153, 255)', 
//                 backgroundColor: 'rgba(102, 153, 255, 0.5)',
//             }
//         ]
//     }
//     const options = {
//       responsive: true, // 부모 요소의 크기 변화에 따라 자동으로 크기 조정
//       maintainAspectRatio: false, // 이 옵션을 false로 설정하여 차트의 가로 세로 비율을 유지하지 않음
//     };

//   return (
//     // w-full h-full lg:w-full 이렇게 설정해줌으로써 차트가 화면 크기에 맞게 정중앙에 꽉채워지도록 할 수 있다
//     <div className="flex justify-center items-center" style={{ width: '100%', height: '100%' }}>
//       <Line data={data} options={options} />
//     </div>
//   )
// }

// Line chart with real data from Back-end
export default function LineChartForAll({ workerData }) {

  console.log("workerData for LineChart", workerData)

  // 초기 차트 데이터 상태는 빈 배열로 시작
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Heartbeat",
        data: [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: "Temperature",
        data: [],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }
    ],
  });

  useEffect(() => {
    if (workerData) {
      const labels = workerData.map(item => new Date(item.regidate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
      const heartbeats = workerData.map(item => item.heartbeat);
      const temperatures = workerData.map(item => item.temperature);

      // // 새로운 데이터로부터 라벨과 데이터 포인트를 생성
      // const labels = workerData.map(item =>
      //   new Date(item.regidate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
      // const heartbeats = workerData.map(item => item.heartbeat);
      // const temperatures = workerData.map(item => item.temperature);

      // // 새 데이터를 현재 데이터에 추가
      // let updatedLabels = [...chartData.labels, ...labels];
      // let updatedHeartbeats = [...chartData.datasets[0].data, ...heartbeats];
      // let updatedTemperatures = [...chartData.datasets[1].data, ...temperatures];

      // // 데이터 포인트의 개수가 20개를 초과하면 가장 오래된 데이터를 제거
      // if (updatedLabels.length > 20) {
      //   updatedLabels = updatedLabels.slice(updatedLabels.length - 20);
      //   updatedHeartbeats = updatedHeartbeats.slice(updatedHeartbeats.length - 20);
      //   updatedTemperatures = updatedTemperatures.slice(updatedTemperatures.length - 20);
      // }

      setChartData({
        labels: labels.slice(-20),
        datasets: [
          {
            label: "Heartbeat",
            data: heartbeats.slice(-20),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: "Temperature",
            data: temperatures.slice(-20),
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          }
        ],
      });
    }
  }, [workerData]); // workerData가 변경될 때마다 이 useEffect가 실행됩니다.

  // x축 라벨을 숨기기 위한 옵션 객체 정의
  const options = {
    scales: {
      x: { // 'x' 축 설정
        title: {
          display: true, // 제목을 표시함
          text: 'Time', // 표시할 텍스트
          color: '#666', // 제목의 색상
          font: {
            size: 14 // 폰트 크기
          }
        },
        ticks: {
          // 모든 x축 라벨을 빈 문자열로 반환하여 숨김
          callback: function (value, index, values) {
            return ''; // 라벨 대신 빈 문자열 반환
          }
        }
      }
    },
    responsive: true, // 반응형 차트 설정
    maintainAspectRatio: false // 가로 세로 비율 유지 안 함
  };

  return <Line data={chartData} options={options} />;
}

