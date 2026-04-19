import { createBrowserRouter, Outlet, RouterProvider } from "react-router";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Productdetails from "./pages/ProductDetails";
import Signup from "./pages/Signup";
import AddProduct from "./admin/AddProduct";
import EditiProduct from "./admin/EditiProduct";
import ProductList from "./admin/ProductList";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";

function Layout() {
  return (
    <>
    <Navbar />
      <Outlet />
      </>
  )
}


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/product/:id", element: <Productdetails /> },
  { path: "/signup", element: <Signup /> },
  { path: "/admin/products", element: <ProductList /> },
  { path: "/admin/products/add", element: <AddProduct /> },
      { path: "/admin/products/edit/:id", element: <EditiProduct /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}