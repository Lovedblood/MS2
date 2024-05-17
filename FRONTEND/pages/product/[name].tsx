import { GetServerSideProps } from "next";

import Layout from "../../layouts/Main";
import Breadcrumb from "../../components/breadcrumb";
import Content from "../../components/product-single/content";

// types
import { ProductType } from "types";

type ProductPageType = {
  product: ProductType;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const name = query.name;
  const response = await fetch("http://localhost:5000/products/" + name);
  const product = await response.json();

  return {
    props: {
      product,
    },
  };
};

const Product = ({ product }: ProductPageType) => {
  const padding = {
    padding: "10px",
  };

  return (
    <Layout>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <img src={`${product.Image}`} style={padding} />

            <Content product={product} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Product;
