import { Link, useLocation } from "react-router";
import "./navbar.css";
import { useEffect, useState } from "react";

export default function Navbar({ search, filters, setFilters }) {
  const { pathname } = useLocation();
  const [inputShown, setInputShown] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    window.addEventListener("scroll", handleScrolling, { passive: true });
    return () => window.removeEventListener("scroll", handleScrolling);
  }, []);
  function handleScrolling() {
    setInputShown(window.scrollY >= 400 && window.innerWidth > 712);
  }
  function handleSearchInput(e) {
    if (e.key === "Enter") {
      if (window.innerWidth < 843) e.target.blur();
      search();
      window.scrollTo(0, 0);
      alert("fsfs");
    }
  }
  function handleSearch() {
    search();
    window.scrollTo(0, 0);
    alert("fsfs");
  }
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-links-container">
          <Link to="/" className={`navbar-link ${pathname === "/" && "active"}`}>
            Home
          </Link>
        </div>

        {inputShown && (
          <div className="search-input-container">
            <input
              id="search-input"
              type="search"
              placeholder="Search..."
              name="search"
              onKeyUp={handleSearchInput}
              value={filters?.searchValue}
              onChange={(e) => setFilters((oldFilters) => ({ ...oldFilters, searchValue: e.target.value.trim() }))}
              autoFocus
            />
            <button className="navbar-link active" href="#" onClick={handleSearch}>
              <img class="favicon" alt="" src="/favicon.ico" />
              <span className="search-title"> Search</span>
            </button>
          </div>
        )}
        <div className="navbar-links-container">
          <Link to="/donate" className={`navbar-link ${pathname === "/donate" && "active"}`}>
            Donate
          </Link>
          <a
            className="navbar-link"
            href="https://docs.google.com/forms/d/e/1FAIpQLSd_K3p83JOWs6tXmFxc8I3rBROoUK7Cr26llXlellUep1Sk2A/viewform?usp=header"
            target="_blank"
            rel="nofollow noopener"
          >
            Submit Feedback
          </a>
        </div>
      </div>
    </div>
  );
}
