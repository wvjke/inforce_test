/* eslint-disable react/prop-types */
import { Card } from "@mui/material";
import { Button } from "@mui/material";
import "./productCard.scss";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/slices/products";
import { Link } from "react-router-dom";

const ProductCard = ({ title, imageUrl, id, count }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    const result = confirm("Are you sure you want to delete this product?");
    if (result) {
      fetch(
        `https://products-b18c8-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`,
        {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(() => {
        dispatch(fetchProducts());
      });
    }
  };

  return (
    <Card className="card">
      <div className="card_header">
        <h2>{title}</h2>
        <span>count: {count}</span>
      </div>
      <Link to={`/product/${id}`}>
        <img src={imageUrl} alt="img" />
      </Link>
      <Button color="error" variant="contained" onClick={handleDelete}>
        Delete
      </Button>
    </Card>
  );
};

export default ProductCard;
