(function ($) {
  function executeInjection() {
    // Full URL Validation
    const currentUrl = window.location.href.toLowerCase().split('?')[0].replace(/\/$/, '');
    const targetHomepage = 'https://heartstrong.kw.com';

    const isHomepage = (currentUrl === targetHomepage) || 
                       (window.location.pathname === '/') || 
                       (window.location.pathname === '');

    if (!isHomepage) return;

    // Prevent Duplicates
    if ($('.light-section').length > 0) return;

    // Target selector directly from DevTools
    const targetSelector = 'kw-search-block, .Page-oneColumn > :nth-child(1)';
    const supportPageUrl = 'https://heartstrong.kw.com/homepage-support';

    const checkExist = setInterval(function () {
      const $target = $(targetSelector).first();

      if ($target.length) {
        clearInterval(checkExist);

        if ($('.light-section').length > 0) return;

        // Fetch support page HTML
        $.ajax({
          url: supportPageUrl,
          type: 'GET',
          dataType: 'html',
          success: function (htmlData) {
            if (!htmlData) return;

            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlData, 'text/html');
            const lightSection = doc.querySelector('.light-section');

            if (lightSection && $('.light-section').length === 0) {
              $target.after(lightSection.outerHTML);
            } else if ($('.light-section').length === 0) {
              const match = htmlData.match(/<div class="light-section"[\s\S]*?<\/div>\s*<\/div>/i);
              if (match && match[0]) {
                $target.after(match[0]);
              }
            }
          }
        });
      }
    }, 250);

    setTimeout(function () {
      clearInterval(checkExist);
    }, 10000);
  }

  // Run on Document Load
  $(document).ready(executeInjection);
  $(window).on('load', executeInjection);
})(jQuery);
