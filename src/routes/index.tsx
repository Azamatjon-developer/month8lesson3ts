import { Route, Routes } from "react-router-dom"
import Products from "../pages/Products"
import AboutProducts from "../pages/AboutProducts"

const ProductsRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/about_products/:id" element={<AboutProducts />} />
      </Routes>
    </div>
  )
}

export default ProductsRoutes
