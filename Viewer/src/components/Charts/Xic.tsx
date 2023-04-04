import {buildDataForTargetXIC} from '@/components/Charts/DataBuilder';
import {
  createGridsAndTitles,
  XicCol,
  XicGridBaseLeft, XicGridBaseRight,
  XicGridBaseTop,
  XicGridHeight,
  XicGridHeightGap,
  XicGridWidthGap,
} from '@/components/Charts/LayoutBuilder';
import type {RunXic, TargetPoint} from '@/domains/Analyse.d';
import * as echarts from 'echarts';

export const renderXICMatrix = (divId: string, runXics: RunXic[]) => {
  const chartDataMatrix = buildDataForTargetXIC(runXics);
  const chartDiv: any = document.getElementById(divId);
  const chart = echarts.init(chartDiv);
  const series: any[] = [];
  const xAxises: any[] = [];
  const yAxises: any[] = [];
  const {grids, titles} = createGridsAndTitles(
    XicCol,
    runXics.length,
    XicGridWidthGap,
    XicGridHeightGap,
    XicGridHeight,
    XicGridBaseLeft,
    XicGridBaseRight,
    XicGridBaseTop,
    runXics.map(runXic => runXic.ordinal)
  );
  chartDataMatrix.forEach((chartData, index) => {
    const runXic = runXics[index];
    chartData.forEach((xic: any, i: number) => {
      series.push({
        id: runXic.runId + '-' + runXic.points[i].targetName,
        type: 'line',
        data: xic,
        name: runXic.points[i].targetName,
        symbol: 'none',
        lineStyle: {
          width: 1,
        },
        xAxisIndex: index,
        yAxisIndex: index,
      });
    });
    // @ts-ignore
    titles[index].text = runXic.runName;
    // @ts-ignore
    titles[index].textStyle = {
      fontSize: 10,
      fontWeight: 'normal',
    };
    xAxises.push({
      type: 'value',
      show: false,
      min: 'dataMin',
      max: 'dataMax',
      gridIndex: index,
    });
    yAxises.push({
      type: 'value',
      show: false,
      gridIndex: index,
    });
  });
  const option = {
    title: titles,
    xAxis: xAxises,
    grid: grids,
    yAxis: yAxises,
    legend: {
      show: true,
    },
    series: series,
    animation: false,
    tooltip: {
      trigger: 'axis',
      textStyle: {
        fontSize: 12,
      },
      formatter: function (params: any) {
        let label = '';
        if (params.length === 0) {
          return;
        }
        label += 'RT: ' + (params[0].data[0] ? params[0].data[0].toFixed(5) : '') + '</br>';
        params.forEach((param: any) => {
          label += '<strong>' + param.seriesName + '</strong></br>';
          label +=
            'Intensity: ' +
            (param.data[1] > 10000 ? param.data[1].toExponential(2) : param.data[1]);
          label += '</br>';
        });

        return label;
      },
    },
  };

  chart.clear();
  chart.setOption(option);
  return chart;
};

/**
 * 构建XicInOne图
 * @param divId
 * @param runXics
 */
export const renderXicInOne = (divId: string, runXics: RunXic[]) => {
  const chartDataMatrix = buildDataForTargetXIC(runXics);
  const chartDiv: any = document.getElementById(divId);
  const chart = echarts.init(chartDiv);
  const series: any[] = [];
  runXics.forEach((runXic: any, index: number) => {
    runXic.points.forEach((point: TargetPoint, targetIdx: number) => {
      series.push({
        // id: runXic.ordinal + '-' + runXic.runType,
        type: 'line',
        name: point.targetName,
        data: chartDataMatrix[index][targetIdx],
        symbolSize: 8,
        symbol: 'none',
      });
    });
  });

  const option = {
    xAxis: {
      type: 'value',
      min: 'dataMin',
      max: 'dataMax',
      scale: true,
      splitLine: {
        show: false,
      },
      axisLabel: {
        formatter: function (params: any) {
          return params.toFixed(2);
        },
      },
    },
    yAxis: {
      type: 'value',
      scale: true,
      splitLine: {
        show: false,
      },
      axisLabel: {
        formatter: function (params: any) {
          if (params <= 1000) {
            return params;
          }
          return params.toExponential();
        },
      },
    },

    legend: {
      show: true,
    },
    dataZoom: {
      type: 'inside',
    },
    series: series,
    animation: false,
  };

  chart.clear();
  chart.setOption(option);
  return chart;
};
