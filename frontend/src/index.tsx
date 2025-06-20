import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { NotFound } from "./app/components/NotFound";
import LoginPage from "./app/components/login/LoginPage";
import ProductPage from "./app/components/inventory/productList/product/Product";
import ProductListPage from "./app/components/inventory/productList/ProductListPage";
import { InventoryLayout } from "./app/components/inventory/InventoryLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "inventory",
        element: <InventoryLayout />,
        children: [
          {
            path: "products",
            element: <ProductListPage />,
          },
          {
            path: "products/:id",
            element: <ProductPage />,
          },
        ],
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
