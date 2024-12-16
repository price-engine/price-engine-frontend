import "./style.css";
export default function Card({ product }) {
  const shopLogos = importShopLogos(require.context("../../shopLogos", false, /\.(webp|png|jpe?g|svg)$/));
  return (
    <div className="card">
      <img className="product-image" src={product.imgUrl} referrerPolicy="no-referrer" alt={product.name} />
      <h4 className="card-name" title={product.name}>
        {product.name}
      </h4>
      <h3 className="card-price">{product.price} EGP</h3>
      <div className="links-container">
        <a href={product.shop.url} className="shop-logo-container">
          <img
            src={shopLogos[product.shop.id]}
            className="shop-logo"
            title={product.shop.name}
            alt={product.shop.name}
          />
        </a>
        <a className="primary-btn" href={product.url} target="_blank" rel="noreferrer">
          <button>Go to Page</button>
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
