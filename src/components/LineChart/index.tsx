import { Line, LineConfig } from '@ant-design/charts';

const LineChart: React.FC = () => {
  const data = [
    { day: '11.10', value: 100 },
    { day: '12.10', value: 99 },
    { day: '13.10', value: 98 },
    { day: '14.10', value: 94 },
    { day: '15.10', value: 96 },
    { day: '16.10', value: 91 },
    { day: '17.10', value: 90 },
    { day: '18.10', value: 84 },
    { day: '19.10', value: 82 },
    { day: '20.10', value: 80 },
    { day: '21.10', value: 78 },
    { day: '22.10', value: 77 },
    { day: '23.10', value: 75 },
  ];

  const config: LineConfig = {
    data,
    height: 400,
    xField: 'day',
    yField: 'value',
  };
  return <Line {...config} />;
};

export default LineChart;
