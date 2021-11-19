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
