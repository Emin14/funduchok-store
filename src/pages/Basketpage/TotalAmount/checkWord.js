// Функция для правильного написания окончания в слове 'балл'
// Используется в компоненте TotalAmount
export default function currentTime(points) {
  const wordBall = [1];
  const wordBalla = [2, 3, 4];
  const wordBallov = [5, 6, 7, 8, 9, 0];
  let unitOfNumber = 0;
  if (points < 100) {
    unitOfNumber = +(String(points).slice(1));
    if (points > 9 && points < 20) {
      return 'баллов';
    }
    if (wordBall.includes(points) || wordBall.includes(unitOfNumber)) {
      return 'балл';
    }
    if (wordBalla.includes(points) || wordBalla.includes(unitOfNumber)) {
      return 'балла';
    }

    if (wordBallov.includes(points) || wordBallov.includes(unitOfNumber)) {
      return 'баллов';
    }
  } else if (points > 99) {
    unitOfNumber = +(String(points).slice(2));
    if (points > 109 && points < 120) {
      return 'баллов';
    }
    if (wordBall.includes(points) || wordBall.includes(unitOfNumber)) {
      return 'балл';
    }
    if (wordBalla.includes(points) || wordBalla.includes(unitOfNumber)) {
      return 'балла';
    }

    if (wordBallov.includes(points) || wordBallov.includes(unitOfNumber)) {
      return 'баллов';
    }
  }
  return '';
}
