import {dataBuilder} from '@/components/Charts/DataBuilder';
import {range} from '@/components/Commons/Math';
import {isNull} from '@/utils/StringUtil';
import type {EChartsType} from 'echarts';
import * as echarts from 'echarts';
import type {Point, Spectrum} from "@/domains/Spectrum.d";
import type {SpectrumDetail} from "@/domains/Spectrum.d";
import {notNull} from "@/components/Commons/Common";

export const buildBarChart = (
  oldChart: EChartsType | undefined,
  chartId: string,
  title: string,
  x: number[],
  y: number[],
) => {
  const data = dataBuilder(x, y);
  let chart = null;
  if (oldChart && !oldChart.isDisposed()) {
    chart = oldChart;
  } else {
    const realDiv: any = document.getElementById(chartId);
    chart = echarts.init(realDiv);
  }

  chart.setOption({
    title: {
      text: title,
      left: 'center',
      top: 5,
      textStyle: {
        fontSize: 12,
      },
    },
    dataZoom: [
      {
        type: 'inside',
      },
      {
        type: 'slider',
        moveHandleSize: 10,
        height: 15,
        bottom: 15,
        brushSelect: false,
      },
    ],
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        const dataX = params[0].data[0].toFixed(5);
        const dataY =
          params[0].data[1] > 10000 ? params[0].data[1].toExponential(2) : params[0].data[1];
        return 'x: ' + dataX + '</br>y: ' + dataY;
      },
    },
    xAxis: {
      type: 'value',
      scale: true,
      splitLine: {
        show: false,
      },
      max: 'dataMax',
      axisLabel: {
        formatter: function (params: any) {
          return params.toFixed(2);
        },
      },
    },
    yAxis: {
      type: 'value',
      max: 'dataMax',
      splitLine: {
        show: true,
      },
      axisLabel: {
        formatter: function (params: any) {
          return params > 1000 ? params.toExponential(1) : params;
        },
      },
    },
    grid: {
      left: 80,
      top: 30,
      right: 30,
      bottom: 50,
    },
    series: {
      type: 'bar',
      barWidth: 3,
      data: data,
      // sampling: 'lttb'
      // label: {
      //   interval: 'auto',
      //   position: 'top',
      //   show: true,
      //   fontSize: 12,
      //   formatter: function (params: any) {
      //     return params.data[0].toFixed(4);
      //   },
      // },
      // labelLayout: {
      //   verticalAlign:'bottom',
      //   hideOverlap: true,
      // }
    },
  });

  return chart;
};

export const getRange = (spectra: any) => {
  let msMin = 3000;
  let msMax = 0;

  const calcRange = (spectraDetailList: SpectrumDetail[] | Spectrum[], min: number, max: number) => {
    spectraDetailList.forEach(spectrumDetail => {
      if (spectrumDetail) {
        const mzArray = spectrumDetail.mzs;
        if (mzArray[0] < min) {
          // eslint-disable-next-line no-param-reassign
          min = mzArray[0];
        }
        if (mzArray[mzArray.length - 1] > max) {
          // eslint-disable-next-line no-param-reassign
          max = mzArray[mzArray.length - 1];
        }
      }
    });
    return {min, max};
  }

  if (spectra) {
    const {min, max} = calcRange(spectra, msMin, msMax);
    msMin = min;
    msMax = max
  }

  return {
    msMin,
    msMax,
  };
};

// 将后端返回的图表数据转换为MS图表可用的数据
export const prepareDataForMS = (spectra: SpectrumDetail[] | Spectrum[]) => {
  const spectraDataList: any[] = [];
  const maxLength = spectra.length;
  const spectraDetailList: any[] = [];
  for (let i = 0; i < maxLength; i++) {
    if (spectra.length !== 0) {
      spectraDetailList.push(i >= spectra.length ? {} : spectra[i])
    }
  }
  spectraDetailList.forEach((spectrumDetail: SpectrumDetail | Spectrum) => {
    const data: any = [];
    if (notNull(spectrumDetail) && notNull(spectrumDetail.mzs)) {
      spectrumDetail.mzs.forEach((mz: number, index: number) => {
        data.push([mz, spectrumDetail.ints[index]]);
      });
    }
    spectraDataList.push(data);
  });

  return [spectraDataList, spectraDetailList];
};


export const dataChanger = {
  // negative为true或false,当需要求镜像数据时请传入true, 默认为false
  mzIntensity: (
    pairs: { mzs: number[]; ints: number[] },
    negative: boolean,
    normalization: boolean,
  ) => {
    if (isNull(pairs)) {
      return [];
    }
    const data = [];
    const msz = pairs.mzs;
    const ints = pairs.ints;
    if (normalization) {
      const {min, max} = range(ints);
      const delta = max - min;
      for (let i = 0; i < msz.length; i++) {
        data.push([msz[i], (negative ? -1 : 1) * ((ints[i] - min) / delta)]);
      }
    } else {
      for (let i = 0; i < msz.length; i++) {
        data.push([msz[i], (negative ? -1 : 1) * ints[i]]);
      }
    }

    return data;
  },

  toPoint: (mzs: number[], ints: number[]) => {
    const points: Point[] = [];
    for (let i = 0; i < mzs.length; i++) {
      points.push({
        mz: mzs[i],
        int: ints[i]
      })
    }
    return points;
  }
};


