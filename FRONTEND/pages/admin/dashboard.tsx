import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#f4f4f4",
    padding: "20px",
    borderRadius: "10px",
    width: "50%",
  },
};

const Dashboard = () => {
  const [insertModalIsOpen, setInsertModalIsOpen] = useState(false);
  const [product, setProduct] = useState({
    ProductID: "",
    Price: "",
    Name: "",
    Description: "",
    Quantity: "",
  });

  const [token, setToken] = useState(null);

  useEffect(() => {
    fetchProducts();

    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  const handleInputChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:5000/products");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInsertSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:5000/productinsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });

    const data = await res.json();
    

    if (data) {
      toast.success("Product inserted successfully");
    } else {
      toast.error("Product insertion failed");
    }

    setInsertModalIsOpen(false);
  };

  const handleDeleteSubmit = async (ProductID: string) => {
    const res = await fetch(`http://localhost:5000/products/${ProductID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (data) {
      toast.success("Product deleted successfully");
    } else {
      toast.error("Product deletion failed");
    }
  };

  const style = {
    background: "#EBA80D",
    color: "white",
    padding: "10px",
    margin: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const styleDelete = {
    background: "red",
    color: "white",
    padding: "10px",
    margin: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div>
      <button style={style} onClick={() => setInsertModalIsOpen(true)}>
        Insert New Product
      </button>
      <Modal
        isOpen={insertModalIsOpen}
        onRequestClose={() => setInsertModalIsOpen(false)}
        style={customStyles}
      >
        <form onSubmit={handleInsertSubmit}>
          <input
            name="ProductID"
            placeholder="ProductID"
            onChange={handleInputChange}
            required
          />
          <input
            name="Price"
            type="number"
            onChange={handleInputChange}
            placeholder="Price"
            required
          />
          <input
            name="Name"
            placeholder="Name"
            onChange={handleInputChange}
            required
          />
          <input
            name="Description"
            placeholder="Description"
            onChange={handleInputChange}
          />
          <input
            name="Quantity"
            type="number"
            placeholder="Quantity"
            onChange={handleInputChange}
            required
          />
          <input
            name="Image"
            placeholder="https://placehold.co/600x400"
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      </Modal>
      <div>
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h2>{product.Name}</h2>
            <p>{product.Description}</p>
            <p>Quantity: {product.Quantity}</p>
            <p>Price: {product.Price}</p>
            <p>Product ID: {product.ProductID}</p>

            <button style={style}>Edit</button>

            {/* delete button */}
            <button
              style={styleDelete}
              onClick={() => handleDeleteSubmit(product.ProductID)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
