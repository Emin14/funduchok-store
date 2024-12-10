// import Characteristics from '../Characteristics/Characteristics';
import Reviews from '../Reviews/Reviews';
import './ProductProperties.css';

export default function ProductProperties({
  description, blocks, block, selectBlock,
}) {
  let outTag = null;
  if (block.description) {
    outTag = description;
  } else if (block.characteristics) {
    outTag = 'Здесь отображаются характеристики из базы данных'
  } else if (block.reviews) {
    outTag = <Reviews />;
  } else {
    outTag = null;
  }

  if (blocks) {
    return (
      <div>
        <ul className="productProperties__list" onClick={selectBlock} onKeyDown={selectBlock} role="presentation">
          {blocks.map((item) => (
            <li key={item.title} data-columns={item.dataset} className={`productProperties__item ${block[item.dataset] ? 'active' : ''}`}>
              {item.title}
            </li>
          ))}
        </ul>
        <div className="productProperties__description">
          {outTag}
        </div>
      </div>
    );
  }
}
