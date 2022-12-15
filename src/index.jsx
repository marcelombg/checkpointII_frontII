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
import { ThemeProvider } from "./hooks/useTheme";
import DetailCard from "./Components/DetailCard";

const root = ReactDOM.createRoot(document.getElementById("root"));
const routerApp = createBrowserRouter([
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
])

root.render(
  <React.StrictMode>
      <AuthProvider>
        <ThemeProvider>
          <Navbar/>
            <RouterProvider router = {routerApp}/>
          <Footer/>
        </ThemeProvider>
      </AuthProvider>
    </React.StrictMode>
);
