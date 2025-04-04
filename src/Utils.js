export function scrollWhenKeyboardShown(cssSelector, block = "start") {
  // Auto scrolling into view is only needed on small devices.
  if (window.innerWidth < 843) {
    let interval = setInterval(() => {
      let isKeyboardShown = window.innerHeight - window.visualViewport.height > 1;
      if (isKeyboardShown) {
        document.querySelector(cssSelector).scrollIntoView({ behavior: "smooth", block: block });
        clearInterval(interval);
      }
    }, 10); // The keyboard does not show up immediately so I check every 10ms.
  }
}
