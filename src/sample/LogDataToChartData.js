import React from 'react'

// export default function LogDataToChartData(logData, workerData) {
//     const filteredData = logData.filter(log => log.usercode === workerData.id);
//     console.log("필터 데이터", filteredData)

//     // timestamp를 2024.01.01 오후12:00:00 형태로 변경
//     const labels = filteredData.map(log =>
//         // 한국 시간으로 변경
//         new Date(log.registerDate).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
//     );
//     const heartbeats = filteredData.map(log => log.heartbeat); // 심박수 데이터 처리
//     const temperatures = filteredData.map(log => log.temperature); // 체온 데이터 처리
//     const outTemps = filteredData.map(log => log.outTemp); // 체온 데이터 처리

//     return {
//         labels,
//         datasets: [
//             {
//                 label: "Heartbeat",
//                 data: heartbeats,
//                 borderColor: 'rgb(255, 99, 132)',
//                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
//             },
//             {
//                 label: "Temperature",
//                 data: temperatures,
//                 borderColor: 'rgb(54, 162, 235)',
//                 backgroundColor: 'rgba(54, 162, 235, 0.5)',
//             },
//             {
//                 label: "outTemp",
//                 data: outTemps,
//                 borderColor: 'rgb(54, 162, 235)',
//                 backgroundColor: 'rgba(54, 162, 235, 0.5)',
//             },
//             // 추가 데이터셋을 여기에 포함시킬 수 있습니다.
//         ]
//     };

// }
