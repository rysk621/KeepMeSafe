import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

/*
// 예시 1 (from Chart.js home page)
  // 차트에 표시될 데이터 포인트의 총 개수
  const DATA_COUNT = 5;
  // Utils.numbers함수에 전달될 설정 객체 -> 데이터 포인터 갯수(count), 최솟값(min), 최댓값(max) 지정
  const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

  // 차트에 표시될 실제 데이터와 이 데이터를 시각화하는 방법
  const data = {
    // 차트의 각 섹션에 대한 라벨
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    // 도넛 차트일 경우, 하나의 데이터 셋 이용
    datasets: [
        {
        label: 'Dataset 1',
        // 실제 데이터 차트 -> Utils.numbers(NUMBER_CFG)를 호출하여 무작위 숫자의 배열 생성 - 차트에서 각 섹션의 크기 결정
        data: Utils.numbers(NUMBER_CFG),
        // 각 차트 섹션의 배경색 지정 -> Object.values(Utils.CHART_COLORS)를 통해, Utils.CHART_COLORS 객체에서 색상 값의 배열을 추출
        backgroundColor: Object.values(Utils.CHART_COLORS),
        }
    ]
  };
  */

// 예시 2 (from searching)
// 차트 데이터와 설정
const data = {
  labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [300, 50, 100, 40, 120], // 예시 데이터
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
      ],
      borderWidth: 1,
    },
  ],
};

// 예시 3
const data1 = {
  labels: ['위험의심인원', '정상인원'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [5, 100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)'
      ],
      borderWidth: 1,
    },
  ],
};

// 도넛 차트 컴포넌트
const DoughnutChart = () => {
  return (
    <div style={{ width: '300px', height: '300px' }}>
      <Doughnut data={data} />
      <Doughnut data={data1} />
    </div>
  );
};

export default DoughnutChart;

