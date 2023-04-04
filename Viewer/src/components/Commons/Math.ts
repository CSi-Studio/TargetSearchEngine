export function avg(array: number[]) {
  const len = array.length;
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += array[i];
  }
  return sum / len;
}

// eslint-disable-next-line @typescript-eslint/no-shadow
export function rsd(array: number[], avg: number) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    const dev = array[i] - avg;
    sum += dev * dev;
  }
  return Math.sqrt(sum/(array.length-1)) / array.length;
}

export function range(array: number[]) {
  let min = 9999999999;
  let max = -1;
  for (let i = 0; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i];
    }
    if (array[i] > max) {
      max = array[i];
    }
  }
  return {min, max};
}

export function numberFormat(data: number, fractionDigits?: number) {
  if (data === undefined || typeof data !== 'number') {
    return;
  }
  if (data > 10000 || data < -10000) {
    return data.toExponential(2);
  } else {
    return data.toFixed(fractionDigits ? fractionDigits : 2);
  }
}
