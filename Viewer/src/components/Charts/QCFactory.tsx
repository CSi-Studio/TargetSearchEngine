import {builder} from '@/components/Charts/Factory';
import {
  ColumnCol,
  ColumnGridBaseLeft, ColumnGridBaseRight,
  ColumnGridBaseTop,
  ColumnGridHeight,
  ColumnGridHeightGap,
  ColumnGridWidthGap,
  createGridsAndTitles,
} from '@/components/Charts/LayoutBuilder';
import {range} from '@/components/Commons/Math';
import {RunType} from '@/components/Enums/Const';
import type {TargetReport} from '@/domains/Target.d';
import * as echarts from 'echarts';
import {dataChanger} from "@/components/Charts/Spectra";

//预质控界面质量精度稳定性图
export function renderInsMassAccuracyCharts(
  massAccuracyDiv: any,
  report: TargetReport,
  caller: any,
) {
  const massAccuracyChart = echarts.init(massAccuracyDiv);
  const massAccuracySeries: any[] = [];
  const sampleRunList = report.sampleRuns;
  const mixRunList = report.mixRuns;
  const sampleMassAccuracyMap = report.sampleMassAccuracyMap;
  const mixMassAccuracyMap = report.mixMassAccuracyMap;
  let sampleMax = {x: 0, y: Number.MIN_VALUE};
  let sampleMin = {x: 0, y: Number.MAX_VALUE};
  let mixMax = {x: 0, y: Number.MIN_VALUE};
  let mixMin = {x: 0, y: Number.MAX_VALUE};
  const createSeries = (targetName: string, statistic: any, data: any, index: number) => {
    return {
      type: 'line',
      name: targetName,
      data: data,
      xAxisIndex: index,
      yAxisIndex: index,
      smooth: true,
    };
  };
  const createEffectSeries = (name: string, data: any, index: number) => {
    return {
      type: 'effectScatter',
      name: name,
      symbolSize: 10,
      rippleEffect: {
        color: 'red',
      },
      label: {
        show: true,
        position: 'left',
        formatter: function (params: any) {
          return params.data[1].toFixed(3);
        },
        color: 'blue',
      },
      xAxisIndex: index,
      yAxisIndex: index,
      data: data,
    };
  };

  const legendData: any[] = [];

  Object.keys(sampleMassAccuracyMap).forEach((targetName) => {
    const sampleStatistic = sampleMassAccuracyMap[targetName];
    const mixStatistic = mixMassAccuracyMap[targetName];
    const sampleMassAccuracyData = [];
    const mixMassAccuracyData = [];
    for (let i = 0; i < sampleRunList.length; i++) {
      sampleMassAccuracyData.push([
        sampleRunList[i].ordinal,
        sampleStatistic.values[i],
        targetName,
      ]);
    }
    for (let i = 0; i < mixRunList.length; i++) {
      mixMassAccuracyData.push([mixRunList[i].ordinal, mixStatistic.values[i], targetName]);
    }

    sampleMax =
      sampleStatistic.max > sampleMax.y
        ? {
          x: sampleRunList[sampleStatistic.values.indexOf(sampleStatistic.max)].ordinal,
          y: sampleStatistic.max,
        }
        : sampleMax;
    sampleMin =
      sampleStatistic.min < sampleMin.y
        ? {
          x: sampleRunList[sampleStatistic.values.indexOf(sampleStatistic.min)].ordinal,
          y: sampleStatistic.min,
        }
        : sampleMin;
    mixMax =
      mixStatistic.max > mixMax.y
        ? {
          x: mixRunList[mixStatistic.values.indexOf(mixStatistic.max)].ordinal,
          y: mixStatistic.max,
        }
        : mixMax;
    mixMin =
      mixStatistic.min < mixMin.y
        ? {
          x: mixRunList[mixStatistic.values.indexOf(mixStatistic.min)].ordinal,
          y: mixStatistic.min,
        }
        : mixMin;

    const sampleSeries = createSeries(targetName, sampleStatistic, sampleMassAccuracyData, 0);
    const mixSeries = createSeries(targetName, mixStatistic, mixMassAccuracyData, 1);
    legendData.push(sampleSeries.name);
    massAccuracySeries.push(sampleSeries);
    massAccuracySeries.push(mixSeries);
  });

  const effectScatterSampleSeries = createEffectSeries(
    'sampleScatter',
    [
      [sampleMax.x, sampleMax.y],
      [sampleMin.x, sampleMin.y],
    ],
    0,
  );
  const effectScatterMixSeries = createEffectSeries(
    'mixScatter',
    [
      [mixMax.x, mixMax.y],
      [mixMin.x, mixMin.y],
    ],
    1,
  );
  massAccuracySeries.push(effectScatterSampleSeries);
  massAccuracySeries.push(effectScatterMixSeries);

  const legend = {
    orient: 'horizontal',
    left: 'left',
    icon: 'circle',
    show: true,
    padding: 2,
    align: 'left',
    textStyle: {
      fontSize: 13,
    },
    selectorPosition: 'start',
    selector: [
      {type: 'all', title: '全选'},
      {type: 'inverse', title: '反选'},
    ],
    data: legendData,
  };

  const dataZooms = [
    {type: 'inside', yAxisIndex: 0},
    {type: 'inside', yAxisIndex: 1},
  ];

  const tooltip = {
    trigger: 'axis',
    axisPointer: {type: 'cross'},
    textStyle: {fontSize: 10},
    formatter: function (params: any) {
      let label = '';
      if (params.length !== 0) {
        label = params[0].axisValue + '</br>';
      }
      params.forEach((param: any) => {
        label +=
          param.value[2] +
          ': ' +
          (param.value[1] > 1000 ? param.value[1].toExponential(3) : param.value[1].toFixed(3)) +
          '</br>';
      });
      return label;
    },
  };

  const grid = [
    {top: 80, left: 70, right: '55%', bottom: 50},
    {top: 80, left: '55%', right: 50, bottom: 50},
  ];

  const yAxis = {
    type: 'value',
    scale: true,
    splitLine: {
      show: true,
    },
    interval: 2,
    min: -10,
    max: 10,
    axisLabel: {
      formatter: function (params: any) {
        return params > 1000 ? params.toExponential() : params;
      },
    },
  };

  const xAxis = {
    type: 'category',
    splitLine: {
      show: false,
    },
    axisLabel: {
      show: true,
      fontSize: 10,
      rotate: 45,
      formatter: function (params: any) {
        if (params.length >= 10) {
          return '...' + params.substring(params.length - 10, params.length);
        }
        return params;
      },
    },
  };

  massAccuracyChart.setOption({
    title: [
      {
        text: 'Sample-Mass Accuracy',
        verticalAlign: 'middle',
        left: '20%',
        top: 50,
        textStyle: {fontSize: 12},
      },
      {
        text: 'Mix-Mass Accuracy',
        verticalAlign: 'middle',
        left: '75%',
        top: 50,
        textStyle: {fontSize: 12},
      },
    ],
    itemGap: 2,
    dataZoom: dataZooms,
    toolbox: builder.toolbox("jpeg",5),
    xAxis: [
      {...xAxis, gridIndex: 0},
      {...xAxis, gridIndex: 1},
    ],
    axisPointer: {},
    yAxis: [
      {...yAxis, gridIndex: 0},
      {...yAxis, gridIndex: 1},
    ],
    legend,
    tooltip,
    grid,
    series: massAccuracySeries,
  });

  caller.setState({
    massAccuracyChart: massAccuracyChart,
  });
}

//预质控界面的峰面积稳定性图
export function renderInsAreaCharts(
  runType: string,
  areaDiv: any,
  report: TargetReport,
  targetType: string,
  caller: any,
) {
  const {areaCharts} = caller.state;
  const areaChart = echarts.init(areaDiv);
  const areaSeries = [];
  const runList = runType === RunType.SAM.value ? report.sampleRuns : report.mixRuns;
  const areaMap = runType === RunType.SAM.value ? report.sampleAreaMap : report.mixAreaMap;
  const targetList = report.targetList; //key为targetName, value为target对象
  //构造辅助线,MassAccuracy的有效范围 0.85-1.15之间
  const markLine = (index: number) => {
    return {
      type: 'line',
      xAxisIndex: index,
      yAxisIndex: index,
      markLine: {
        label: {
          position: 'end',
        },
        symbol: 'none',
        animation: false,
        silent: true,
        data: [
          {
            yAxis: 1.15,
            lineStyle: {
              width: 2,
              color: 'red',
              type: 'dotted',
            },
          },
          {
            yAxis: 0.85,
            lineStyle: {
              width: 2,
              color: 'red',
              type: 'dotted',
            },
          },
        ],
      },
    };
  };
  const createSeries = (seriesName: string, statistic: any, data: any, index: number) => {
    return {
      type: 'line',
      name: seriesName,
      data: data,
      xAxisIndex: index,
      yAxisIndex: index,
      smooth: true,
    };
  };
  const legendData: any[] = [];

  for (let i = 0; i < targetList.length; i++) {
    const target = targetList[i];
    if (target.type !== targetType) {
      continue;
    }
    const targetName = target.name;
    const statistic = areaMap[targetName];
    if (statistic) {
      const areaData = [];
      const areaScaledData = [];
      for (let k = 0; k < runList.length; k++) {
        areaData.push([runList[k].ordinal, statistic.values[k], targetName]);
        areaScaledData.push([runList[k].ordinal, statistic.values[k] / statistic.mean, targetName]);
      }

      const series = createSeries(targetName, statistic, areaData, 0);
      legendData.push(series.name);
      areaSeries.push(series);
      areaSeries.push(createSeries(targetName, statistic, areaScaledData, 1));
    }
  }
  areaSeries.push(markLine(1)); // 添加辅助线
  const legend = {
    orient: 'vertical',
    left: 'auto',
    type: 'scroll',
    icon: 'circle',
    top: 5,
    bottom: 5,
    right: 25,
    padding: 1,
    align: 'left',
    itemGap: 5,
    textStyle: {
      fontSize: 12,
    },
    selectorPosition: 'left',
    selector: [
      {type: 'all', title: '全选'},
      {type: 'inverse', title: '反选'},
    ],
    data: legendData,
  };
  const left = 70;
  const right = 190;
  const grid = [
    {left, top: 60, right, bottom: '50%'},
    {left, top: '60%', right, bottom: '10%'},
  ];

  const dataZooms = [
    {type: 'inside', yAxisIndex: 0},
    {type: 'inside', yAxisIndex: 1},
  ];

  const tooltip = {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
    textStyle: {
      fontSize: 10,
    },
    formatter: function (params: any) {
      let label = '';
      if (params.length !== 0) {
        label = params[0].axisValue + '</br>';
      }
      params.forEach((param: any, index: number) => {
        if (index === params.length / 2) {
          label += '---------------------------</br>';
        }
        label +=
          param.value[2] +
          ': ' +
          (param.value[1] > 1000 ? param.value[1].toExponential(3) : param.value[1].toFixed(3)) +
          '</br>';
      });
      return label;
    },
  };
  const yAxis = builder.yAxis();
  const xAxis = builder.xAxisCategory();

  areaChart.setOption({
    title: [
      {
        text: targetType + '-Peak Area-' + runType,
        verticalAlign: 'middle',
        left: 'center',
        top: 40,
        textStyle: {fontSize: 12},
      },
      {
        text: targetType + '-Peak Area/Peak Area Average-' + runType,
        verticalAlign: 'middle',
        left: 'center',
        top: '55%',
        textStyle: {fontSize: 12},
      },
    ],
    itemGap: 2,
    xAxis: [
      {...xAxis, gridIndex: 0},
      {
        ...xAxis,
        gridIndex: 1,
        axisLabel: {
          show: true,
          fontSize: 10,
          rotate: 45,
        },
      },
    ],
    axisPointer: {
      link: [{xAxisIndex: [0, 1]}, {xAxisIndex: [2, 3]}, {xAxisIndex: [4, 5]}],
      label: {
        backgroundColor: '#777',
      },
    },
    yAxis: [
      {...yAxis, gridIndex: 0},
      {...yAxis, gridIndex: 1},
    ],
    legend,
    grid,
    tooltip,
    toolbox:builder.toolbox("jpeg",5),
    dataZoom: dataZooms,
    series: areaSeries,
  });
  areaCharts.push(areaChart);
}

export function renderInsColumnRtChart(
  columnDiv: any,
  total: number,
  report: TargetReport,
  caller: any,
) {
  const {grids: grids_1, titles: titles_1} = createGridsAndTitles(
    ColumnCol / 2,
    Object.keys(report.c1RtMap).length,
    ColumnGridWidthGap * 2,
    ColumnGridHeightGap,
    ColumnGridHeight,
    ColumnGridBaseLeft * 2,
    ColumnGridBaseRight * 2,
    ColumnGridBaseTop,
  );
  const {grids: grids_2, titles: titles_2} = createGridsAndTitles(
    ColumnCol / 2,
    Object.keys(report.c2RtMap).length,
    ColumnGridWidthGap * 2,
    ColumnGridHeightGap,
    ColumnGridHeight,
    ColumnGridBaseLeft * 2,
    ColumnGridBaseRight * 2,
    ColumnGridBaseTop,
  );
  for (let idx=0; idx < Object.keys(report.c1RtMap).length; idx++) {
    grids_1[idx].left = Number(grids_1[idx].left.replace('%', '')) / 2 + '%';
    grids_1[idx].width = Number(grids_1[idx].width.replace('%', '')) / 2 + '%';
    titles_1[idx].left = Number(titles_1[idx].left.replace('%', '')) / 2 + '%';
  }
  for (let idx=0; idx < Object.keys(report.c2RtMap).length; idx++) {
    grids_2[idx].left = Number(grids_2[idx].left.replace('%', '')) / 2 + 50 + '%';
    grids_2[idx].width = Number(grids_2[idx].width.replace('%', '')) / 2 + '%';
    titles_2[idx].left = Number(titles_2[idx].left.replace('%', '')) / 2 + 50 + '%';
    grids_2[idx].id = grids_2[idx].id + grids_1.length;
  }
  const grids = grids_1.concat(grids_2);
  const titles = titles_1.concat(titles_2);
  let index: number = 0;
  const xAxisList: any[] = [];
  const yAxisList: any[] = [];
  const seriesList: any[] = [];
  const buildChart = (
    targetName: string,
    column: number,
    si: any,
    intList: any,
    ords: [],
    i: number,
  ) => {
    const {min, max} = range(intList);
    // @ts-ignore
    const firstOrdinal = ords[0];
    if (!firstOrdinal) {
      return;
    }
    titles[i].text =
      'Column' +
      column +
      '-' +
      targetName +
      ' [Diff:' +
      (intList[intList.length - 1] - intList[0]).toFixed(3) +
      '][Delta:' +
      (max - min).toFixed(3) +
      ']';
    titles[i].textStyle = {fontSize: 10, fontWeight: 'normal'};
    xAxisList[i] = {
      ...builder.xAxisCategory(column === 1 ? report.c1Ordinals : report.c2Ordinals, 11),
      axisLabel: {show: true, fontSize: 9},
      gridIndex: i,
    };
    yAxisList[i] = {type: 'value', scale: true, gridIndex: i};
    seriesList[2 * i] = {
      type: 'line',
      data: intList,
      xAxisIndex: i,
      yAxisIndex: i,
      smooth: true,
      markLine: {
        lineStyle: {type: 'dash', color: 'black'},
        symbol: 'none',
        data: [
          [
            {coord: [firstOrdinal + '', si[0] * firstOrdinal + si[1]], symbol: 'none'},
            {
              coord: [ords[ords.length - 1] + '', si[0] * ords[ords.length - 1] + si[1]],
              symbol: 'none',
            },
          ],
        ],
      },
    };
    seriesList[2 * i + 1] = {
      type: 'effectScatter',
      symbolSize: 10,
      xAxisIndex: i,
      yAxisIndex: i,
      rippleEffect: {color: 'red'},
      label: {
        show: true,
        position: 'left',
        formatter: function (params: any) {
          return params.data[1].toFixed(3);
        },
        color: 'red',
      },
      data: [
        [ords[intList.indexOf(min)] + '', min],
        [ords[intList.indexOf(max)] + '', max],
      ],
    };
  };
  Object.keys(report.c1RtMap).forEach((targetName) => {
    const si = report.c1SiMap[targetName];
    const intList = report.c1RtMap[targetName];
    const ordinals = report.c1Ordinals;
    buildChart(targetName, 1, si, intList, ordinals, index);
    index++;
  });
  Object.keys(report.c2RtMap).forEach((targetName) => {
    const si = report.c2SiMap[targetName];
    const intList = report.c2RtMap[targetName];
    const ordinals = report.c2Ordinals;
    buildChart(targetName, 2, si, intList, ordinals, index);
    index++;
  });
  const columnRtChart = echarts.init(columnDiv);
  columnRtChart.setOption({
    title: titles,
    grid: grids,
    xAxis: xAxisList,
    yAxis: yAxisList,
    toolbox:builder.toolbox("jpeg", 5),
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        return 'Ordinal:' + params[0].name + '</br>' + 'RT:' + params[0].data.toFixed(3);
      },
    },
    series: seriesList,
  });
  caller.setState({
    columnChart: columnRtChart,
  });
}

export const PreQCFacetConfig: any = {
  padding: 20,
  type: 'list',
  fields: ['runName'],
  width: 'auto',
  cols: 10,
  meta: {
    runName: {
      // 设置 sync 同步之后，可以按照 'cut' 进行颜色映射分类
      sync: true,
    },
    realRt: {
      type: 'linear'
    },
    libRI: {
      type: 'linear'
    }
  },
  tooltip: false,
  legend: false, // 关闭图例
  eachView: (view: any, f: any) => {
    return {
      type: 'scatter',
      options: {
        data: f.data,
        autoFit: false,
        xField: 'realRt',
        yField: 'libRI',
        colorField: 'runName',
        shapeField: 'target',
        shape: 'circle',
        xAxis: {
          grid: {
            line: {
              style: {
                stroke: '#eee',
              },
            },
          },
        },
        tooltip: {
          fields: ['target', 'realRt', 'libRI'],
        },
        regressionLine: {
          type: 'linear',
        },
      },
    };
  },
}

export const MS1FacetConfig: any = {
  padding: 20,
  type: 'list',
  fields: ['runName'],
  width: 'auto',
  cols: 10,
  meta: {
    runName: {
      sync: true,
    },
  },
  animate: false,
  tooltip: false,
  legend: false, // 关闭图例
  eachView: (view: any, f: any) => {
    const targetMs1 = f.data[0].targetMs1 ? f.data[0].targetMs1 : {mzs: [], ints: []};
    return {
      type: 'column',
      options: {
        data: dataChanger.toPoint(targetMs1.mzs, targetMs1.ints),
        xField: 'mz',
        yField: 'int',
        meta: {
          mz: {
            type: 'linear',
          }
        },
        tooltip: {
          fields: ['mz', 'int'],
        },
        colorField: 'runName',
        minColumnWidth: 2,
        maxColumnWidth: 2,
        xAxis: {
          nice: true,
          label: {
            formatter: (value: number) => {
              return Number(value).toFixed(2)
            }
          }
        },
        yAxis: {
          nice: true,
          label: {
            formatter: (value: number) => {
              return Number(value).toExponential(0)
            }
          }
        },
      },
    };
  },
}

export const MS2FacetConfig: any = {
  padding: 20,
  type: 'list',
  fields: ['runName'],
  width: 'auto',
  cols: 10,
  meta: {
    runName: {
      sync: true,
    },
  },
  tooltip: false,
  legend: false, // 关闭图例
  eachView: (view: any, f: any) => {
    const targetMs2 = f.data[0].targetMs2 ? f.data[0].targetMs2 : {mzs: [], ints: []};
    return {
      type: 'column',
      options: {
        data: dataChanger.toPoint(targetMs2.mzs, targetMs2.ints),
        xField: 'mz',
        yField: 'int',
        colorField: 'runName',
        tooltip: {
          fields: ['mz', 'int'],
        },
        meta: {
          mz: {
            type: 'linear',
          }
        },
        minColumnWidth: 2,
        maxColumnWidth: 2,
        xAxis: {
          nice: true,
          label: {
            formatter: (value: number) => {
              return Number(value).toFixed(2)
            }
          }
        },
        yAxis: {
          nice: true,
          label: {
            formatter: (value: number) => {
              return Number(value).toExponential(0)
            }
          }
        },
      },
    };
  },
}

export const MSFacetConfig: any = {
  padding: 20,
  type: 'list',
  fields: ['index'],
  width: 'auto',
  cols: 4,
  meta: {
    runName: {
      sync: true,
    },
  },
  tooltip: false,
  legend: false, // 关闭图例
  eachView: (view: any, f: any) => {
    const spectra = f.data[0] ? f.data[0] : {mzs: [], ints: []};
    return {
      type: 'column',
      options: {
        data: dataChanger.toPoint(spectra.mzs, spectra.ints),
        xField: 'mz',
        yField: 'int',
        tooltip: {
          fields: ['mz', 'int'],
        },
        meta: {
          mz: {
            type: 'linear',
          }
        },
        minColumnWidth: 2,
        maxColumnWidth: 2,
        xAxis: {
          nice: true,
          label: {
            formatter: (value: number) => {
              return Number(value).toFixed(2)
            }
          }
        },
        yAxis: {
          nice: true,
          label: {
            formatter: (value: number) => {
              return Number(value).toExponential(0)
            }
          }
        },
      },
    };
  },
}
