import useSwr from "swr";
import ProductItem from "../../product-item";
import ProductsLoading from "./loading";
import { ProductTypeList } from "types";

const ProductsContent = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSwr("/api/products", fetcher);

  if (error) return <div>Failed to load products</div>;
  return (
    <>
      {!data && <ProductsLoading />}

      {data && (
        <section className="products-list">
          {data.map((item: ProductTypeList) => (
            <ProductItem
              _id={item._id}
              Name={item.Name}
              Description={item.Description}
              Price={item.Price}
              key={item._id}
              Quantity={item.Quantity}
              ProductID={item.ProductID}
              Image={item.Image}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default ProductsContent;
