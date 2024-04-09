import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const DoughnutChartForCount = ({ safe, caution, warning }) => {

  const chartData = {
    labels: ['위험인원', '위험의심인원', '정상인원'],
    datasets: [
      {
        label: '현재현황차트',
        data: [warning, caution, safe],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 164, 96, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        // borderColor: [
        //   'rgb(255, 99, 132)',
        //   'rgb(255, 159, 64)'
        // ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    cutout: '70%', // 여기에서 굵기를 조절 -> 퍼센트나 픽셀 값으로 설정 가능
    responsive: true, // 부모 요소의 크기 변화에 따라 자동으로 크기 조정
    maintainAspectRatio: false // 부모 컨테이너에 꽉 차도록 비율 유지를 비활성화
  };
  return (
    <div className="flex justify-center items-center h-full lg:w-full">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DoughnutChartForCount;