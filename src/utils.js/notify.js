import { toast } from 'react-toastify';

export const notify = (product, packaging, count) => toast(`${product} ${count} шт по ${packaging} добавлено в корзину`, {
    autoClose: 2000,
});