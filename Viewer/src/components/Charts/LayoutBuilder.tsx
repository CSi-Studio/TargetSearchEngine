import {Col} from 'antd';

//用于实时XIC界面的多图布局
export const XicCol = 4;
export const XicGridBaseTop = 45;
export const XicGridHeight = 80;
export const XicGridHeightGap = 25;
export const XicGridBaseLeft = 0.2; //整体子图像组距左边距,单位百分比
export const XicGridBaseRight = 0; //整体子图像组距右边距,单位百分比
export const XicGridWidthGap = 0.5; //整体子图像之间的横向距离,单位百分比

export const MsCol = 4;

//用于TargetQC界面的多图布局
export const RunCol = 10; //每行多少个
export const RunGridBaseTop = 25; //整体子图像组距上边距
export const RunGridHeight = 80; //每个子图的高度
export const RunGridHeightGap = 25; //每个子图的高度
export const RunGridBaseLeft = 0.5; //整体子图像组距左边距,单位百分比
export const RunGridBaseRight = 0.5; //整体子图像组距右边距,单位百分比
export const RunGridWidthGap = 0.5; //整体子图像之间的横向距离,单位百分比

//用于PreQC界面的进样柱稳定性的多图布局
export const ColumnCol = 4; //每行多少个
export const ColumnGridBaseTop = 25; //整体子图像组距上边距
export const ColumnGridHeight = 150; //每个子图的高度
export const ColumnGridHeightGap = 50; //每个子图的高度
export const ColumnGridBaseLeft = 3; //整体子图像组距左边距,单位百分比
export const ColumnGridBaseRight = 1; //整体子图像组距右边距,单位百分比
export const ColumnGridWidthGap = 3; //整体子图像之间的横向距离,单位百分比

//用于PreQC界面的进样柱稳定性的多图布局
export const SpectrumCol = 8; //每行多少个
export const SpectrumCol2 = 4; //每行多少个
export const SpectrumGridBaseTop = 50; //整体子图像组距上边距
export const SpectrumGridHeight = 100; //每个子图的高度
export const SpectrumGridHeightGap = 50; //每个子图的高度
export const SpectrumGridBaseLeft = 3; //整体子图像组距左边距,单位百分比
export const SpectrumGridBaseRight = 1; //整体子图像组距右边距,单位百分比
export const SpectrumGridWidthGap = 3; //整体子图像之间的横向距离,单位百分比

export function createCol(divId: string, height: number, span: number) {
  return <Col key={divId + 'col'} span={span}>
      <div style={{background: 'whitesmoke'}}>
        <div id={divId} style={{height}}/>
      </div>
    </Col>
}

/**
 * 创建EICS图时所使用的grid阵列
 * @param col 每行的图表数目
 * @param totalSize
 * @param WIDTH_GAP 每行图表间的间距,单位是%
 * @param HEIGHT_GAP 每列图表间的间距,单位是px
 * @param GRID_HEIGHT 每个图表的高度,单位是px
 * @param BASE_LEFT 左边距,单位是%
 * @param BASE_RIGHT 右边距,单位是%
 * @param BASE_TOP 上边距,单位是px
 * @param ids
 * @returns {{titles: [], grids: []}}
 */
export function createGridsAndTitles(
  col: number,
  totalSize: number,
  WIDTH_GAP: number,
  HEIGHT_GAP: number,
  GRID_HEIGHT: number,
  BASE_LEFT: number,
  BASE_RIGHT: number,
  BASE_TOP: number,
  ids?: any[]
) {
  const grids: any[] = [];
  const titles: any[] = [];
  let current = 1;
  const GRID_WIDTH = getGridWidth(col, BASE_LEFT, BASE_RIGHT, WIDTH_GAP);
  for (let j = 0; j < totalSize / col; j++) {
    for (let i = 0; i < col; i++) {
      if (current <= totalSize) {
        const id = ids ? ids[current - 1] : current;
        grids.push({
          id: id,
          name: id,
          show: true,
          borderWidth: 3,
          left: BASE_LEFT + i * (GRID_WIDTH + WIDTH_GAP) + '%',
          top: BASE_TOP + j * (GRID_HEIGHT + HEIGHT_GAP),
          width: GRID_WIDTH + '%',
          height: GRID_HEIGHT,
        });
        titles.push({
          left: BASE_LEFT - 0.3 + i * (GRID_WIDTH + WIDTH_GAP) + '%',
          top: BASE_TOP - 20 + j * (GRID_HEIGHT + HEIGHT_GAP),
        });
      }

      current++;
    }
  }
  return {
    grids,
    titles,
  };
}

export function getGridWidth(col: number, BASE_LEFT: number, BASE_RIGHT: number, WIDTH_GAP: number) {
  return (100 - BASE_RIGHT - BASE_LEFT - WIDTH_GAP * (col - 1)) / col; //给右边留1
}
