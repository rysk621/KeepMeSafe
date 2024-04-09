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

  console.log("newWorkerdata", workerData)


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

  // workerLog 데이터 가져오기
  // useEffect(() => {
  //   fetch('http://10.125.121.204:8080/workerlog', {
  //     method: "GET",
  //   })
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log("workerLogData: ", data)

  //     // 컴포넌트 마운트 시 workerLog 데이터로 차트 기본값 설정
  //     // 특정 workerId에 해당하는 데이터만 필터링
  //     const filteredData = data.filter(log => log.usercode === workerData.id);

  //     const labels = filteredData.map(log => 
  //       new Date(log.registerDate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  //     );
  //     const heartbeats = filteredData.map(log => log.heartbeat);
  //     const temperatures = filteredData.map(log => log.temperature);

  //     setChartData({
  //       labels: labels,
  //       datasets: [
  //         { ...chartData.datasets[0], data: heartbeats },
  //         { ...chartData.datasets[1], data: temperatures },
  //       ],
  //     });
  //   })
  //   .catch(error => console.error("Fetch error:", error));
  // }, [workerData.id]); // workerId를 의존성 배열에 추가

  //  컴포넌트 훅으로 UseLogFetchData 받아오기
  // useEffect(() => {
  //   UseLogFetchData(setChartData, workerData);
  // }, []);


  // histotyData로 lineChart 그리기
  // useEffect(() => {
  //   if (workerData && workerData.id && historyData[workerData.id]) {
  //     const workerLogs = historyData[workerData.id];

  //     // timestamp를 2024.01.01 오후12:00:00 형태로 변경
  //     const labels = workerLogs.map(log =>
  //       // 한국 시간으로 변경
  //       new Date(log.registerDate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  //     );
  //     console.log("labels", labels)
  //     const heartbeats = workerLogs.map(log => log.heartbeat);
  //     const temperatures = workerLogs.map(log => log.temperature);

  //     setChartData({
  //       labels: labels,
  //       datasets: [
  //         {
  //           label: "Heartbeat",
  //           data: heartbeats,
  //           borderColor: 'rgb(255, 99, 132)',
  //           backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //         },
  //         {
  //           label: "Temperature",
  //           data: temperatures,
  //           borderColor: 'rgb(54, 162, 235)',
  //           backgroundColor: 'rgba(54, 162, 235, 0.5)',
  //         }
  //       ],
  //     });
  //   }
  // }, [historyData]);


  useEffect(() => {
    if (workerData) {
      // const labels = workerData.map(item => new Date(item.regidate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
      // const heartbeats = workerData.map(item => item.heartbeat);
      // const temperatures = workerData.map(item => item.temperature);

      // 새로운 데이터로부터 라벨과 데이터 포인트를 생성
      const labels = workerData.map(item =>
        new Date(item.regidate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
      const heartbeats = workerData.map(item => item.heartbeat);
      const temperatures = workerData.map(item => item.temperature);

      // 새 데이터를 현재 데이터에 추가
      let updatedLabels = [...chartData.labels, ...labels];
      let updatedHeartbeats = [...chartData.datasets[0].data, ...heartbeats];
      let updatedTemperatures = [...chartData.datasets[1].data, ...temperatures];

      // 데이터 포인트의 개수가 20개를 초과하면 가장 오래된 데이터를 제거
      if (updatedLabels.length > 20) {
        updatedLabels = updatedLabels.slice(updatedLabels.length - 20);
        updatedHeartbeats = updatedHeartbeats.slice(updatedHeartbeats.length - 20);
        updatedTemperatures = updatedTemperatures.slice(updatedTemperatures.length - 20);
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
          {
            label: "Temperature",
            data: updatedTemperatures,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          }
        ],
      });
    }
  }, [workerData]); // workerData가 변경될 때마다 이 useEffect가 실행됩니다.

  // workerData 변경 시 차트 데이터 업데이트
  // useEffect(() => {
  //   if (workerData && workerData.registerDate) {

  //     // 현재 시간 또는 순차적 인덱스를 labels 배열에 추가
  //     // const newLabel = new Date().toLocaleTimeString(); // 현재 시간을 사용
  //     // const newLabels = chartData.labels.length >= 20 ? chartData.labels.slice(1).concat(newLabel) : chartData.labels.concat(newLabel);

  //     // 새로운 라벨 추가
  //     const newLable = new Date(workerData.registerDate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  //     // 배열의 크기가 20을 초과하지 않도록 유지하면서 새로운 데이터가 추가될 때 가장 오래된 데이터를 배열에서 제거하는 로직을 포함
  //     // 만약 labels 배열의 길이가 20 이상이면, 가장 오래된 라벨을 제거하고 newLabel을 배열 끝에 추가
  //     const newLabels = chartData.labels.length >= 20
  //       ? chartData.labels.slice(1).concat(newLable) : chartData.labels.concat(newLable)

  //     // 실시간 데이터 값을 각 데이터셋에 추가(차트 데이터(심박수, 체온) 셋 업데이트)
  //     // 이 배열들도 최대 20개의 데이터 포인트만 유지하며, 새 데이터가 들어올 때마다 가장 오래된 데이터를 제거
  //     const newHeartbeatData = chartData.datasets[0].data.length >= 20 ? chartData.datasets[0].data.slice(1).concat(workerData.heartbeat) : chartData.datasets[0].data.concat(workerData.heartbeat);
  //     const newTemperatureData = chartData.datasets[1].data.length >= 20 ? chartData.datasets[1].data.slice(1).concat(workerData.temperature) : chartData.datasets[1].data.concat(workerData.temperature);

  //     // 차트 데이터 상태를 새로운 라벨과 데이터셋으로 업데이트합
  //     const updatedChartData = {
  //       labels: newLabels,
  //       datasets: [
  //         {
  //           ...chartData.datasets[0],
  //           data: newHeartbeatData,
  //         },
  //         {
  //           ...chartData.datasets[1],
  //           data: newTemperatureData,
  //         }
  //       ],
  //     };

  //     setChartData(updatedChartData);
  //   }
  //   // workerData.registerDate가 변경 될때마다 차트 데이터가 업데이트 되도록 함
  // }, [workerData.registerDate]);

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

