import { useState, useEffect } from "react";

export default function FloatingTopIcons() {
  const [scrapeStatus, setScrapeStatus] = useState();
  useEffect(() => {
    fetch("https://api.price-engine.com/scrape-status")
      .then((res) => res.json())
      .then((res) => setScrapeStatus(res));
  }, []);
  return (
    <div className="floating-top-icons-container">
      <button className="floating-icon floating-top-icon status-icon">
        ⓘ
        <div className="tooltip">
          <div>Current Shops: {scrapeStatus?.currentShopCount ?? "..."}</div>
          <div>Latest Update: {scrapeStatus?.latestScrapeDate ?? "............."}</div>
        </div>
      </button>
      {/* <button className="floating-icon floating-top-icon" onClick={() => setCartShown(true)}>
        🌞
      </button> */}
    </div>
    // 🌚
  );
}
