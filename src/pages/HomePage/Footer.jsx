import linkedinIcon from "../../assets/icons/linkedin.svg";
import { Link } from "react-router";
export default function Footer() {
  return (
    <footer>
      <span className="socia-media-icons-container">
        <a href="https://www.linkedin.com/company/price-engine/" target="_blank" rel="nofollow noopener">
          <img src={linkedinIcon} className="linkedin-icon" alt="LinkedIn Profile" />
        </a>
      </span>
      <p>Made with ❤️ © 2025 Price Engine.</p>
      <Link to="/privacy-policy">privacy policy</Link>
    </footer>
  );
}
