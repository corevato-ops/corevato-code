(function ($) {
  function initCustomSection() {
    // Relative path check (Bina homepage URL likhe)
    const currentPath = window.location.pathname.replace(/\/$/, '');
    if (currentPath !== 'https://heartstrong.kw.com/') return;

    // Target element: kw-search-block
    const targetSelector = 'main.Page-oneColumn > kw-search-block, .Page-oneColumn > :first-child';
    const supportPageUrl = 'https://heartstrong.kw.com/homepage-support';

    // DOM Polling: Element ke render hone ka wait
    const checkExist = setInterval(function () {
      const $target = $(targetSelector).first();

      if ($target.length) {
        clearInterval(checkExist);

        // Duplicate check
        if ($('.light-section').length > 0) return;

        // Fetch raw content
        $.get(supportPageUrl, function (htmlData) {
          if (!htmlData) return;

          // Direct String Extraction (Parsers aur CORS block se bachne ke liye)
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlData, 'text/html');
          const lightSection = doc.querySelector('.light-section');

          if (lightSection) {
            $target.after(lightSection.outerHTML);
          } else {
            // Regex Fallback
            const matches = htmlData.match(/<div class="light-section"[\s\S]*?<\/div>\s*<\/div>/i);
            if (matches && matches[0]) {
              $target.after(matches[0]);
            }
          }
        });
      }
    }, 200);

    setTimeout(function () {
      clearInterval(checkExist);
    }, 10000);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initCustomSection();
  } else {
    $(document).ready(initCustomSection);
  }
})(jQuery);
