import type { EChartsType } from 'echarts';
import qs from "qs";

export const notNull = (object: any) => {
  return object !== null && object !== undefined;
};

export const isNull = (object: any) => {
  return object === null || object === undefined;
};

export const notBlank = (object: any) => {
  return object !== null && object !== undefined && object !== '';
};

export const isBlank = (object: any) => {
  return object === null || object === undefined || object === '';
};

export function clearChart(chart: EChartsType | undefined) {
  if (chart && !chart.isDisposed()) {
    chart.clear();
    chart.dispose();
  }
}

export function clearCharts(charts: EChartsType[]) {
  charts.forEach((chart) => {
    clearChart(chart);
  });
}

export function getParam(location: any, param: string){
  return qs.parse(location.search.replace('?', ''))[param];
}
