import linkedinIcon from "../../assets/icons/linkedin.svg";
import githubIcon from "../../assets/icons/github.svg";
import { Link } from "react-router";
export default function Footer() {
  return (
    <footer>
      <span className="socia-media-icons-container">
        <a href="https://www.linkedin.com/in/khalidwaleed0/" target="_blank" rel="nofollow noopener">
          <img src={linkedinIcon} className="linkedin-icon" alt="LinkedIn Profile" />
        </a>
        <a href="https://github.com/khalidwaleed0" target="_blank" rel="nofollow noopener">
          <img src={githubIcon} className="github-icon" alt="Github Profile" />
        </a>
      </span>
      <p>Made with ❤️ © 2025 Price Engine.</p>
      <Link to="/privacy-policy">privacy policy</Link>
    </footer>
  );
}
