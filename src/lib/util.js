export function convert16(num) {
  num = num.toString(16);
  return '0'.repeat(Math.max(2 - num.length, 0)) + num;
}

export const invert = (color) =>
  ((parseInt(color, 16) ^ 0xffffff) | 0x1000000).toString(16).substring(1);

export function sort(allCargoBays) {
  const cargos = [...allCargoBays];
  return cargos.sort(
    (left, right) =>
      right.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0,
      ) -
      left.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0,
      ),
  );
}
