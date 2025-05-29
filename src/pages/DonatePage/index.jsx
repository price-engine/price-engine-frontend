import { Link } from "react-router";
import FloatingTopIcons from "../HomePage/FloatingTopIcons";
import Footer from "../HomePage/Footer";
import "./style.css";
export default function DonatePage() {
  return (
    <>
      <FloatingTopIcons />
      <div className="article-page">
        <Link className="app-logo-container" to="/">
          <img className="app-logo" src="/logo.png" alt="Price Engine" />
        </Link>
        <div className="article-card">
          <h3>Donation Methods</h3>
          <p>Support keeping the website alive</p>
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
        </div>
        <Footer />
      </div>
    </>
  );
}
