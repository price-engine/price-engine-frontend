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

export function generateQueryStatement(filters, page) {
  let queryStatement = {
    name: filters.searchValue === "" ? "" : `"${filters.searchValue.trim().replaceAll(/\s+/gm, '""')}"`,
    page: page,
    sortAsc: filters.sort.value,
  };
  if (filters.minPrice) queryStatement.minPrice = filters.minPrice;
  if (filters.maxPrice) queryStatement.maxPrice = filters.maxPrice;
  if (filters.category.length) queryStatement.category = filters.category?.map((cat) => cat.value);
  if (filters.governorate.length)
    queryStatement.location = filters.governorate?.map((gov) => gov.value).concat("Online");
  return queryStatement;
}
