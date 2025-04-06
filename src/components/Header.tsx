import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PATHNAMES from "../constants/pathnames";
import { FaBan, FaLock, FaSearch, FaSignOutAlt, FaUser, FaUserCircle, FaUtensils } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Dropdown } from "react-bootstrap";
import DeactivateAccountModal from "./DeactivateAccountModal";

export function Logo() {
  return (
    <Link to={PATHNAMES.HOME} className="logo d-flex justify-content-center align-items-center">
      <FaUtensils className="text-white fs-3" />
    </Link>
  );
}

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { user, logout } = React.useContext(AuthContext);
  const [isOpen, setIsOpen] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pathname.includes(PATHNAMES.RESTAURANTS)) return navigate(`${PATHNAMES.RESTAURANTS}?search=${keyword}`);
    navigate(`${PATHNAMES.RECIPES}?search=${keyword}`);
  };
  return (
    <React.Fragment>
      <header className="p-4">
        <div className="row align-items-center">
          <div className="col">
            <Logo />
          </div>
          <div className="col">
            <form onSubmit={handleSubmit} className="d-none d-md-block">
              <div className="input-group">
                <input
                  required
                  type="text"
                  name="search"
                  className="form-control"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder={
                    pathname.includes(PATHNAMES.RESTAURANTS)
                      ? "Find restaurants and locations"
                      : "Find a recipe or ingredient"
                  }
                />
                <button type="submit" className="input-group-text" style={{ backgroundColor: "#6D37AA" }}>
                  <FaSearch className="text-white" />
                </button>
              </div>
            </form>
          </div>
          <div className="col">
            <div className="d-flex align-items-center justify-content-end">
              {user ? (
                <Dropdown>
                  <Dropdown.Toggle style={{ all: "unset", display: "flex", alignItems: "center", cursor: "pointer" }}>
                    <FaUserCircle className="primary_color fs-4 me-2" />
                    <span>{user?.firstName}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#" className="dropdown-item">
                      <FaUser className="me-3" aria-hidden="true" />
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item href="#" className="dropdown-item">
                      <FaLock className="me-3" aria-hidden="true" />
                      Password & Security
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item" onClick={() => setIsOpen(true)}>
                      <FaBan className="me-3" aria-hidden="true" />
                      Deactivate Account
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdown-item text-danger" onClick={logout}>
                      <FaSignOutAlt className="me-3 text-danger" aria-hidden="true" />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link
                  to={PATHNAMES.AUTH}
                  style={{ textDecoration: "none", color: "inherit" }}
                  className="d-flex align-items-center"
                >
                  <FaUserCircle className="primary_color fs-4 me-2" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      <DeactivateAccountModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </React.Fragment>
  );
};

export default Header;
