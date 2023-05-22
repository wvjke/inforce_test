import HomePage from "./pages/HomePage";
import ProductView from "./pages/ProductView";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductView />} />
    </Routes>
  );
};

export default App;
