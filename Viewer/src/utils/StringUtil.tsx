import {Tag} from "antd";

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

export const formatTime = (time: number) => {
  if (time < 1000) {
    return <Tag color={'#62ab3d'}>{time}ms</Tag>
  }
  // eslint-disable-next-line no-param-reassign
  let timeS = time / 1000; //格式化为秒
  if (timeS < 60) {
    if (timeS < 10) {
      return <Tag color={'#0069ff'}>{timeS.toFixed(1)}s</Tag>
    } else {
      return <Tag color={'#0069ff'}>{timeS.toFixed(0)}s</Tag>
    }
  }
  let timeM = Math.floor(timeS / 60)
  timeS = timeS - timeM * 60
  if (timeM < 60){
    return <Tag color={'#7f00ff'}>{timeM}m {timeS.toFixed(0)}s</Tag>;
  }

  const timeH = Math.floor(timeM / 60)
  timeM = timeM - timeH * 60
  return <Tag color={'#ff0000'}>{timeH}h {timeM}m {timeS.toFixed(0)}s</Tag>;
}
