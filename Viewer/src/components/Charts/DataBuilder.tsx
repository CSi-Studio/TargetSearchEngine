import {DataType, RunType} from '@/components/Enums/Const';
import type {MsScore, RunData, RunXic, Score} from '@/domains/Analyse.d';
import {isNull, notNull} from '@/utils/StringUtil';

export function dataBuilder(x: number[], y: number[]) {
  const data = [];
  for (let i = 0; i < x.length; i++) {
    data.push([x[i], y[i]]);
  }
  return data;
}

// 将后端返回的图表数据转换为EIC图表可用的数据, 不包含选峰信息, [run][target]
export function buildDataForTargetXIC(runXics: RunXic[]) {
  const chartDataMatrix: any[] = [];
  runXics.forEach((runXic) => {
    const targetChartData: any[] = [];
    runXic.xics.forEach((xic) => {
      const xic4Chart = [];
      if (xic != null && xic.rts != null) {
        for (let i = 0; i < xic.rts.length; i++) {
          const rt = xic.rts[i];
          xic4Chart.push([rt, xic.ints[i]]);
        }
        targetChartData.push(xic4Chart);
      }
    });
    chartDataMatrix.push(targetChartData);
  });

  return chartDataMatrix;
}

// 将后端返回的图表数据转换为EIC图表可用的数据,用于TargetQC界面,带有更加详细的选峰信息
export function buildDataForRunData(dataInfos: RunData[]) {
  const xicMatrix: any[] = [];
  dataInfos.forEach((dataInfo) => {
    const mainPeakIndex = dataInfo.mainPeakIndex;
    let hasMainPeak = false;
    if (notNull(dataInfo.mainPeakIndex)) {
      hasMainPeak = true;
    }
    const xic = dataInfo.xic;
    const selectedData = [];
    const allData = [];
    if (xic != null && xic.rts != null) {
      let rtStart = null;
      let rtEnd = null;

      if (hasMainPeak) {
        rtStart = dataInfo.peaks[mainPeakIndex].rtRange.left;
        rtEnd = dataInfo.peaks[mainPeakIndex].rtRange.right;
      }
      for (let i = 0; i < xic.rts.length; i++) {
        const rt = xic.rts[i];
        // @ts-ignore
        if (hasMainPeak && rt >= rtStart && rt <= rtEnd) {
          if (rt === rtStart) {
            if (xic.ints[i] > dataInfo.peaks[mainPeakIndex].baseLineRange.left) {
              selectedData.push([rt, dataInfo.peaks[mainPeakIndex].baseLineRange.left]);
              selectedData.push([rt, xic.ints[i]]);
            } else {
              selectedData.push([rt, xic.ints[i]]);
              selectedData.push([rt, dataInfo.peaks[mainPeakIndex].baseLineRange.left]);
            }
          } else if (rt === rtEnd) {
            if (xic.ints[i] > dataInfo.peaks[mainPeakIndex].baseLineRange.right) {
              selectedData.push([rt, xic.ints[i]]);
              selectedData.push([rt, dataInfo.peaks[mainPeakIndex].baseLineRange.right]);
            } else {
              selectedData.push([rt, dataInfo.peaks[mainPeakIndex].baseLineRange.right]);
              selectedData.push([rt, xic.ints[i]]);
            }
          } else {
            selectedData.push([rt, xic.ints[i]]);
          }
        }
        allData.push([rt, xic.ints[i]]);
      }
    }

    xicMatrix.push({
      select: selectedData,
      all: allData,
    });
  });
  return xicMatrix;
}

/**
 * 为QCMap图构建相关数据
 * @param dataInfos
 */
export function buildDataForQcMap(dataInfos: RunData[]) {
  if (dataInfos.length == 0) {
    return {};
  }
  const data: any = {};
  data.libRi = dataInfos[0].libRi;
  let peaks: any[] = [];
  const blk: any[] = [];
  const cur: any[] = [];
  const ref: any[] = [];
  const mix: any[] = [];
  const sam: any[] = [];
  let samCount = 0;
  let blkCount = 0;
  let mixCount = 0;
  let refCount = 0;
  let curCount = 0;
  dataInfos.forEach((dataInfo, dataInfoIndex) => {
    switch (dataInfo.runType) {
      case RunType.BLK.value:
        blkCount++;
        break;
      case RunType.CUR.value:
        curCount++;
        break;
      case RunType.REF.value:
        refCount++;
        break;
      case RunType.MIX.value:
        mixCount++;
        break;
      case RunType.SAM.value:
        samCount++;
        break;
      default:
        samCount++;
    }
    if (notNull(dataInfo.peaks)) {
      dataInfo.peaks.forEach((peak, peakIndex) => {
        let symbol = '';
        const score: Score = peak.score;
        if (notNull(score)) {
          if (score.totalScore >= 0.75) {
            if (
              isNull(score.ms2Scores) ||
              isNull(score.ms2Scores[score.maxMs2SpectrumIndex]) ||
              score.ms2Scores[score.maxMs2SpectrumIndex].totalScore < 0.5
            ) {
              symbol = 'emptyDiamond';
            } else if (
              score.ms2Scores[score.maxMs2SpectrumIndex].totalScore >= 0.5 &&
              score.ms2Scores[score.maxMs2SpectrumIndex].totalScore < 0.75
            ) {
              symbol = 'emptyRect';
            } else {
              symbol = 'emptyArrow';
            }
          } else {
            symbol = 'emptyTriangle';
          }

          // 实心空心判断s
          if (!isNull(dataInfo.ms2ExistedList) && dataInfo.ms2ExistedList[peakIndex]) {
            symbol = symbol.replace('empty', '').toLowerCase();
          }
        }

        const peakData = {
          value: [
            peak.apexRi,
            dataInfo.ordinal,
            dataInfo.dataId,
            peak.area,
            peak.apexRt,
            peak.apexInt,
            dataInfo.runType,
            dataInfo.mainPeakIndex === peakIndex,
            dataInfo.runName,
            peakIndex,
            dataInfoIndex,
          ],
          symbol,
          symbolSize: 7,
          itemStyle: {
            color: dataInfo.mainPeakIndex === peakIndex ? 'green' : 'blue',
          },
        };
        switch (dataInfo.runType) {
          case RunType.BLK.value:
            blk.push(peakData);
            break;
          case RunType.CUR.value:
            cur.push(peakData);
            break;
          case RunType.REF.value:
            ref.push(peakData);
            break;
          case RunType.MIX.value:
            mix.push(peakData);
            break;
          case RunType.SAM.value:
            sam.push(peakData);
            break;
          default:
            sam.push(peakData);
        }
      });
    } else {
      const peakData = {
        value: [
          null,
          dataInfo.ordinal,
          dataInfo.dataId,
          null,
          null,
          null,
          dataInfo.runType,
          false,
          dataInfo.runName,
          null,
          dataInfoIndex,
        ],
      };
      switch (dataInfo.runType) {
        case RunType.BLK.value:
          blk.push(peakData);
          break;
        case RunType.CUR.value:
          cur.push(peakData);
          break;
        case RunType.REF.value:
          ref.push(peakData);
          break;
        case RunType.MIX.value:
          mix.push(peakData);
          break;
        case RunType.SAM.value:
          sam.push(peakData);
          break;
        default:
          sam.push(peakData);
      }
    }
  });
  sam.sort((a, b) => a.value[1] < b.value[1] ? 1: -1)
  blk.sort((a, b) => a.value[1] < b.value[1] ? 1: -1)
  mix.sort((a, b) => a.value[1] < b.value[1] ? 1: -1)
  ref.sort((a, b) => a.value[1] < b.value[1] ? 1: -1)
  peaks = sam.concat(blk, mix, ref);
  data.peaks = peaks;
  data.samCount = samCount;
  data.refCount = refCount;
  data.mixCount = mixCount;
  data.blkCount = blkCount;
  data.curCount = curCount;
  return data;
}

/**
 * 获取当前数据中中对应MSn图的mz范围
 * @param dataInfos
 * @param dataType
 */
export function getRangeForMS(dataInfos: RunData[], dataType: string) {
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;
  dataInfos.forEach((dataInfo) => {
    const target = dataType === DataType.MS1 ? dataInfo.targetMs1 : dataInfo.targetMs2;
    if (target !== null) {
      const mzs = target.mzs;
      if (mzs[0] < min) {
        min = mzs[0];
      }
      if (mzs[mzs.length - 1] > max) {
        max = mzs[mzs.length - 1];
      }
    }
  });

  return {min, max};
}

/**
 *
 * @param dataInfos
 */
export function getRangeForXic(dataInfos: RunData[]) {
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;
  dataInfos.forEach((dataInfo) => {
    const xic = dataInfo.xic;
    if (xic != null) {
      if (xic.rts[0] < min) {
        min = xic.rts[0];
      }
      if (xic.rts[xic.rts.length - 1] > max) {
        max = xic.rts[xic.rts.length - 1];
      }
    }
  });

  return {min, max};
}

export function buildMsScoreData(dataInfo: RunData) {
  const msScoreList: MsScore[] = [];
  if (dataInfo.peaks) {
    dataInfo.peaks.forEach((peak) => {
      if (peak.score && peak.score.ms1Scores) {
        peak.score.ms1Scores.forEach((s) => {
          msScoreList.push({
            ms: 1,
            id: s.spectrumId + peak.apexRi,
            spectrumId: s.spectrumId,
            source: s.source,
            rt: peak.apexRt,
            forward: Number(s.forward.toFixed(2)),
            reverse: Number(s.reverse.toFixed(2)),
            isotope: Number(s.isotope.toFixed(2)),
            total: Number(s.totalScore.toFixed(2)),
          });
        });
        peak.score.ms2Scores?.forEach((s) => {
          msScoreList.push({
            ms: 2,
            id: s.spectrumId + peak.apexRi,
            source: s.source,
            spectrumId: s.spectrumId,
            rt: peak.apexRt,
            forward: Number(s.forward.toFixed(2)),
            reverse: Number(s.reverse.toFixed(2)),
            isotope: NaN,
            total: Number(s.totalScore.toFixed(2)),
          });
        });
      }
    });
  }
  return msScoreList;
}

export function buildDataForMS() {
}
