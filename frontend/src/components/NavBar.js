import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-secondary navbar-dark py-3 fixed-top">
        <div className="container">
          <Link to="/" class="navbar-brand text-info">
            Showbook
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link text-light">
                  Home
                </Link>
              </li>
              {userInfo ? (
                <li className="nav-item">
                  <Link to="/profile" className="nav-link text-light">
                    Profile
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link to="/login" className="nav-link text-light">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
