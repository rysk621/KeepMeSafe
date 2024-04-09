// workerlog 데이터를 fetch로 받아오기
export default function UseLogFetchData(setChartData, workerData) {

  // 함수 호출 확인을 위한 로그 출력
  console.log("UseLogFetchData 함수가 호출되었습니다.");
  console.log("이거 받아오는거", workerData)

  fetch('http://10.125.121.204:8080/workerlog', {
    method: "GET",
  })
    .then(res => res.json())
    .then(data => {
      console.log("workerLogData: ", data)

      // 컴포넌트 마운트 시 workerLog 데이터로 차트 기본값 설정 : Line chart with history data
      // 특정 workerId에 해당하는 데이터만 필터링
      const filteredData = data.filter(log => log.usercode === workerData.id);
      console.log("필터 데이터", filteredData)

      // timestamp를 2024.01.01 오후12:00:00 형태로 변경
      const labels = filteredData.map(log =>
        // 한국 시간으로 변경
        new Date(log.registerDate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
      );
      const heartbeats = filteredData.map(log => log.heartbeat); // 심박수 데이터 처리
      console.log("심박수",heartbeats);
      const temperatures = filteredData.map(log => log.temperature); // 체온 데이터 처리
      const outTemps = filteredData.map(log => log.outTemp); // 체온 데이터 처리

      setChartData(historyChartData => ({
        labels,
        datasets: historyChartData.datasets.map(dataset => {
          if (dataset.label === "Heartbeat") {
            return { ...dataset, data: heartbeats }; // 심박수 데이터가 있는 경우만
          } else if (dataset.label === "Temperature") {
            return { ...dataset, data: temperatures }; // 체온 데이터가 있는 경우만
          } else if (dataset.label === "outTemp") {
            return { ...dataset, data: outTemps }; // 외부 데이터가 있는 경우만
          }
          return dataset;
        })
      }));
    })
    .catch(error => console.error("Fetch error:", error));
}

// import React, { useEffect } from 'react'

// export default function UseLogFetchData(setLogData) {
//   useEffect(() => {
//     console.log("UseLogFetchData 함수가 호출되었습니다.");

//     fetch('http://10.125.121.204:8080/workerlog', {
//       method: "GET",
//     })
//       .then(res => res.json())
//       .then(data => {
//         console.log("workerLogData: ", data);
//         setLogData(data); // 로그 데이터 설정
//       })
//       .catch(error => console.error("Fetch error:", error));
//   }, []);
// }

// export default function UseLogFetchData(setChartData, workerData) {

//   // 함수 호출 확인을 위한 로그 출력
//   console.log("UseLogFetchData 함수가 호출되었습니다.");
//   console.log("이거 받아오는거", workerData)

//   fetch('http://10.125.121.204:8080/workerlog', {
//     method: "GET",
//   })
//     .then(res => res.json())
//     .then(data => {
//       console.log("workerLogData: ", data[0].usercode)
//       console.log("asdf", workerData[0].id)

//       // 컴포넌트 마운트 시 workerLog 데이터로 차트 기본값 설정 : Line chart with history data
//       // 특정 workerId에 해당하는 데이터만 필터링
//       const filteredData = data.filter(log => log.usercode === workerData.id);
//       console.log("필터 데이터", filteredData)

//       // timestamp를 2024.01.01 오후12:00:00 형태로 변경
//       const labels = filteredData.map(log =>
//         // 한국 시간으로 변경
//         new Date(log.registerDate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
//       );
//       const heartbeats = filteredData.map(log => log.heartbeat); // 심박수 데이터 처리
//       console.log("심박수",heartbeats);
//       const temperatures = filteredData.map(log => log.temperature); // 체온 데이터 처리
//       const outTemps = filteredData.map(log => log.outTemp); // 체온 데이터 처리

//       setChartData(historyChartData => ({
//         labels,
//         datasets: historyChartData.datasets.map(dataset => {
//           if (dataset.label === "Heartbeat") {
//             return { ...dataset, data: heartbeats }; // 심박수 데이터가 있는 경우만
//           } else if (dataset.label === "Temperature") {
//             return { ...dataset, data: temperatures }; // 체온 데이터가 있는 경우만
//           } else if (dataset.label === "outTemp") {
//             return { ...dataset, data: outTemps }; // 외부 데이터가 있는 경우만
//           }
//           return dataset;
//         })
//       }));
//     })
//     .catch(error => console.error("Fetch error:", error));
// }




