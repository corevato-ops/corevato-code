(function ($) {
  function initCustomSection() {
    // 1. Path check for homepage (matches "/" or "")
    const currentPath = window.location.pathname.replace(/\/$/, '');
    if (currentPath !== 'https://heartstrong.kw.com/') return;

    // 2. Exact selector target shown in DevTools
    const targetSelector = 'main.Page-oneColumn > kw-search-block, .Page-oneColumn > :first-child';
    const supportPageUrl = 'https://heartstrong.kw.com/homepage-support';

    // 3. Poll until target element renders
    const checkExist = setInterval(function () {
      const $target = $(targetSelector).first();

      if ($target.length) {
        clearInterval(checkExist);

        // Prevent duplicate injection
        if ($('.light-section').length > 0) return;

        // 4. Fetch HTML using raw GET
        $.get(supportPageUrl, function (htmlData) {
          // Parse returned string without executing nested scripts
          const $parsedDOM = $($.parseHTML(htmlData));
          
          // Try finding .light-section or extract from htmlData string directly
          let $fetchedSection = $parsedDOM.find('.light-section');
          
          if (!$fetchedSection.length) {
            $fetchedSection = $parsedDOM.filter('.light-section');
          }

          // Fallback: If parseHTML strips it, extract via regex/string
          if (!$fetchedSection.length && htmlData.indexOf('light-section') !== -1) {
            const extractedHTML = htmlData.match(/<div class="light-section"[\s\S]*?<\/div>\s*<\/div>/i);
            if (extractedHTML) {
              $target.after(extractedHTML[0]);
              return;
            }
          }

          if ($fetchedSection.length) {
            $target.after($fetchedSection);
          }
        });
      }
    }, 250);

    // Stop polling after 10 seconds
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
