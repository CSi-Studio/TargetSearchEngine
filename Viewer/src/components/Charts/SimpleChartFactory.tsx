import * as echarts from 'echarts';

export function buildSimplePie(div: any, dataList: any) {
  const chart = echarts.init(div);
  chart.setOption({
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        label: {
          position: 'outer',
          formatter: '{b}: {d}%',
          overflow: 'break',
        },
        data: dataList,
      },
    ],
  });
  return chart;
}

export function buildLogo(div: any, fontSize: number, logo: string) {
  const chart = echarts.init(div);
  chart.setOption({
    graphic: {
      elements: [
        {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: logo,
            fontSize: fontSize,
            fontWeight: 'bold',
            lineDash: [0, 200],
            lineDashOffset: 0,
            fill: 'transparent',
            stroke: 'blue',
            lineWidth: 1,
          },
          keyframeAnimation: {
            duration: 2000,
            loop: true,
            keyframes: [
              {
                percent: 0.7,
                style: {
                  fill: 'transparent',
                  lineDashOffset: 200,
                  lineDash: [200, 0],
                },
              },
              {
                // Stop for a while.
                percent: 0.8,
                style: {
                  fill: 'transparent',
                },
              },
              {
                percent: 1,
                style: {
                  fill: 'transparent',
                },
              },
            ],
          },
        },
      ],
    },
  });
}

export function buildBarForTrace(div: any, dataList: any) {
  const chart = echarts.init(div);
  chart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      top: 10,
      left: 5,
      right: 60,
      bottom: 10,
      containLabel: true,
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      inverse: true,
    },
    series: [
      {
        realtimeSort: true,
        type: 'bar',
        data: dataList,
        label: {
          show: true,
          position: 'right',
          formatter: function (params: any) {
            return params.data[0] + '小时';
          },
        },
      },
    ],
  });
  return chart;
}
