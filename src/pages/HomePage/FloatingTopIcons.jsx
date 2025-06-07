import { useState, useEffect } from "react";

export default function FloatingTopIcons() {
  const [scrapeStatus, setScrapeStatus] = useState();
  const [darkTheme, setDarkTheme] = useState(JSON.parse(localStorage.getItem("dark-theme")));
  useEffect(() => document.documentElement.setAttribute("dark-theme", darkTheme), [darkTheme]);
  useEffect(() => {
    fetch("https://api.price-engine.com/scrape-status")
      .then((res) => res.json())
      .then((res) => setScrapeStatus(res));
  }, []);
  function toggleTheme() {
    setDarkTheme((theme) => {
      localStorage.setItem("dark-theme", !theme);
      return !theme;
    });
  }
  return (
    <div className="floating-top-icons-container">
      <button className="floating-icon floating-top-icon status-icon">
        ⓘ
        <div className="tooltip">
          <div>Current Shops: {scrapeStatus?.currentShopCount ?? "........."}</div>
          <div>Latest Update: {scrapeStatus?.latestScrapeDate ?? "..................."}</div>
        </div>
      </button>
      <button className="floating-icon floating-top-icon" onClick={() => toggleTheme(true)}>
        {darkTheme ? "🌚" : "🌞"}
      </button>
    </div>
  );
}
