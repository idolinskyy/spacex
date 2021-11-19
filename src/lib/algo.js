/*
	Алгоритм подбора ящиков для розмещения в грузовых отсеках

	В отсортированном списке подбираются наиболее подходящие ящики,
	после чего они удаляются из списка.
	Для этого берется последний элемент списка (максимальный) и к нему
	последовательно подбираются подходящие.
	И так до исчерпания списка
*/

export const calculateCargoBays = (allBoxes = [], maxCapacity = 10) => {
  const cargoBays = [];
  let boxes = allBoxes.map((item) => +item).sort((left, rigth) => left - rigth);

  if (!boxes.length) return [];

  if (boxes[boxes.length - 1] > maxCapacity) {
    cargoBays.error = 'One or more boxes will not fit in the cargo hold!';
    return cargoBays;
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