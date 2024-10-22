import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/register.jsx";
import UserPage from "./pages/user.jsx";
import BookPage from "./pages/book.jsx";
import ToDoApp from "./components/todo/ToDoApp";
import ErrorPage from "./pages/error";
import "./styles/global.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthWrapper } from "./components/context/auth.context.jsx";
import ProtectedRoute from "./pages/private.route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ToDoApp />,
      },
      {
        path: "/users",
        element: <UserPage />,
      },
      {
        path: "/books",
        element: (
          <ProtectedRoute>
            <BookPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  //StrictMode mục đích code dc thực thi 2 lần dành cho môi trường developer
  <React.StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
      {/* <App /> */}
    </AuthWrapper>
  </React.StrictMode>
);
