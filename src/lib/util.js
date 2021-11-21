/*
	Вывод размещения грузов в отсеках
	Формат вывода:
		Cargo 1 => [W1+..+Wn]
		...
		Cargo N => [W1+..+Wn]
	
	Аргументы:
		allCargoBays - массив [[A1..An], .., [K1..Km]] грузов по отсеках
*/

export const displayCargos = (allCargoBays) => {
  const cargoBays = [...allCargoBays];
  if (cargoBays) {
    return cargoBays
      .sort(
        (left, rigth) =>
          rigth.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
          ) -
          left.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
          ),
      )
      .map(
        (item, index) =>
          `Cargo ${index + 1} [${item
            .reduce(
              (previousValue, currentValue) =>
                previousValue + '+' + currentValue,
              '',
            )
            .slice(1)}], `,
      )
      .reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        '',
      );
  } else {
    return '';
  }
};

export function convert16(num) {
  num = num.toString(16);
  return '0'.repeat(Math.max(2 - num.length, 0)) + num;
}
