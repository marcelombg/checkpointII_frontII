import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from "./Components/Navbar";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Detail from "./Routes/Detail";
import Footer from "./Components/Footer";
import "./index.css";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import DetailCard from "./Components/DetailCard";
import App from "./App";
import { ThemeProvider } from "./hooks/useTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
const routerApp = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'detail',
        element: <Detail />
      },
      {
        path: 'dentist/:id',
        element: <DetailCard />
      }
      ,
      {
        path: "*",
        loader: () => redirect("/home")
      }
    ]
  }
])

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={routerApp} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
