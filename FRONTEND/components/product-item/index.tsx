import Link from "next/link";
import { ProductTypeList } from "types";

const ProductItem = ({ Name, Price, Image }: ProductTypeList) => {
  return (
    <div className="product-item">
      <div className="product__image" style={{ width: '384px', height: '216px', overflow: 'hidden' }}>
        <Link href={`/product/${Name}`}>
          <img src={`${Image}`} alt={Name} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }} />
        </Link>
      </div>


      <div className="product__description">
        <h3>{Name}</h3>
        <h4 className="product__price">${Price}</h4>
      </div>
    </div>
  );
};

export default ProductItem;
