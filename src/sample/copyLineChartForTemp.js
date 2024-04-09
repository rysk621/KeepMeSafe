import { Line } from "react-chartjs-2";
import 'chart.js/auto';

import { useEffect, useState } from "react";
import UseLogFetchData from "./UseLogFetchData";

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


  // workerLog 데이터 가져오기
  // useEffect(() => {
  //     fetch('http://10.125.121.204:8080/workerlog', {
  //       method: "GET",
  //     })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log("workerLogData: ", data)
  //       // 컴포넌트 마운트 시 workerLog 데이터로 차트 기본값 설정
  //       // 초기 10개 데이터 설정

  //       // 특정 workerId에 해당하는 데이터만 필터링
  //       const filteredData = data.filter(log => log.usercode === worker.id);


  //       const labels = filteredData.map(log => 
  //         new Date(log.registerDate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  //       );
  //       const temperature = filteredData.map(log => log.temperature);
  //       const outTemp = filteredData.map(log => log.outTemp);

  //       setChartData({
  //         labels: labels,
  //         datasets: [
  //           { ...chartData.datasets[0], data: temperature },
  //           { ...chartData.datasets[1], data: outTemp },
  //         ],
  //       });
  //     })
  //     .catch(error => console.error("Fetch error:", error));
  //   }, [worker.id]); // workerId를 의존성 배열에 추가

  // 컴포넌트 훅으로 UseLogFetchData 받아오기
  // useEffect(() => {
  //   UseLogFetchData(setChartData, worker)
  // }, [])

  // useEffect(() => {
  //   UseLogFetchData(setChartData, worker)
  // }, [worker.id])

  // histotyData로 lineChart 그리기
  // useEffect(() => {
  //   if (worker && worker.id && historyData[worker.id]) {
  //     const workerLogs = historyData[worker.id];

  //     // timestamp를 2024.01.01 오후12:00:00 형태로 변경
  //     const labels = workerLogs.map(log =>
  //       // 한국 시간으로 변경
  //       new Date(log.registerDate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  //     );
  //     const temperatures = workerLogs.map(log => log.temperature);
  //     const outTemps = workerLogs.map(log => log.outTemp);

  //     setChartData({
  //       labels: labels,
  //       datasets: [
  //         {
  //           label: "Temperature",
  //           data: temperatures,
  //           borderColor: 'rgb(54, 162, 235)',
  //           backgroundColor: 'rgba(54, 162, 235, 0.5)',
  //         },
  //         {
  //           label: "outTemp",
  //           data: outTemps,
  //           borderColor: 'rgb(153, 204, 102)',
  //           backgroundColor: 'rgba(153, 204, 102, 0.5)',
  //         },
  //       ],
  //     });
  //   }
  // }, [worker.id, historyData]);

  useEffect(() => {
    if (worker) {
      const labels = worker.list.map(item => new Date(item.regidate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
      const temperatures = worker.list.map(item => item.temperature);
      const outTemps = worker.list.map(item => item.outTemp);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Temperature",
            data: temperatures,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          },
          {
            label: "outTemp",
            data: outTemps,
            borderColor: 'rgb(153, 204, 102)',
            backgroundColor: 'rgba(153, 204, 102, 0.5)',
          },
        ],
      });
    }
  }, [worker]); // workerData가 변경될 때마다 이 useEffect가 실행됩니다.

  // useEffect(() => {
  //   if (worker && worker.registerDate && chartData.labels.length > 0) {

  //     // 현재 시간 또는 순차적 인덱스를 labels 배열에 추가
  //     // const newLabel = new Date().toLocaleTimeString(); // 현재 시간을 사용
  //     // const newLabels = chartData.labels.length >= 20 ? chartData.labels.slice(1).concat(newLabel) : chartData.labels.concat(newLabel);


  //     // 배열의 크기가 20을 초과하지 않도록 유지하면서 새로운 데이터가 추가될 때 가장 오래된 데이터를 배열에서 제거하는 로직을 포함
  //     const newLable = new Date(worker.registerDate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  //     // 만약 labels 배열의 길이가 20 이상이면, 가장 오래된 라벨을 제거하고 newLabel을 배열 끝에 추가
  //     const newLabels = chartData.labels.length >= 20
  //       ? chartData.labels.slice(1).concat(newLable) : chartData.labels.concat(newLable)

  //     // 실시간 데이터 값을 각 데이터셋에 추가(차트 데이터(체온, 외부온도) 셋 업데이트)
  //     // 이 배열들도 최대 20개의 데이터 포인트만 유지하며, 새 데이터가 들어올 때마다 가장 오래된 데이터를 제거
  //     const newTemperatureData = chartData.datasets[0].data.length >= 20 ? chartData.datasets[0].data.slice(1).concat(worker.temperature) : chartData.datasets[0].data.concat(worker.temperature);
  //     const newOutTemperatureData = chartData.datasets[1].data.length >= 20 ? chartData.datasets[1].data.slice(1).concat(worker.outTemp) : chartData.datasets[1].data.concat(worker.outTemp);

  //     // 차트 데이터 상태를 새로운 라벨과 새로운 데이터셋으로 업데이트
  //     const updatedChartData = {
  //       labels: newLabels,
  //       datasets: [
  //         {
  //           ...chartData.datasets[0],
  //           data: newTemperatureData,
  //         },
  //         {
  //           ...chartData.datasets[1],
  //           data: newOutTemperatureData,
  //         }
  //       ],
  //     };
      
  //     setChartData(updatedChartData);
  //   }
  //   // worker.registerDate가 변경 될때마다 차트 데이터가 업데이트 되도록 함
  // }, [worker.registerDate]);

  return <Line data={chartData} />;
}

