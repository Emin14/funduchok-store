import { FaMedal } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import { MdPayment } from 'react-icons/md';

export const advantages = [
  { title: 'Гарантия качества', icon: <FaMedal /> },
  { title: 'Доставка', icon: <TbTruckDelivery /> },
  { title: 'Оплата', icon: <MdPayment /> },
];

export const blocks = [
  { title: 'Описание', dataset: 'description' },
  { title: 'Характеристики', dataset: 'characteristics' },
  { title: 'Отзывы', dataset: 'reviews' },
];

export const amountOfDiscount = 0.1;

export const weightAndkoef = [
  {
    id: 1,
    title: '100 гр',
    weight: 0.1,
    koef: 1.7,
  },
  {
    id: 2,
    title: '250 гр',
    weight: 0.25,
    koef: 1.25,
  },
  {
    id: 3,
    title: '500 гр',
    weight: 0.5,
    koef: 1.05,
  },
  {
    id: 4,
    title: '750 гр',
    weight: 0.75,
    koef: 1.1,
  },
  {
    id: 5,
    title: '1 кг',
    weight: 1,
    koef: 1,
  },
  {
    id: 6,
    title: 'пробник',
    weight: 0.025,
    koef: 1.85,
  },
];

export const categories = [
  {
    id: '1', title: 'Орехи', pathname: 'orehi', img: 'https://фундучок.рф/files/categories/orehi.webp',
  },
  {
    id: '2', title: 'Сухофрукты', pathname: 'suhofrukty', img: 'https://фундучок.рф/files/suhofrukty.webp',
  },
  {
    id: '3', title: 'Сушеные ягоды', pathname: 'sushennye-jagody', img: 'https://фундучок.рф/files/categories/sushenye-jagody.webp',
  },
  {
    id: '4', title: 'Цукаты', pathname: 'cukaty', img: 'https://фундучок.рф/files/cukaty.webp',
  },
  {
    id: '5', title: 'Сладости', pathname: 'sladosti', img: 'https://фундучок.рф/files/sladosti.webp',
  },
  {
    id: '6', title: 'Семечки', pathname: 'semechki', img: 'https://фундучок.рф/files/semechki-i-semena.webp',
  },
  {
    id: '7', title: 'Специи и пряности', pathname: 'specii-i-prjanosti', img: 'https://фундучок.рф/files/specii-i-prjanosti.webp',
  },
  {
    id: '8', title: 'Фруктовые чипсы', pathname: 'fruktovye-chipsy', img: 'https://фундучок.рф/files/fruktovye-chipsy.webp',
  },
  {
    id: '9', title: 'Крупа и бобовые', pathname: 'krupa-i-bobovye', img: 'https://фундучок.рф/files/krupa-i-bobovye.webp',
  },
  {
    id: '10', title: 'Снеки и закуски', pathname: 'sneki-i-zakuski', img: 'https://фундучок.рф/files/sneki-i-zakuski.webp',
  },
  {
    id: '11', title: 'Чай', pathname: 'chay', img: 'https://фундучок.рф/files/chaj.webp',
  },
  {
    id: '12', title: 'Растительное масло', pathname: 'naturalnye-masla', img: 'https://фундучок.рф/files/rastitelnoe-maslo.webp',
  }];

export const navbar = [
  { id: 1, title: 'Товары со скидкой', link: 'skidki' },
  { id: 2, title: 'Акции', link: 'akcii' },
  { id: 3, title: 'Оплата и доставка', link: 'oplata-i-dostavka' },
  { id: 4, title: 'Возврат и обмен', link: 'vozvrat-i-obmen' },
  { id: 5, title: 'Товары оптом', link: 'tovary-optom' },
  { id: 6, title: 'Снеки в офис', link: 'sneki-v-ofis' },
  { id: 7, title: 'Контакты', link: 'kontakty' },
  { id: 8, title: 'Отзывы о нас', link: 'otzyvy-o-nas' },
];
