document.addEventListener("DOMContentLoaded", function () {
  // Check if current page is the root homepage
  if (window.location.pathname === "/" || window.location.pathname === "") {
    fetch("https://heartstrong.kw.com/homepage-support")
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Target the founder section from your subpage
        const founderSection = doc.querySelector(".light-section");
        
        // Target the class name .kw-search-block from your homepage
        const searchBlock = document.querySelector(".kw-search-block");

        // Inject the section directly after .kw-search-block
        if (founderSection && searchBlock) {
          searchBlock.parentNode.insertBefore(founderSection, searchBlock.nextSibling);
        }
      })
      .catch((err) => console.error("Error fetching section from support page:", err));
  }
});
