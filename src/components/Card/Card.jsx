import "./card.css";
export default function Card({ product }) {
  const shopLogos = importShopLogos(require.context("../../shopLogos", false, /\.(webp|png|jpe?g|svg)$/));
  return (
    <div className="card">
      {product.shop?.onlineOnly && <span className="online-only">&#x2022; Online Only</span>}
      <img className="product-image" src={product.imgUrl} referrerPolicy="no-referrer" alt={product.name} />
      <div className="card-name-container">
        <h4 className="card-name" title={product.name}>
          {product.name}
        </h4>
        <span className="tooltip">{product.name}</span>
      </div>
      <h3 className="card-price">{product.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} EGP</h3>
      <div className="links-container">
        <a href={product.shop.url} className="shop-logo-container" target="_blank" rel="noreferrer">
          <img
            src={shopLogos[product.shop.id]}
            className="shop-logo"
            title={product.shop.name}
            alt={product.shop.name}
          />
        </a>
        <a className="primary-btn" href={product.url} target="_blank" rel="noreferrer">
          <button
            data-m:click={`clicked_shop=${product.shop.name};clicked_product=${product.name};clicked_link=${product.url}`}
          >
            Visit Page
          </button>
        </a>
      </div>
    </div>
  );
}

function importShopLogos(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace(/(\.\/)|(\.\w+$)/g, "")] = r(item);
  });
  return images;
}
