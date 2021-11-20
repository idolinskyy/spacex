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
          `Cargo ${index + 1} => [${item
            .reduce(
              (previousValue, currentValue) =>
                previousValue + '+' + currentValue,
              '',
            )
            .slice(1)}]\n`,
      )
      .reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        '',
      );
  } else {
    return '';
  }
};
