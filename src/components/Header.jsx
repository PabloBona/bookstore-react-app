import React from 'react';
import { Link } from 'react-router-dom';
import user from '../assets/user.svg';

function Header() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-white">
      <div className="container">
        <div className="d-flex align-items-sm-baseline">
          <Link className="navbar-brand" to="/">
            <h2 className="fw-bolder my-3">Bookstore CMS</h2>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <p>BOOKS</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories">
                  <p>CATEGORIES</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="oval">
          <button type="submit" className="btn btn-sm">
            <img src={user} alt="" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
