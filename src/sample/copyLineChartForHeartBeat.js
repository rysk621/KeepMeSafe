import { Line } from "react-chartjs-2";
import 'chart.js/auto';

import React, { useEffect, useState } from "react";
import UseLogFetchData from "./UseLogFetchData";

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

  // workerLog 데이터 가져오기
  // useEffect(() => {
  //     fetch('http://10.125.121.204:8080/workerlog', {
  //       method: "GET",
  //     })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log("workerLogData: ", data)
  //       // 컴포넌트 마운트 시 workerLog 데이터로 차트 기본값 설정

  //       // 특정 workerId에 해당하는 데이터만 필터링
  //       const filteredData = data.filter(log => log.usercode === worker.id);


  //       const labels = filteredData.map(log => 
  //         new Date(log.registerDate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  //       );
  //       const heartbeats = filteredData.map(log => log.heartbeat);

  //       setChartData({
  //         labels: labels,
  //         datasets: [
  //           { ...chartData.datasets[0], data: heartbeats },
  //         ],
  //       });
  //     })
  //     .catch(error => console.error("Fetch error:", error));
  //   }, [worker.id]); // workerId를 의존성 배열에 추가

  // 컴포넌트 훅으로 UseLogFetchData 받아오기
  // useEffect(() => {
  //   UseLogFetchData(setChartData, worker);
  // }, [worker.id]);
  // useEffect(() => {
  //   UseLogFetchData(setChartData, worker);
  // }, []);

  // histotyData로 lineChart 그리기 
  // useEffect(() => {
  //   if (worker && worker.id && historyData[worker.id]) {
  //     const workerLogs = historyData[worker.id];
  //     console.log("workerLogs", workerLogs)

  //     // timestamp를 2024.01.01 오후12:00:00 형태로 변경
  //     const labels = workerLogs.map(log =>
  //       // 한국 시간으로 변경
  //       new Date(log.registerDate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  //     );
  //     const heartbeats = workerLogs.map(log => log.heartbeat);
  //     console.log("heartbeatdata", heartbeats)

  //     setChartData({
  //       labels: labels,
  //       datasets: [
  //         {
  //           label: "Heartbeat",
  //           data: heartbeats,
  //           borderColor: 'rgb(255, 99, 132)',
  //           backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //         },
  //       ],
  //     });
  //   }
  // }, []);

  console.log("Data for heartbeatData", worker)
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

  // workerData 변경 시 차트 데이터 업데이트 >> 이전 상태에 의존하는 업데이트를 정확히 처리하기 위해서는 함수형 업데이트 사용
  // useEffect(() => {
  //   if (worker && worker.registerDate) {
  //     const newLabel = new Date(worker.registerDate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  //     console.log("newLabel",newLabel)

  //     setChartData(chartData => {
  //       console.log("chartData.labels.length", chartData.labels.length)
  //       // const newLabels = chartData.labels.length >= 20 ? chartData.labels.slice(1).concat(newLabel) : chartData.labels.concat(newLabel)
  //       const newLabels = chartData.labels.concat(newLabel) 

  //       // console.log("slice1", chartData.labels.slice(1))
  //       console.log("newlabels", newLabels)
  //         // console.log("chartdatalabelconcat", chartData.labels.slice(1).concat(newLabel))

  //       const newHeartbeatData = chartData.datasets[0].data.length >= 20 
  //                                ? chartData.datasets[0].data.slice(1).concat(worker.heartbeat) : chartData.datasets[0].data.concat(worker.heartbeat);

  //       return {
  //         ...chartData,
  //         labels: newLabels,
  //         datasets: [
  //           {
  //             ...chartData.datasets[0],
  //             data: newHeartbeatData,
  //           }
  //         ],
  //       };
  //     });
  //   }
  // }, [worker.registerDate, worker.heartbeat]); // 의존성 배열에 worker.registerDate와 worker.heartbeat 포함

  return <Line data={chartData} />;
}

