import { Link } from "react-router";
import FloatingTopIcons from "../../HomePage/FloatingTopIcons";
import Footer from "../../HomePage/Footer";
import Navbar from "../../../components/Navbar/Navbar";
import "../article-style.css";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="article-page">
        <FloatingTopIcons />
        <Link className="app-logo-container" to="/">
          <img className="app-logo" src="/logo.png" alt="Price Engine" />
        </Link>
        <div className="article-card">
          <h2>Price-Engine Privacy Policy</h2>
          <p>
            Khalid Waleed operates the website "Price Engine" at https://price-engine.com. I take your privacy
            seriously. To better protect your privacy, I provide this privacy policy notice explaining the way your
            personal information is collected and used.
          </p>
          <br />
          <h3>Data We Collect</h3>
          <p>
            We use Medama Analytics, an open-source, privacy-focused tool, to collect limited data about how users
            interact with our website. Medama is designed to prioritize user privacy and does not use cookies, IP
            addresses, or other identifiers that could track individuals. Specifically, we collect:
          </p>
          <br />
          <p>
            - Search Queries: The terms or phrases you enter into our search functionality to understand what users are
            looking for.
          </p>
          <p>
            - Aggregated Usage Data: Non-personal data, such as the number of unique visitors and page views, which
            cannot be linked to an individual. Medama determines unique visitors using a privacy-friendly method that
            avoids storing personal identifiers (see{" "}
            <a href="https://oss.medama.io/methodology/unique-visitors" target="_blank" rel="nofollow noopener">
              https://oss.medama.io/methodology/unique-visitors
            </a>{" "}
            for details).
          </p>
          <br />
          <h3>Cookies</h3>
          <p>I do not use cookies because I care about the privacy of my users.</p>
          <br />
          <h3>Advertisement and Other Third Parties</h3>
          <p>
            Advertising partners and other third parties may use cookies, scripts and/or web beacons to track visitor
            activities on this website to display advertisements and other useful information. Such tracking is done
            directly by the third parties through their servers and is subject to their privacy policies. This website
            has no access or control over these cookies, scripts and/or web beacons that may be used by third parties.
          </p>
          <br />
          <p>
            I have included links on this website for your use and reference. I am not responsible for the privacy
            policies on these websites. You should be aware that the privacy policies of these websites may differ from
            my own.
          </p>
          <br />
          <p>Link to the privacy policy of third-party service providers used by the website:</p>
          <ul>
            <li>No third parties are being used till the moment.</li>
          </ul>
          <br />
          <h3>Security</h3>
          <p>
            Price-Engine uses HTTPS encryption and regular security audits to protect data processed by Medama
            Analytics. Servers are secured with industry-standard measures.
          </p>
          <br />
          <h3>Changes To This Privacy Policy</h3>
          <p>
            This Privacy Policy is effective as of 2025-06-11 and will remain in effect except concerning any changes in
            its provisions in the future, which will be in effect immediately after being posted on this page. I reserve
            the right to update or change my Privacy Policy at any time and you should check this Privacy Policy
            periodically. If I make any material changes to this Privacy Policy, I will notify you by placing a
            prominent notice on my website.
          </p>
          <br />
          <h3>Contact Information</h3>
          <p>
            For any questions or concerns regarding the privacy policy, please send me an email at
            <a href="mailto:contact.price.engine@gmail.com" target="_blank" rel="nofollow noopener">
              {" "}
              contact.price.engine@gmail.com
            </a>
            .
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
}
