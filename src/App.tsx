import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ROUTES from "./routes/routes";
import PrivateRoute from "./components/PrivateRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {ROUTES.map(({ path, isProtected, component: Component }, index) => {
              if (isProtected) {
                return <PrivateRoute key={index} path={path} isProtected={isProtected} component={Component} />;
              }
              return <Route path={path} element={<Component />} />;
            })}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
