import { toast } from 'react-toastify';

const notify = (product, packaging, count) => toast(`${product} ${count} шт по ${packaging} добавлено в корзину`, {
  autoClose: 2000,
});

export default notify;
