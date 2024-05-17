import { useState } from "react";

import { ProductType } from "types";

type ProductContent = {
  product: ProductType;
};

const Content = ({ product }: ProductContent) => {
  const [count, setCount] = useState<number>(1);

  return (
    <section className="product-content">
      <div className="product-content__intro">
        <h5 className="product__id">
          Product ID:<br></br>
          {product.ProductID}
        </h5>
        <h2 className="product__name">{product.Name}</h2>
        <p className="product__description">{product.Description}</p>
        <div className="product__prices">
          <h4>${product.Price}</h4>
        </div>
      </div>

      <div className="product-content__filters">
        <div className="product-filter-item">
          <h5>Quantity: {product.Quantity} left in the stock</h5>
          <div className="quantity-buttons">
            <div className="quantity-button">
              <button
                type="button"
                onClick={() => setCount(count > 0 ? count - 1 : 0)}
                className="quantity-button__btn"
              >
                -
              </button>
              <span>{count}</span>
              <button
                type="button"
                onClick={() => setCount(count + 1)}
                className="quantity-button__btn"
              >
                +
              </button>
            </div>

            <button type="submit" className="btn btn--rounded btn--yellow">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
