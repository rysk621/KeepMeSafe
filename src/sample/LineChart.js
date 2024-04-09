import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

import { useState } from 'react';
import { realDataForLineChart } from './realDataForLineChart';

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']; //x축 기준

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: '분류 1', //그래프 분류되는 항목
//       data: [1, 2, 3, 4, 5, 6, 7], //실제 그려지는 데이터(Y축 숫자)
//       borderColor: 'rgb(255, 99, 132)', //그래프 선 color
//       backgroundColor: 'rgba(255, 99, 132, 0.5)', //마우스 호버시 나타나는 분류네모 표시 bg
//     },
//     {
//       label: '분류 2',
//       data: [2, 3, 4, 5, 4, 7, 8],
//       borderColor: 'rgb(53, 162, 235)', //실제 그려지는 데이터(Y축 숫자)
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

// const LineChart = () => {
//     const [sample, setSemple] = useState(realDataForLineChart) // time 데이터 가져오기
// // 
//     const data = {
//         labels: sample.map(s => s.time), // 시간 라벨(X축)
//         datasets: [
//             {
//                 label: 'Heartbeat', //그래프 분류되는 항목
//                 data: sample.map(s => s.heartbeat), //실제 그려지는 데이터(Y축 숫자)
//                 borderColor: 'rgb(255, 99, 132)', //그래프 선 color
//                 backgroundColor: 'rgba(255, 99, 132, 0.5)', //마우스 호버시 나타나는 분류네모 표시 bg
//             },
//             {
//                 label: 'Temperature',
//                 data: sample.map(s => s.temp),
//                 borderColor: 'rgb(53, 162, 235)', //실제 그려지는 데이터(Y축 숫자)
//                 backgroundColor: 'rgba(53, 162, 235, 0.5)',
//             },
//         ],
//     };
//     return (
//         <div className='contentWrap'>
//             <div className='contentInner w-96 h-96'>
//                 <Line data={data} />
//             </div>
//         </div>
//     );
// }

// export default LineChart

const LineChart = () => {
    const [sample, setSemple] = useState(realDataForLineChart) // time 데이터 가져오기

    const data = {
        labels: [1,2, 3, 4, 5], // 시간 라벨(X축)
        datasets: [
            {
                label: 'Heartbeat', //그래프 분류되는 항목
                data: [1], //실제 그려지는 데이터(Y축 숫자)
                borderColor: 'rgb(255, 99, 132)', //그래프 선 color
                backgroundColor: 'rgba(255, 99, 132, 0.5)', //마우스 호버시 나타나는 분류네모 표시 bg
            },
            {
                label: 'Temperature',
                data: [55],
                borderColor: 'rgb(53, 162, 235)', //실제 그려지는 데이터(Y축 숫자)
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return (
        <div className='contentWrap'>
            <div className='contentInner w-96 h-96'>
                <Line data={data} />
            </div>
        </div>
    );
}

export default LineChart