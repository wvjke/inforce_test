/* eslint-disable react/prop-types */
import { Modal, Box, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useRef } from "react";
// eslint-disable-next-line react/prop-types
import "./modalWindow.scss";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/slices/products";
const ModalWindow = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const nameInputRef = useRef();
  const imageInputRef = useRef();
  const countInputRef = useRef();
  const widthInputRef = useRef();
  const heightInputRef = useRef();
  const weightInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredCount = countInputRef.current.value;
    const enteredWidth = widthInputRef.current.value;
    const enteredHeight = heightInputRef.current.value;
    const enteredWeight = weightInputRef.current.value;

    const productData = {
      imageUrl: enteredImage,
      name: enteredName,
      count: enteredCount,
      size: {
        width: enteredWidth,
        height: enteredHeight,
      },
      weight: enteredWeight,
    };
    fetch(
      "https://products-b18c8-default-rtdb.europe-west1.firebasedatabase.app/products.json",
      {
        method: "POST",
        body: JSON.stringify(productData),
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then(() => {
      setOpen(false);
      dispatch(fetchProducts());
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add a new product
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Fiil all fields correctly and press the confirm button
        </Typography>
        <form className="form" onSubmit={submitHandler}>
          <input
            type="text"
            required
            placeholder="imageUrl"
            ref={imageInputRef}
          />
          <input type="text" required placeholder="name" ref={nameInputRef} />
          <input type="text" required placeholder="count" ref={countInputRef} />
          <div className="form_sizes">
            <input
              type="text"
              required
              placeholder="width"
              ref={widthInputRef}
            />
            <input
              type="text"
              required
              placeholder="height"
              ref={heightInputRef}
            />
          </div>
          <input
            type="text"
            required
            placeholder="weight"
            ref={weightInputRef}
          />
          <div className="form_buttons">
            <Button variant="contained" color="success" type="submit">
              Add product
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalWindow;
