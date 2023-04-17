export function fibonacci(num: number): number[] {
  if (num === 0) {
    return [];
  } else if (num === 1) {
    return [0];
  } else if (num === 2) {
    return [0, 1];
  } else {
    const arr = [0, 1];
    for (let index = 2; index < num; index++) {
      arr.push(arr[index - 1] + arr[index - 2]);
    }
    return arr;
  }
}
