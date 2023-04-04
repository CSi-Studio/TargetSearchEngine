import {Colors} from '@/components/Enums/Colors';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/brush';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/graphic';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markLine';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import {RunType} from "@/components/Enums/Const";

export const builder = {
  toolbox: (type: string, pixelRatio: number) => {
    return {
      feature: {
        saveAsImage: {
          type: type ? type : "jpeg",
          pixelRatio: pixelRatio ? pixelRatio : 5,
        },
      },
    }
  },
  title: (title: string, fontSize: number, color: string | undefined) => {
    return {
      text: title,
      textStyle: {
        fontSize: fontSize ? fontSize : 12,
        color: color ? color : Colors.TitleColor,
        fontWeight: 'bold',
      },
      left: 'center',
    };
  },
  xAxis: (valueFixed: number, scale = false, min = 'dataMin', max = 'dataMax') => {
    return {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLabel: {
        fontSize: 10,
        formatter: function (value: number) {
          return valueFixed ? value.toFixed(valueFixed) : value;
        },
      },
      min,
      max,
      scale,
    };
  },

  xAxisWithIndex: (gridIndex: number) => {
    return {
      type: 'value',
      minInterval: 0.0001,
      splitLine: {
        show: false,
      },
      position: 'bottom',
      axisLabel: {
        fontSize: 8,
        formatter: function (value: number) {
          return value.toFixed(1);
        },
        hideOverlay: true,
      },
      gridIndex: gridIndex,
      scale: true,
    };
  },

  xAxisCategory: (data?: any[], fontSize?: number) => {
    return {
      data: data,
      type: 'category',
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
        fontSize: fontSize ? fontSize : 9,
      },
    };
  },

  yAxis: () => {
    return {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLabel: {
        fontSize: 10,
        formatter: function (params: number) {
          return params > 1000 ? params.toExponential(2) : params.toFixed(1);
        },
      },
      scale: true,
    };
  },

  yAxisWithIndex: (gridIndex: number) => {
    return {
      type: 'value',
      splitNumber: 1,
      axisLabel: {
        fontSize: 10,
        rotate: -45,
        formatter: function (params: number) {
          if (params > 0) {
            return params > 1000 ? params.toExponential(1) : params.toFixed(1);
          } else {
            return params < -1000 ? (-params).toExponential(2) : (-params).toFixed(1);
          }
        },
      },
      max: 'dataMax',
      min: 'dataMin',
      gridIndex: gridIndex,
      splitLine: {
        show: false,
      },
    };
  },

  mzIntensityTooltip: () => {
    return {
      show: true,
      formatter: function (params: any) {
        return (
          'mz: ' +
          (params.data[0] ? params.data[0].toFixed(5) : '') +
          '</br> Intensity: ' +
          (params.data[1] ? params.data[1].toExponential(2) : 0)
        );
      },
    };
  },
  dataZoom: () => {
    return {
      type: 'inside',
      filterMode: 'filter',
    };
  },
  dataZoomWithIndex: (xAxisIndex: number | number[]) => {
    return {
      type: 'inside',
      filterMode: 'filter',
      throttle: 0,
      xAxisIndex: xAxisIndex,
    };
  },
  basicBarSeries: (xIndex: number, yIndex: number) => {
    return {
      type: 'bar',
      barWidth: 2,
      xAxisIndex: xIndex,
      yAxisIndex: yIndex,
    };
  },
  seriesLabel: () => {
    return {
      show: true,
      position: 'top',
      color: 'black',
      fontSize: 9,
    };
  },
  grid: () => {
    return {
      left: 50,
      top: 25,
      right: 20,
      bottom: 20,
    };
  },

  markArea4QcMap: (start: number, end: number, name: string, runType: string) => {
    let showColor: string;
    switch (runType) {
      case RunType.BLK.value:
        showColor = 'rgba(0,252,38,0.3)';
        break;
      case RunType.CUR.value:
        showColor = 'rgba(147,113,255,0.3)';
        break;
      case RunType.REF.value:
        showColor = 'rgba(231,171,255,0.3)';
        break;
      case RunType.MIX.value:
        showColor = 'rgba(45,183,245,0.3)';
        break;
      case RunType.SAM.value:
        showColor = 'rgba(211,224,231,0.3)';
        break;
      default:
        showColor = 'rgba(211,224,231,0.3)';
    }
    return [
      {
        yAxis: start,
        itemStyle: {
          color: showColor,
        },
        label: {
          show: true,
          rotate: -90,
          position: 'right',
          offset: [-10, 0],
          distance: 7,
          fontSize: 9,
        },
        name: name,
      },
      {
        yAxis: end,
      },
    ];
  },
};
