(function ($) {
  function loadCustomSection() {
    // 1. Validate Homepage Full URL
    const currentUrl = window.location.href.toLowerCase().split('?')[0].replace(/\/$/, '');
    const homepageFullUrl = 'https://heartstrong.kw.com';

    const isHomepage = (currentUrl === homepageFullUrl) || 
                       (window.location.pathname === '/') || 
                       (window.location.pathname === '');

    if (!isHomepage) return;

    // Prevent double injection
    if ($('.light-section').length > 0) return;

    const supportPageUrl = 'https://heartstrong.kw.com/homepage-support';
    const targetSelector = 'kw-search-block, .Page-oneColumn > :nth-child(1)';

    // 2. Poll until target element renders
    const checkExist = setInterval(function () {
      const $target = $(targetSelector).first();

      if ($target.length) {
        clearInterval(checkExist);

        if ($('.light-section').length > 0) return;

        // 3. Fetch HTML using absolute URL
        $.ajax({
          url: supportPageUrl,
          type: 'GET',
          dataType: 'html',
          success: function (htmlData) {
            if (!htmlData) return;

            // Extract .light-section element from full document
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlData, 'text/html');
            const lightSection = doc.querySelector('.light-section');

            if (lightSection) {
              $target.after(lightSection.outerHTML);
            } else {
              // Fallback regex match
              const match = htmlData.match(/<div class="light-section"[\s\S]*?<\/div>\s*<\/div>/i);
              if (match && match[0]) {
                $target.after(match[0]);
              }
            }
          },
          error: function (err) {
            console.error('KW Load Error:', err);
          }
        });
      }
    }, 200);

    // Stop checking after 10 seconds
    setTimeout(function () {
      clearInterval(checkExist);
    }, 10000);
  }

  // Run on load and DOM ready
  $(document).ready(loadCustomSection);
  $(window).on('load', loadCustomSection);
})(jQuery);
