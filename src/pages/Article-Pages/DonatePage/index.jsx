import { Link } from "react-router";
import FloatingTopIcons from "../../HomePage/FloatingTopIcons";
import Footer from "../../HomePage/Footer";
import Navbar from "../../../components/Navbar/Navbar";
import "../article-style.css";
import "./style.css";
export default function DonatePage() {
  return (
    <>
      <Navbar />
      <div className="article-page">
        <FloatingTopIcons />
        <Link className="app-logo-container" to="/">
          <img className="app-logo" src="/logo.png" alt="Price Engine" />
        </Link>
        <div className="article-card">
          <h3>Donation Methods</h3>
          <div className="donation-links-container">
            <a href="https://ko-fi.com/price_engine" target="_blank" rel="nofollow noopener">
              KO-FI
            </a>
            <a href="https://paypal.me/khalidwaleed0" target="_blank" rel="nofollow noopener">
              PAYPAL
            </a>
            <a href="https://ipn.eg/S/eng.khalidwaleed/instapay/0ePwn4" target="_blank" rel="nofollow noopener">
              INSTAPAY
            </a>
          </div>
          <br />
          <h3>Why Donate ?</h3>
          <p>Price-Engine needs donation to stay alive because:</p>
          <br />
          <ul>
            <li>
              Price-Engine is <strong>Free!</strong> But:
            </li>
            <li>
              Price-Engine <strong>pays</strong> for server rent.
            </li>
            <li>
              Price-Engine <strong>pays</strong> for the domain name.
            </li>
            <li>
              Price-Engine developers spend <strong>hours</strong> everyday to improve the website.
            </li>
          </ul>
        </div>
        <Footer />
      </div>
    </>
  );
}
