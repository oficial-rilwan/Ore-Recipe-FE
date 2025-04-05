import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ROUTES from "./routes/routes";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
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
  );
}

export default App;
