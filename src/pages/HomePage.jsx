import { useEffect, useRef, useState } from "react";
import ProductsList from "../components/ProductsList";
import "./homePage.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/products";
import ModalWindow from "../components/ModalWindow";
import { Button, Container } from "@mui/material";

const HomePage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const selectValue = useRef();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleSelectChange = () => {
    localStorage.setItem("filter", selectValue.current.value);
    dispatch(fetchProducts());
  };

  return (
    <Container>
      <div className="header">
        <label>
          <span className="label">Sort:</span>
          <select
            name="filters"
            defaultValue={localStorage.getItem("filter")}
            ref={selectValue}
            onChange={handleSelectChange}
          >
            <option value="name">By name</option>
            <option value="count">By count</option>
          </select>
        </label>
        <h1>Products List View</h1>
        <Button variant="contained" onClick={handleOpen}>
          Add product
        </Button>
      </div>
      <ProductsList products={products} />
      <ModalWindow open={open} setOpen={setOpen} />
    </Container>
  );
};

export default HomePage;
