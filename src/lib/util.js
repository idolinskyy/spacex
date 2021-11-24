/*
	Перевод числа [10]=>[16] для управления цветом в компонентах
*/

export function convert16(num) {
  num = num.toString(16);
  return '0'.repeat(Math.max(2 - num.length, 0)) + num;
}

/*
	Инверсия цвета
*/

export const invert = (color) =>
  ((parseInt(color, 16) ^ 0xffffff) | 0x1000000).toString(16).substring(1);

/*
	Сортировка контейнеров с ящиками
*/

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

/*
	Создание уникальной ссылки для компании
*/

export const normalizeUrl = (company) => {
  return company.replaceAll(/[& ]/g, '-').toLowerCase();
};
