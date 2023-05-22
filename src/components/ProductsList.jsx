/* eslint-disable react/prop-types */
import ProductCard from "./ProductCard";
import "./productsList.scss";
import { Skeleton } from "@mui/material";

const ProductsList = ({ products }) => {
  const isLoading = products.status === "loading";
  return (
    <div className="list">
      {isLoading
        ? [...Array(6)].map((item, index) => {
            return <Skeleton className="card" key={index} />;
          })
        : products.items.map((item) => {
            return (
              <ProductCard
                title={item.name}
                imageUrl={item.imageUrl}
                key={item.id}
                id={item.id}
                count={item.count}
              />
            );
          })}
    </div>
  );
};

export default ProductsList;
