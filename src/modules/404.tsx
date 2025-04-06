import React from "react";
import Header from "../components/Header";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PATHNAMES from "../constants/pathnames";

const NotFound = ({ title, description }: { title?: string; description?: string }) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Header />
      <main style={{ minHeight: "90vh" }} className="d-flex justify-content-center align-items-center">
        <div>
          <div className="text-center display-4 mb-3 fw-bold">{title || "404 Page Not Found"}</div>
          <div className="text-center">{description || "Look's like something's broken, it's not your it's us."}</div>
          <div className="mb-3 text-center">How about going back to the home page?</div>
          <div className="text-center">
            <Button onClick={() => navigate(PATHNAMES.HOME)} variant="secondary">
              Home Page
            </Button>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default NotFound;
