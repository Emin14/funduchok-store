
export default function currentTime() {
    const now = new Date();
    // let now = new Date('2023-06-12T14:27');
    const month = now.getMonth();
    const day = now.getDate();
    const dayofWeek = now.getDay()
    const hours = now.getHours();
    const minute = now.getMinutes();
    let monthString = ''
    let dayofWeekString = ''
    let deliveryHours = 0

    switch (month) {
      case 0:
        monthString = 'Января'
        break;
      case 1:
        monthString = 'Февраля'
        break;
      case 2:
        monthString = 'Марта'
        break;
      case 3:
        monthString = 'Апреля'
        break;
      case 4:
        monthString = 'Мая'
        break;
      case 5:
        monthString = 'Июня'
        break;
      case 6:
        monthString = 'Июля'
        break;
      case 7:
        monthString = 'Августа'
        break;
      case 8:
        monthString = 'Сентября'
        break;
      case 9:
        monthString = 'Октября'
        break;
      case 10:
        monthString = 'Ноября'
        break;
      case 11:
        monthString = 'Декабря'
        break; 
    }
  
    switch (dayofWeek) {
        case 0:
          dayofWeekString = 'Воскресенье'
          break;
        case 1:
          dayofWeekString = 'Понедельник'
          break;
        case 2:
          dayofWeekString = 'Вторник'
          break;
        case 3:
          dayofWeekString = 'Среда'
          break;
        case 4:
          dayofWeekString = 'Четверг'
          break;
        case 5:
          dayofWeekString = 'Пятница'
          break;
        case 6:
          dayofWeekString = 'Суббота'
          break;
        case 7:
          dayofWeekString = 'Воскресенье'
           break;
      }

    if(minute < 30) {
      deliveryHours = hours + 2;
    }
    else {
      deliveryHours = hours + 3;
    }

    return {
      month,
      monthString,
      day,
      dayofWeek,
      dayofWeekString,
      hours,
      deliveryHours
    }
  }