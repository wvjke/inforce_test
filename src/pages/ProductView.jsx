import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@mui/material";
import axios from "axios";
import "./productView.scss";
import { Skeleton } from "@mui/material";
const ProductView = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const { data } = await axios.get(
      `https://products-b18c8-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json`
    );
    setProduct(data);
  };

  return (
    <>
      {product ? (
        <Card className="card_view">
          <div className="card_view_header">
            <h2>{product.name}</h2>
            <span>count: {product.count}</span>
          </div>
          <img src={product.imageUrl} alt="img" />
          <h4>Sizes</h4>
          <div className="card_view_sizes">
            <div>Width: {product.size.width}</div>
            <div>Height: {product.size.height}</div>
          </div>
          <h4>Weight: {product.weight}</h4>
        </Card>
      ) : (
        <Skeleton />
      )}
    </>
  );
};

export default ProductView;
