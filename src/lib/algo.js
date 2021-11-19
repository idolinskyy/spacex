export const calculateCargoBays = (allBoxes = [], maxCapacity = 10) => {
  const cargoBays = [];
  let boxes = allBoxes.map((item) => +item).sort((left, rigth) => left - rigth);

  if (!boxes.length) return [];

  if (boxes[boxes.length - 1] > maxCapacity) {
    throw Error('One or more crates will not fit in the cargo hold!');
  }
  while (boxes.length) {
    const cargo = [boxes.pop()];

    while (true) {
      let lastGoodIndex = -1;
      for (let index = 0; index < boxes.length; index++) {
        if (
          cargo.reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            boxes[index],
          ) <= maxCapacity
        ) {
          ++lastGoodIndex;
        } else {
          break;
        }
      }
      if (lastGoodIndex !== -1) {
        cargo.push(boxes[lastGoodIndex]);
        boxes.splice(lastGoodIndex, 1);
      } else {
        break;
      }
    }
    cargoBays.push(cargo);
  }
  return cargoBays;
};
